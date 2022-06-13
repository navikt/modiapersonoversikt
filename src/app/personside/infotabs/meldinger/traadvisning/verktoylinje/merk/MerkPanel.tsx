import * as React from 'react';
import { FormEvent, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import {
    eldsteMelding,
    erBehandlet,
    erJournalfort,
    erFeilsendt,
    erKontorsperret,
    erMeldingFeilsendt,
    erMeldingstypeSamtalereferat,
    kanBesvares,
    erChatTraad
} from '../../../utils/meldingerUtils';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { RadioPanelGruppe, RadioPanelProps } from 'nav-frontend-skjema';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import {
    MerkLukkTraadRequest,
    MerkRequestMedBehandlingskjede,
    SendTilSladdingRequest
} from '../../../../../../../models/meldinger/merk';
import { AlertStripeFeil, AlertStripeInfo, AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Resultat } from '../utils/VisPostResultat';
import { useRestResource } from '../../../../../../../rest/consumer/useRestResource';
import { useFocusOnFirstFocusable } from '../../../../../../../utils/hooks/use-focus-on-first-focusable';
import { setIngenValgtTraadDialogpanel } from '../../../../../../../redux/oppgave/actions';
import { useAppState } from '../../../../../../../utils/customHooks';
import { hasData, RestResource } from '../../../../../../../rest/utils/restResource';
import { Oppgave } from '../../../../../../../models/meldinger/oppgave';

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
    return (
        !erJournalfort(traad) &&
        !erFeilsendt(traad) &&
        erBehandlet(traad) &&
        !erKontorsperret(traad) &&
        !erChatTraad(traad)
    );
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

function getSendTilSladdingRequest(fnr: string, traad: Traad): SendTilSladdingRequest {
    return {
        fnr,
        traadId: traad.traadId
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

function finnOppgaveForTraad(traad: Traad, tildelteOppgaver: RestResource<Oppgave[]>): Oppgave | undefined {
    if (hasData(tildelteOppgaver)) {
        return tildelteOppgaver.data.find((it) => it.traadId === traad.traadId);
    }
    return undefined;
}

function MerkPanel(props: Props) {
    const dispatch = useDispatch();
    const valgtTraad = props.valgtTraad;
    const traderResource = useRestResource((resources) => resources.traader);
    const tildelteOppgaverResource = useRestResource((resources) => resources.tildelteOppgaver);

    const [valgtOperasjon, settValgtOperasjon] = useState<MerkOperasjon | undefined>(undefined);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [submitting, setSubmitting] = useState(false);
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const valgtEnhet = useAppState((state) => state.session.valgtEnhetId);
    const formRef = useRef<HTMLFormElement>(null);
    const oppgaveTilknyttning = finnOppgaveForTraad(valgtTraad, tildelteOppgaverResource.resource);

    useFocusOnFirstFocusable(formRef);

    const melding = eldsteMelding(valgtTraad);
    const merkPost = (url: string, object: any, name: string) => {
        post(url, object, 'MerkPanel-' + name)
            .then(() => {
                settResultat(Resultat.VELLYKKET);
                setSubmitting(false);
                dispatch(traderResource.actions.reload);
                dispatch(tildelteOppgaverResource.actions.reload);
                dispatch(setIngenValgtTraadDialogpanel());
            })
            .catch(() => {
                settResultat(Resultat.FEIL);
                setSubmitting(false);
            });
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!valgtOperasjon || submitting) {
            return;
        }
        setSubmitting(true);

        switch (valgtOperasjon) {
            case MerkOperasjon.FEILSENDT:
                merkPost(MERK_FEILSENDT_URL, getMerkBehandlingskjedeRequest(valgtBrukersFnr, valgtTraad), 'Feilsendt');
                break;
            case MerkOperasjon.SLADDING:
                merkPost(MERK_SLADDING_URL, getSendTilSladdingRequest(valgtBrukersFnr, valgtTraad), 'Sladding');
                break;
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
                name={'merk'}
                checked={valgtOperasjon}
                legend={''}
                onChange={(_, value) => settValgtOperasjon(MerkOperasjon[value])}
            />
            {valgtOperasjon === MerkOperasjon.SLADDING && (
                <AlertStripeAdvarsel className="blokk-xxs">
                    Årsak må meldes i{' '}
                    <a
                        href="https://jira.adeo.no/plugins/servlet/desk/portal/541/create/1481"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        porten
                    </a>
                    .
                </AlertStripeAdvarsel>
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
