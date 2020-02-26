import * as React from 'react';
import { FormEvent, useRef, useState } from 'react';
import FortsettDialog from './FortsettDialog';
import { FortsettDialogValidator } from './validatorer';
import { ForsettDialogRequest, Meldingstype, SendDelsvarRequest, Traad } from '../../../../models/meldinger/meldinger';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { useAppState, useFødselsnummer } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import LeggTilbakepanel from './leggTilbakePanel/LeggTilbakepanel';
import {
    DelsvarRegistrertKvittering,
    OppgaveLagtTilbakeKvittering,
    SvarSendtKvittering
} from './FortsettDialogKvittering';
import useOpprettHenvendelse from './useOpprettHenvendelse';
import { erEldsteMeldingJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import { loggError, loggEvent } from '../../../../utils/logger/frontendLogger';
import { post } from '../../../../api/api';
import { apiBaseUri } from '../../../../api/config';
import {
    DialogPanelStatus,
    FortsettDialogPanelState,
    FortsettDialogState,
    KvitteringsData
} from './FortsettDialogTypes';
import { useTimer } from '../../../../utils/hooks/useTimer';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { usePostResource } from '../../../../rest/consumer/usePostResource';
import { Undertittel } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { isFinishedPosting } from '../../../../rest/utils/postResource';
import ReflowBoundry from '../ReflowBoundry';
import { useDagpengerLogger } from '../dagpengerlogger/dagpengerlogger';

export type FortsettDialogType =
    | Meldingstype.SVAR_SKRIFTLIG
    | Meldingstype.DELVIS_SVAR_SKRIFTLIG
    | Meldingstype.SVAR_OPPMOTE
    | Meldingstype.SVAR_TELEFON
    | Meldingstype.SPORSMAL_MODIA_UTGAAENDE;

interface Props {
    traad: Traad;
}

const StyledArticle = styled.article`
    padding: 1rem ${theme.margin.layout};
`;

function FortsettDialogContainer(props: Props) {
    const initialState = {
        tekst: '',
        dialogType: Meldingstype.SVAR_SKRIFTLIG as FortsettDialogType,
        tema: undefined,
        visFeilmeldinger: false,
        sak: undefined,
        oppgaveListe: OppgavelisteValg.MinListe
    };
    const tittelId = useRef(guid());
    const [state, setState] = useState<FortsettDialogState>(initialState);
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger).actions.reload;
    const plukkOppgaveResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const resetPlukkOppgaveResource = plukkOppgaveResource.actions.reset;
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver).actions.reload;
    const fnr = useFødselsnummer();
    const [dialogStatus, setDialogStatus] = useState<FortsettDialogPanelState>({
        type: DialogPanelStatus.UNDER_ARBEID
    });
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const dispatch = useDispatch();
    const updateState = (change: Partial<FortsettDialogState>) =>
        setState({
            ...state,
            visFeilmeldinger: false,
            ...change
        });
    const getDuration = useTimer();
    const dagpengerLogger = useDagpengerLogger();

    const opprettHenvendelse = useOpprettHenvendelse(props.traad);

    if (dialogStatus.type === DialogPanelStatus.SVAR_SENDT) {
        return <SvarSendtKvittering kvitteringsData={dialogStatus.kvitteringsData} />;
    }
    if (dialogStatus.type === DialogPanelStatus.DELSVAR_SENDT) {
        return <DelsvarRegistrertKvittering kvitteringsData={dialogStatus.kvitteringsData} />;
    }
    if (dialogStatus.type === DialogPanelStatus.OPPGAVE_LAGT_TILBAKE) {
        return <OppgaveLagtTilbakeKvittering payload={dialogStatus.payload} />;
    }

    if (opprettHenvendelse.success === false) {
        return opprettHenvendelse.placeholder;
    }
    const oppgaveId = opprettHenvendelse.henvendelse.oppgaveId;

    const oppgaveFraGosys =
        isFinishedPosting(plukkOppgaveResource) && plukkOppgaveResource.response.find(it => it.fraGosys);

    const handleAvbryt = () => dispatch(setIngenValgtTraadDialogpanel());

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (dialogStatus.type === DialogPanelStatus.POSTING) {
            return;
        }
        const callback = () => {
            loggEvent('TidsbrukMillisekunder', 'FortsettDialog', undefined, { ms: getDuration() });
            dispatch(resetPlukkOppgaveResource);
            dispatch(reloadTildelteOppgaver);
            dispatch(reloadMeldinger);
        };

        const handleAvsluttOppgave = () => {
            if (!oppgaveFraGosys) {
                return;
            }
            const request = {
                fnr: fnr,
                oppgaveid: oppgaveFraGosys.oppgaveId,
                beskrivelse: 'Lest og besvart i Modia',
                saksbehandlerValgtEnhet: saksbehandlersEnhet
            };
            post(`${apiBaseUri}/dialogmerking/avsluttgosysoppgave`, request, 'Avslutt-Oppgave-Fra-Gosys')
                .then(() => {
                    loggEvent('AvsluttGosysOppgaveFraUrl', 'AvsluttOppgaveskjema');
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                    const error = Error('Kunne ikke avslutte oppgave i GOSYS');
                    console.error(error);
                    loggError(error, 'Oppgave');
                });
        };
        const erOppgaveTilknyttetAnsatt = state.oppgaveListe === OppgavelisteValg.MinListe;
        const commonPayload = {
            fritekst: state.tekst,
            meldingstype: state.dialogType,
            traadId: props.traad.traadId,
            behandlingsId: opprettHenvendelse.henvendelse.behandlingsId,
            oppgaveId: oppgaveId
        };
        if (
            FortsettDialogValidator.erGyldigSvarSkriftlig(state) ||
            FortsettDialogValidator.erGyldigSvarOppmote(state) ||
            FortsettDialogValidator.erGyldigSvarTelefon(state)
        ) {
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const request: ForsettDialogRequest = {
                ...commonPayload,
                erOppgaveTilknyttetAnsatt: true // TODO, denne bør ikke være nødvendig å sende med her
            };
            const kvitteringsData: KvitteringsData = {
                fritekst: request.fritekst,
                meldingstype: request.meldingstype,
                traad: props.traad
            };
            post(`${apiBaseUri}/dialog/${fnr}/fortsett/ferdigstill`, request, 'Send-Svar')
                .then(() => {
                    handleAvsluttOppgave();
                    callback();
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                })
                .then(() => dagpengerLogger(request))
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else if (FortsettDialogValidator.erGyldigSpørsmålSkriftlig(state, props.traad)) {
            const erJournalfort = erEldsteMeldingJournalfort(props.traad);
            if (!state.sak && !erJournalfort) {
                const error = Error('For å opprette spørsmål må meldingen være journalført eller sak må være valgt');
                console.error(error);
                loggError(error);
                return;
            }
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const request: ForsettDialogRequest = {
                ...commonPayload,
                erOppgaveTilknyttetAnsatt: erOppgaveTilknyttetAnsatt,
                sak: state.sak ? state.sak : undefined
            };
            const kvitteringsData: KvitteringsData = {
                fritekst: request.fritekst,
                meldingstype: request.meldingstype,
                traad: props.traad
            };
            post(`${apiBaseUri}/dialog/${fnr}/fortsett/ferdigstill`, request, 'Svar-Med-Spørsmål')
                .then(() => {
                    handleAvsluttOppgave();
                    callback();
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else if (FortsettDialogValidator.erGyldigDelsvar(state) && oppgaveId && state.temagruppe) {
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const request: SendDelsvarRequest = {
                fritekst: state.tekst,
                traadId: props.traad.traadId,
                oppgaveId: oppgaveId,
                temagruppe: state.temagruppe,
                behandlingsId: opprettHenvendelse.henvendelse.behandlingsId
            };
            post(`${apiBaseUri}/dialog/${fnr}/delvis-svar`, request, 'Send-Delsvar')
                .then(() => {
                    callback();
                    const kvitteringsData: KvitteringsData = {
                        fritekst: request.fritekst,
                        meldingstype: Meldingstype.DELVIS_SVAR_SKRIFTLIG,
                        temagruppe: request.temagruppe,
                        traad: props.traad
                    };
                    setDialogStatus({ type: DialogPanelStatus.DELSVAR_SENDT, kvitteringsData: kvitteringsData });
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    const meldingMedTemagruppe = props.traad.meldinger.find(melding => melding.temagruppe);
    const temagruppe = meldingMedTemagruppe ? meldingMedTemagruppe.temagruppe : undefined;

    return (
        <StyledArticle aria-labelledby={tittelId.current}>
            <ReflowBoundry>
                <Undertittel id={tittelId.current}>Fortsett dialog</Undertittel>
                <FortsettDialog
                    handleAvbryt={handleAvbryt}
                    state={state}
                    updateState={updateState}
                    handleSubmit={handleSubmit}
                    traad={props.traad}
                    key={props.traad.traadId}
                    fortsettDialogPanelState={dialogStatus}
                    erTilknyttetOppgave={!!oppgaveId}
                />
                {oppgaveId && (
                    <LeggTilbakepanel
                        oppgaveId={oppgaveId}
                        status={dialogStatus}
                        setDialogStatus={setDialogStatus}
                        temagruppe={temagruppe}
                    />
                )}
            </ReflowBoundry>
        </StyledArticle>
    );
}

export default FortsettDialogContainer;
