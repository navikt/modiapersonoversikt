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
    erEldsteMeldingJournalfort,
    erFeilsendt,
    erKommunaleTjenester,
    erKontorsperret,
    erMeldingFeilsendt,
    erMeldingSpørsmål,
    erMeldingstypeSamtalereferat,
    harDelsvar
} from '../../../utils/meldingerUtils';
import { Meldingstype, Traad } from '../../../../../../../models/meldinger/meldinger';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { apiBaseUri, includeCredentials } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import {
    MerkAvsluttUtenSvarRequest,
    MerkRequestMedBehandlingskjede,
    MerkRequestMedTraadId,
    MerkTvungenFerdigstillRequest
} from '../../../../../../../models/meldinger/merk';
import { AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Resultat } from '../utils/VisPostResultat';
import { Kontorsperr } from './Kontorsperr';
import { useAppState } from '../../../../../../../utils/customHooks';
import { hasData, isPending } from '@nutgaard/use-async';
import { FetchResult } from '@nutgaard/use-fetch';
import { useFetchWithLog } from '../../../../../../../utils/hooks/useFetchWithLog';
import { useRestResource } from '../../../../../../../rest/consumer/useRestResource';
import { usePostResource } from '../../../../../../../rest/consumer/usePostResource';
import { useFocusOnFirstInputOnMount } from '../../../../../../../utils/hooks/useFocusOnFirstInputOnMount';
import { setIngenValgtTraadDialogpanel } from '../../../../../../../redux/oppgave/actions';
import useTildelteOppgaver from '../../../../../../../utils/hooks/useTildelteOppgaver';
import { Oppgave } from '../../../../../../../models/oppgave';

interface Props {
    lukkPanel: () => void;
    valgtTraad: Traad;
}

enum MerkOperasjon {
    FEILSENDT = 'FEILSENDT',
    BISYS = 'BISYS',
    KONTORSPERRET = 'KONTORSPERRET',
    AVSLUTT = 'AVSLUTT',
    SLETT = 'SLETT',
    FERDIGSTILL = 'FERDIGSTILL'
}

const KnappStyle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AlertStyling = styled.div`
    > * {
        margin-top: 1rem;
    }
`;

const InfoStyling = styled.div`
    margin-bottom: 0.5rem;
`;

const MERK_AVSLUTT_URL = `${apiBaseUri}/dialogmerking/avslutt`;
const MERK_BISYS_URL = `${apiBaseUri}/dialogmerking/bidrag`;
const MERK_FEILSENDT_URL = `${apiBaseUri}/dialogmerking/feilsendt`;
const MERK_SLETT_URL = `${apiBaseUri}/dialogmerking/slett`;
const MERK_TVUNGEN_FERDIGSTILL_URL = `${apiBaseUri}/dialogmerking/tvungenferdigstill`;

function lagBehandlingskjede(traad: Traad) {
    return traad.meldinger.filter(melding => !erMeldingFeilsendt(melding)).map(melding => melding.id);
}

function visStandardvalg(valgtTraad: Traad) {
    return (
        !erEldsteMeldingJournalfort(valgtTraad) &&
        !erFeilsendt(valgtTraad) &&
        erBehandlet(valgtTraad) &&
        !erKontorsperret(valgtTraad)
    );
}

function visFerdigstillUtenSvar(meldingstype: Meldingstype, valgtTraad: Traad) {
    return (
        erMeldingSpørsmål(meldingstype) &&
        !erKontorsperret(valgtTraad) &&
        !erBehandlet(valgtTraad) &&
        !harDelsvar(valgtTraad)
    );
}

function visTvungenFerdigstillelse(valgtTraad: Traad, tildelteOppgaver: Oppgave[]) {
    const oppgavenTildeltBruker = tildelteOppgaver.find(it => it.traadId === valgtTraad.traadId);
    return erBehandlet(valgtTraad) && oppgavenTildeltBruker;
}

