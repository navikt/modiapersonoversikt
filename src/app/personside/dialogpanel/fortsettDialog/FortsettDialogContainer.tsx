import * as React from 'react';
import { FormEvent, useState } from 'react';
import FortsettDialog from './FortsettDialog';
import { FortsettDialogValidator } from './validatorer';
import {
    ForsettDialogRequest,
    Meldingstype,
    SendDelsvarRequest,
    Temagruppe,
    Traad
} from '../../../../models/meldinger/meldinger';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { useFødselsnummer, useRestResource } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import { Kodeverk } from '../../../../models/kodeverk';
import { LeggTilbakeOppgaveRequest, Oppgave } from '../../../../models/oppgave';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import LeggTilbakepanel from './leggTilbakePanel/LeggTilbakepanel';
import {
    DelsvarRegistrertKvittering,
    OppgaveLagtTilbakeKvittering,
    SvarSendtKvittering
} from './FortsettDialogKvittering';
import useOpprettHenvendelse from './useOpprettHenvendelse';
import { erEldsteMeldingJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import { loggError } from '../../../../utils/frontendLogger';
import { post } from '../../../../api/api';
import { apiBaseUri } from '../../../../api/config';

export type FortsettDialogType =
    | Meldingstype.SVAR_SKRIFTLIG
    | Meldingstype.DELVIS_SVAR_SKRIFTLIG
    | Meldingstype.SVAR_OPPMOTE
    | Meldingstype.SVAR_TELEFON
    | Meldingstype.SPORSMAL_MODIA_UTGAAENDE;

export interface FortsettDialogState {
    tekst: string;
    dialogType: FortsettDialogType;
    tema?: Kodeverk;
    oppgave?: Oppgave;
    oppgaveListe: OppgavelisteValg;
    sak?: JournalforingsSak;
    visFeilmeldinger: boolean;
}

interface Props {
    traad: Traad;
    tilknyttetOppgave?: Oppgave;
}

export type KvitteringsData = {
    fritekst: string;
    meldingstype: Meldingstype;
    temagruppe?: Temagruppe | string;
};

export enum DialogPanelStatus {
    UNDER_ARBEID,
    POSTING,
    ERROR,
    SVAR_SENDT,
    DELSVAR_SENDT,
    OPPGAVE_LAGT_TILBAKE
}

interface DialogStatusInterface {
    type: DialogPanelStatus;
}

interface UnderArbeid extends DialogStatusInterface {
    type: DialogPanelStatus.UNDER_ARBEID | DialogPanelStatus.POSTING | DialogPanelStatus.ERROR;
}

interface SvarSendtSuccess extends DialogStatusInterface {
    type: DialogPanelStatus.SVAR_SENDT | DialogPanelStatus.DELSVAR_SENDT;
    kvitteringsData: KvitteringsData;
}

interface LeggTilbakeOppgaveSuccess extends DialogStatusInterface {
    type: DialogPanelStatus.OPPGAVE_LAGT_TILBAKE;
    payload: LeggTilbakeOppgaveRequest;
}

export type FortsettDialogPanelState = UnderArbeid | SvarSendtSuccess | LeggTilbakeOppgaveSuccess;

function FortsettDialogContainer(props: Props) {
    const initialState = {
        tekst: '',
        dialogType: Meldingstype.SVAR_SKRIFTLIG as FortsettDialogType,
        tema: undefined,
        oppgave: props.tilknyttetOppgave,
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
        const oppgaveId = props.tilknyttetOppgave ? props.tilknyttetOppgave.oppgaveid : undefined;
        const commonPayload = {
            fritekst: state.tekst,
            meldingstype: state.dialogType,
            traadId: props.traad.traadId,
            behandlingsId: opprettHenvendelse.behandlingsId,
            oppgaveId: oppgaveId
        };
        if (
            FortsettDialogValidator.erGyldigSvarSkriftlig(state) ||
            FortsettDialogValidator.erGyldigSvarOppmote(state) ||
            FortsettDialogValidator.erGyldigSvarTelefon(state)
        ) {
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const payload: ForsettDialogRequest = {
                ...commonPayload,
                erOppgaveTilknyttetAnsatt: erOppgaveTilknyttetAnsatt // Hva skal denne være?
            };
            const kvitteringsData = {
                fritekst: payload.fritekst,
                meldingstype: payload.meldingstype
            };
            post(`${apiBaseUri}/dialog/${fnr}/fortsett/ferdigstill`, payload)
                .then(() => {
                    callback();
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                })
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
            const payload: ForsettDialogRequest = {
                ...commonPayload,
                erOppgaveTilknyttetAnsatt: erOppgaveTilknyttetAnsatt,
                saksId: state.sak ? state.sak.saksId : undefined
            };
            const kvitteringsData = {
                fritekst: payload.fritekst,
                meldingstype: payload.meldingstype
            };
            post(`${apiBaseUri}/dialog/${fnr}/fortsett/ferdigstill`, payload)
                .then(() => {
                    callback();
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else if (FortsettDialogValidator.erGyldigDelsvar(state) && props.tilknyttetOppgave && state.tema) {
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const payload: SendDelsvarRequest = {
                fritekst: state.tekst,
                traadId: props.traad.traadId,
                oppgaveId: props.tilknyttetOppgave.oppgaveid,
                temagruppe: state.tema.kodeRef,
                behandlingsId: opprettHenvendelse.behandlingsId
            };
            post(`${apiBaseUri}/dialog/${fnr}/delvis-svar`, payload)
                .then(() => {
                    callback();
                    const kvitteringsData: KvitteringsData = {
                        fritekst: payload.fritekst,
                        meldingstype: Meldingstype.DELVIS_SVAR_SKRIFTLIG,
                        temagruppe: payload.temagruppe
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
    const temagruppe = meldingMedTemagruppe ? meldingMedTemagruppe.temagruppe : Temagruppe.Null;

    return (
        <>
            <FortsettDialog
                handleAvbryt={handleAvbryt}
                state={state}
                updateState={updateState}
                handleSubmit={handleSubmit}
                traad={props.traad}
                key={props.traad.traadId}
                status={dialogStatus}
            />
            {props.tilknyttetOppgave && (
                <LeggTilbakepanel
                    oppgave={props.tilknyttetOppgave}
                    status={dialogStatus}
                    setDialogStatus={setDialogStatus}
                    temagruppe={temagruppe}
                />
            )}
        </>
    );
}

export default FortsettDialogContainer;
