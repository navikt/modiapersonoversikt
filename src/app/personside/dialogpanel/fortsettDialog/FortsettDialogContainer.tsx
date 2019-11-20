import * as React from 'react';
import { FormEvent, useState } from 'react';
import FortsettDialog from './FortsettDialog';
import { FortsettDialogValidator } from './validatorer';
import { ForsettDialogRequest, Meldingstype, SendDelsvarRequest, Traad } from '../../../../models/meldinger/meldinger';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { useFødselsnummer, useRestResource } from '../../../../utils/customHooks';
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
import { loggError, loggEvent } from '../../../../utils/frontendLogger';
import { post } from '../../../../api/api';
import { apiBaseUri } from '../../../../api/config';
import {
    DialogPanelStatus,
    FortsettDialogPanelState,
    FortsettDialogState,
    KvitteringsData
} from './FortsettDialogTypes';

export type FortsettDialogType =
    | Meldingstype.SVAR_SKRIFTLIG
    | Meldingstype.DELVIS_SVAR_SKRIFTLIG
    | Meldingstype.SVAR_OPPMOTE
    | Meldingstype.SVAR_TELEFON
    | Meldingstype.SPORSMAL_MODIA_UTGAAENDE;

interface Props {
    traad: Traad;
}

function FortsettDialogContainer(props: Props) {
    const initialState = {
        tekst: '',
        dialogType: Meldingstype.SVAR_SKRIFTLIG as FortsettDialogType,
        tema: undefined,
        visFeilmeldinger: false,
        sak: undefined,
        oppgaveListe: OppgavelisteValg.MinListe
    };
    const [state, setState] = useState<FortsettDialogState>(initialState);
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const resetPlukkOppgaveResource = useRestResource(resources => resources.plukkNyeOppgaver.actions.reset);
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver.actions.reload);
    const fnr = useFødselsnummer();
    const [dialogStatus, setDialogStatus] = useState<FortsettDialogPanelState>({
        type: DialogPanelStatus.UNDER_ARBEID
    });
    const dispatch = useDispatch();
    const updateState = (change: Partial<FortsettDialogState>) =>
        setState({
            ...state,
            visFeilmeldinger: false,
            ...change
        });

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

    const handleAvbryt = () => dispatch(setIngenValgtTraadDialogpanel());

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (dialogStatus.type === DialogPanelStatus.POSTING) {
            return;
        }
        const callback = () => {
            dispatch(resetPlukkOppgaveResource);
            dispatch(reloadTildelteOppgaver);
            dispatch(reloadMeldinger);
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
            const kvitteringsData = {
                fritekst: request.fritekst,
                meldingstype: request.meldingstype
            };
            post(`${apiBaseUri}/dialog/${fnr}/fortsett/ferdigstill`, request)
                .then(() => {
                    callback();
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                    loggEvent('Send-Svar', 'FortsettDialog');
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                    loggEvent('Send-Svar-Failed', 'FortsettDialog');
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
            const kvitteringsData = {
                fritekst: request.fritekst,
                meldingstype: request.meldingstype
            };
            post(`${apiBaseUri}/dialog/${fnr}/fortsett/ferdigstill`, request)
                .then(() => {
                    callback();
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                    loggEvent('Send-Spørsmål', 'FortsettDialog');
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                    loggEvent('Send-Spørsmål-Failed', 'FortsettDialog');
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
            post(`${apiBaseUri}/dialog/${fnr}/delvis-svar`, request)
                .then(() => {
                    callback();
                    const kvitteringsData: KvitteringsData = {
                        fritekst: request.fritekst,
                        meldingstype: Meldingstype.DELVIS_SVAR_SKRIFTLIG,
                        temagruppe: request.temagruppe
                    };
                    setDialogStatus({ type: DialogPanelStatus.DELSVAR_SENDT, kvitteringsData: kvitteringsData });
                    loggEvent('Send-Delsvar', 'FortsettDialog');
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                    loggEvent('Send-Delsvar-Failed', 'FortsettDialog');
                });
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    const meldingMedTemagruppe = props.traad.meldinger.find(melding => melding.temagruppe);
    const temagruppe = meldingMedTemagruppe ? meldingMedTemagruppe.temagruppe : undefined;

    return (
        <>
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
        </>
    );
}

export default FortsettDialogContainer;