function getMerkAvsluttRequest(fnr: string, traad: Traad, valgtEnhet: string): MerkAvsluttUtenSvarRequest {
    return {
        fnr: fnr,
        saksbehandlerValgtEnhet: valgtEnhet,
        eldsteMeldingOppgaveId: eldsteMelding(traad).oppgaveId,
        eldsteMeldingTraadId: traad.traadId
    };
}
function getTvungenFerdigstillRequest(fnr: string, traad: Traad, valgtEnhet: string): MerkTvungenFerdigstillRequest {
    return {
        fnr: fnr,
        saksbehandlerValgtEnhet: valgtEnhet,
        eldsteMeldingOppgaveId: eldsteMelding(traad).oppgaveId,
        eldsteMeldingTraadId: traad.traadId,
        beskrivelse: 'Tvungen ferdigstillelse i Modia'
    };
}

function getMerkBisysRequest(fnr: string, traad: Traad): MerkRequestMedTraadId {
    return {
        fnr: fnr,
        eldsteMeldingTraadId: eldsteMelding(traad).id
    };
}

function getMerkBehandlingskjedeRequest(fnr: string, traad: Traad): MerkRequestMedBehandlingskjede {
    return {
        fnr: fnr,
        behandlingsidListe: lagBehandlingskjede(traad)
    };
}

