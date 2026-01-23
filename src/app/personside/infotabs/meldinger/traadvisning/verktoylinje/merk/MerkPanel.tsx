import { type UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RadioPanelGruppe, type RadioPanelProps } from 'nav-frontend-skjema';
import { type FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import { LenkeKnapp } from 'src/components/common-styled-components';
import { useValgtenhet } from 'src/context/valgtenhet-state';
import type { Traad } from 'src/models/meldinger/meldinger';
import type {
    MerkLukkTraadRequest,
    MerkRequestMedBehandlingskjede,
    SendTilSladdingRequest
} from 'src/models/meldinger/merk';
import type { Oppgave } from 'src/models/meldinger/oppgave';
import { setIngenValgtTraadDialogpanel } from 'src/redux/oppgave/actions';
import type { AppState } from 'src/redux/reducers';
import dialogResource from 'src/rest/resources/dialogResource';
import tildelteoppgaver from 'src/rest/resources/tildelteoppgaverResource';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import { useFocusOnFirstFocusable } from 'src/utils/hooks/use-focus-on-first-focusable';
import styled from 'styled-components';
import {
    eldsteMelding,
    erBehandlet,
    erChatTraad,
    erFeilsendt,
    erJournalfort,
    erMeldingFeilsendt,
    erMeldingstypeSamtalereferat,
    kanBesvares
} from '../../../utils/meldingerUtils';
import { Resultat } from '../utils/VisPostResultat';
import { type SladdeObjekt, velgMeldingerTilSladding } from './sladdevalg/Sladdevalg';

interface Props {
    lukkPanel: () => void;
    valgtTraad: Traad;
}

enum MerkOperasjon {
    FEILSENDT = 'FEILSENDT',
    SLADDING = 'SLADDING',
    LUKK = 'LUKK'
}

const KnappStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MERK_FEILSENDT_URL = `${apiBaseUri}/dialogmerking/feilsendt`;
const MERK_SLADDING_URL = `${apiBaseUri}/dialogmerking/sladding`;
const LUKK_TRAAD_URL = `${apiBaseUri}/dialogmerking/lukk-traad`;

function lagBehandlingskjede(traad: Traad) {
    return traad.meldinger.filter((melding) => !erMeldingFeilsendt(melding)).map((melding) => melding.id);
}

function visStandardvalg(traad: Traad): boolean {
    return !erJournalfort(traad) && !erFeilsendt(traad) && erBehandlet(traad) && !erChatTraad(traad);
}

function traadKanLukkes(traad: Traad): boolean {
    const melding = eldsteMelding(traad);
    return kanBesvares(traad) && !erMeldingstypeSamtalereferat(melding.meldingstype);
}

function getMerkBehandlingskjedeRequest(fnr: string, traad: Traad): MerkRequestMedBehandlingskjede {
    return {
        fnr: fnr,
        behandlingsidListe: lagBehandlingskjede(traad)
    };
}

function getSendTilSladdingRequest(fnr: string, objekt: SladdeObjekt): SendTilSladdingRequest {
    return {
        fnr,
        ...objekt
    };
}

function getLukkTraadRequest(fnr: string, valgtEnhet: string, traad: Traad, oppgave?: Oppgave): MerkLukkTraadRequest {
    return {
        fnr: fnr,
        saksbehandlerValgtEnhet: valgtEnhet,
        traadId: traad.traadId,
        oppgaveId: oppgave?.oppgaveId
    };
}

function finnOppgaveForTraad(
    traad: Traad,
    tildelteOppgaver: UseQueryResult<Oppgave[], FetchError>
): Oppgave | undefined {
    if (tildelteOppgaver.data) {
        return tildelteOppgaver.data.find((it) => it.traadId === traad.traadId);
    }
    return undefined;
}

function MerkPanel(props: Props) {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const valgtTraad = props.valgtTraad;
    const tildelteOppgaverResource = tildelteoppgaver.useFetch();
    const [valgtOperasjon, settValgtOperasjon] = useState<MerkOperasjon | undefined>(undefined);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [submitting, setSubmitting] = useState(false);
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const valgtEnhet = useValgtenhet().enhetId;
    const formRef = useRef<HTMLFormElement>(null);
    const oppgaveTilknyttning = finnOppgaveForTraad(valgtTraad, tildelteOppgaverResource);

    useFocusOnFirstFocusable(formRef);

    const melding = eldsteMelding(valgtTraad);
    // biome-ignore lint/suspicious/noExplicitAny: old types
    const merkPost = (url: string, object: any, name: string) => {
        setSubmitting(true);
        trackGenereltUmamiEvent(trackingEvents.merkDialog, { tekst: valgtOperasjon?.toLowerCase() });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        post(url, object, `MerkPanel-${name}`)
            .then(() => {
                settResultat(Resultat.VELLYKKET);
                setSubmitting(false);
                queryClient.invalidateQueries({
                    queryKey: dialogResource.queryKey(valgtBrukersFnr, valgtEnhet)
                });
                tildelteOppgaverResource.refetch();
                dispatch(setIngenValgtTraadDialogpanel());
            })
            .catch(() => {
                settResultat(Resultat.FEIL);
                setSubmitting(false);
            });
    };

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        if (!valgtOperasjon || submitting) {
            return;
        }

        switch (valgtOperasjon) {
            case MerkOperasjon.FEILSENDT:
                merkPost(MERK_FEILSENDT_URL, getMerkBehandlingskjedeRequest(valgtBrukersFnr, valgtTraad), 'Feilsendt');
                break;
            case MerkOperasjon.SLADDING: {
                // eslint-disable-next-line no-case-declarations
                const sladdeObjekt: SladdeObjekt | null = await velgMeldingerTilSladding(valgtTraad, queryClient);
                // If null, then modal was closed without "submitting form"
                if (sladdeObjekt !== null) {
                    merkPost(MERK_SLADDING_URL, getSendTilSladdingRequest(valgtBrukersFnr, sladdeObjekt), 'Sladding');
                }
                break;
            }
            case MerkOperasjon.LUKK:
                merkPost(
                    LUKK_TRAAD_URL,
                    getLukkTraadRequest(valgtBrukersFnr, valgtEnhet || '', valgtTraad, oppgaveTilknyttning),
                    'Lukk-traad'
                );
        }
    };

    if (resultat) {
        const alert =
            resultat === Resultat.VELLYKKET ? (
                <AlertStripeSuksess className="blokk-xs">Tråd merket</AlertStripeSuksess>
            ) : (
                <AlertStripeFeil className="blokk-xs">Klarte ikke å merke tråd</AlertStripeFeil>
            );
        return (
            <>
                {alert}
                <Hovedknapp onClick={props.lukkPanel}>Lukk</Hovedknapp>
            </>
        );
    }

    const radioprops: RadioPanelProps[] = [
        {
            label: 'Feilsendt post',
            value: MerkOperasjon.FEILSENDT,
            disabled: !visStandardvalg(valgtTraad)
        },
        {
            label: 'Send til sladding',
            value: MerkOperasjon.SLADDING,
            disabled: melding.sendtTilSladding
        },
        {
            label: 'Avslutt dialog',
            value: MerkOperasjon.LUKK,
            disabled: !traadKanLukkes(valgtTraad)
        }
    ];

    return (
        <form onSubmit={submitHandler} ref={formRef}>
            <RadioPanelGruppe
                className="blokk-xxs"
                radios={radioprops}
                name="merk"
                checked={valgtOperasjon}
                legend=""
                onChange={(_, value) => settValgtOperasjon(MerkOperasjon[value as MerkOperasjon])}
            />
            {valgtOperasjon === MerkOperasjon.SLADDING && (
                <AlertStripeInfo className="blokk-xxs">
                    Velg årsak og hvilke meldinger som skal sladdes ved å trykke "Merk"
                </AlertStripeInfo>
            )}
            {valgtOperasjon === MerkOperasjon.LUKK && (
                <AlertStripeInfo className="blokk-xxs">
                    Ved avslutting blir dialogen låst og oppgave ferdigstilt. Det er ikke mulig å sende flere meldinger
                    i denne dialogen i ettertid.
                </AlertStripeInfo>
            )}
            <KnappStyle>
                <Hovedknapp htmlType="submit" spinner={submitting} autoDisableVedSpinner>
                    Merk
                </Hovedknapp>
                <LenkeKnapp type="button" onClick={props.lukkPanel}>
                    Lukk
                </LenkeKnapp>
            </KnappStyle>
        </form>
    );
}

export default MerkPanel;