function MerkPanel(props: Props) {
    const dispatch = useDispatch();
    const saksbehandlerKanSletteFetch: FetchResult<Boolean> = useFetchWithLog<Boolean>(
        MERK_SLETT_URL,
        'MerkPanel-KanSletteMelding',
        includeCredentials
    );
    const tråderResource = useRestResource(resources => resources.tråderOgMeldinger);

    const reloadMeldinger = tråderResource.actions.reload;
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver).actions.reload;
    const resetPlukkOppgaveResource = usePostResource(resources => resources.plukkNyeOppgaver).actions.reset;
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);
    const tildelteOppgaver = useTildelteOppgaver();

    const [valgtOperasjon, settValgtOperasjon] = useState<MerkOperasjon | undefined>(undefined);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [submitting, setSubmitting] = useState(false);
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const valgtTraad = props.valgtTraad;
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);
    const formRef = useRef<HTMLFormElement>(null);

    useFocusOnFirstInputOnMount(formRef);

    const melding = eldsteMelding(valgtTraad);

    const saksbehandlerKanSlette =
        !isPending(saksbehandlerKanSletteFetch) &&
        hasData(saksbehandlerKanSletteFetch) &&
        saksbehandlerKanSletteFetch.data;
    const visSletting =
        saksbehandlerKanSlette &&
        (erMeldingstypeSamtalereferat(melding.meldingstype) || erMeldingSpørsmål(melding.meldingstype));

    const disableStandardvalg = !visStandardvalg(valgtTraad);
    const disableBidrag = !(!erKommunaleTjenester(melding.temagruppe) && visStandardvalg(valgtTraad));
    const disableFerdigstillUtenSvar = !visFerdigstillUtenSvar(melding.meldingstype, valgtTraad);
    const disableTvungenFerdigstill = !visTvungenFerdigstillelse(valgtTraad, tildelteOppgaver.paaBruker);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!valgtOperasjon || submitting) {
            return;
        }
        setSubmitting(true);

        switch (valgtOperasjon) {
            case MerkOperasjon.AVSLUTT:
                merkPost(
                    MERK_AVSLUTT_URL,
                    getMerkAvsluttRequest(valgtBrukersFnr, valgtTraad, valgtEnhet || ''),
                    'AvluttUtenSvar'
                );
                break;
            case MerkOperasjon.BISYS:
                merkPost(MERK_BISYS_URL, getMerkBisysRequest(valgtBrukersFnr, valgtTraad), 'Bisys');
                break;
            case MerkOperasjon.FEILSENDT:
                merkPost(MERK_FEILSENDT_URL, getMerkBehandlingskjedeRequest(valgtBrukersFnr, valgtTraad), 'Feilsendt');
                break;
            case MerkOperasjon.KONTORSPERRET: // Håndteres i egen funksjon
                break;
            case MerkOperasjon.SLETT:
                merkPost(MERK_SLETT_URL, getMerkBehandlingskjedeRequest(valgtBrukersFnr, valgtTraad), 'Sletting');
                break;
            case MerkOperasjon.FERDIGSTILL:
                merkPost(
                    MERK_TVUNGEN_FERDIGSTILL_URL,
                    getTvungenFerdigstillRequest(valgtBrukersFnr, valgtTraad, valgtEnhet || ''),
                    'TvungenAvslutting'
                );
                break;
        }
    };

    const callback = () => {
        dispatch(reloadMeldinger);
        dispatch(reloadTildelteOppgaver);
        dispatch(resetPlukkOppgaveResource);
    };

    const resetDialogpanel = () => {
        if (valgtTraad !== dialogpanelTraad || valgtOperasjon === MerkOperasjon.BISYS) {
            return;
        }
        dispatch(setIngenValgtTraadDialogpanel());
    };

    function merkPost(url: string, object: any, name: string) {
        post(url, object, 'MerkPanel-' + name)
            .then(() => {
                settResultat(Resultat.VELLYKKET);
                setSubmitting(false);
                callback();
                resetDialogpanel();
            })
            .catch((error: Error) => {
                settResultat(Resultat.FEIL);
                setSubmitting(false);
            });
    }

    if (resultat) {
        const alert =
            resultat === Resultat.VELLYKKET ? (
                <AlertStripeSuksess>Tråd merket</AlertStripeSuksess>
            ) : (
                <AlertStripeFeil>Klarte ikke å merke tråd</AlertStripeFeil>
            );
        return (
            <AlertStyling>
                {alert}
                <Hovedknapp onClick={props.lukkPanel}>Lukk</Hovedknapp>
            </AlertStyling>
        );
    }

    const tilbake = () => {
        settValgtOperasjon(undefined);
    };

    if (valgtOperasjon === MerkOperasjon.KONTORSPERRET) {
        return (
            <Kontorsperr
                valgtTraad={props.valgtTraad}
                tilbake={tilbake}
                lukkPanel={props.lukkPanel}
                merkPost={merkPost}
            />
        );
    } else {
        const radioprops = [
            { label: 'Feilsendt post', value: MerkOperasjon.FEILSENDT, disabled: disableStandardvalg },
            { label: 'Kopiert inn i Bisys', value: MerkOperasjon.BISYS, disabled: disableBidrag },
            { label: 'Kontorsperret', value: MerkOperasjon.KONTORSPERRET, disabled: disableStandardvalg },
            {
                label: 'Avslutt uten å svare bruker',
                value: MerkOperasjon.AVSLUTT,
                disabled: disableFerdigstillUtenSvar
            },
            {
                label: 'Overstyrt ferdigstillelse av oppgave',
                value: MerkOperasjon.FERDIGSTILL,
                disabled: disableTvungenFerdigstill
            }
        ];
        if (visSletting) {
            radioprops.push({ label: 'Merk for sletting', value: MerkOperasjon.SLETT, disabled: false });
        }
        return (
            <form onSubmit={submitHandler} ref={formRef}>
                <RadioPanelGruppe
                    radios={radioprops}
                    name={'merk'}
                    checked={valgtOperasjon}
                    legend={''}
                    onChange={(_, value) => settValgtOperasjon(MerkOperasjon[value])}
                />
                {!disableTvungenFerdigstill && (
                    <InfoStyling>
                        <AlertStripeInfo>
                            Dersom oppgaven allerede er besvart og avsluttet kan man benytte overstyrt ferdigstillelse
                            av oppgave
                        </AlertStripeInfo>
                    </InfoStyling>
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
}

export default MerkPanel;
