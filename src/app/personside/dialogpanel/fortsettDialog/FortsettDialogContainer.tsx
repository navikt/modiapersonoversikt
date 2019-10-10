import * as React from 'react';
import { FormEvent, useState } from 'react';
import FortsettDialog from './FortsettDialog';
import { isPosting } from '../../../../rest/utils/postResource';
import { FortsettDialogValidator } from './validatorer';
import { Meldingstype, Temagruppe, Traad } from '../../../../models/meldinger/meldinger';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { useRestResource } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import { Kodeverk } from '../../../../models/kodeverk';
import { Oppgave } from '../../../../models/oppgave';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import LeggTilbakepanel from './leggTilbakePanel/LeggTilbakepanel';
import { useFortsettDialogKvittering } from './FortsettDialogKvittering';
import useOpprettHenvendelse from './useOpprettHenvendelse';
import { erEldsteMeldingJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import { loggError } from '../../../../utils/frontendLogger';

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
    const sendSvarResource = useRestResource(resources => resources.sendSvar);
    const sendDelsvarResource = useRestResource(resources => resources.sendDelsvar);
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const resetPlukkOppgaveResource = useRestResource(resources => resources.plukkNyeOppgaver.actions.reset);
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver.actions.reload);
    const dispatch = useDispatch();
    const updateState = (change: Partial<FortsettDialogState>) =>
        setState({
            ...state,
            visFeilmeldinger: false,
            ...change
        });

    const opprettHenvendelse = useOpprettHenvendelse(props.traad);
    const kvittering = useFortsettDialogKvittering();
    if (opprettHenvendelse.success === false) {
        return opprettHenvendelse.placeholder;
    }
    if (kvittering) {
        return kvittering;
    }

    const handleAvbryt = () => dispatch(setIngenValgtTraadDialogpanel());

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (isPosting(sendSvarResource)) {
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
            dispatch(
                sendSvarResource.actions.post(
                    {
                        ...commonPayload,
                        erOppgaveTilknyttetAnsatt: erOppgaveTilknyttetAnsatt // Hva skal denne være?
                    },
                    callback
                )
            );
        } else if (FortsettDialogValidator.erGyldigSpørsmålSkriftlig(state, props.traad)) {
            const erJournalfort = erEldsteMeldingJournalfort(props.traad);
            if (!state.sak && !erJournalfort) {
                const error = Error('For å opprette spørsmål må meldingen være journalført eller sak må være valgt');
                console.error(error);
                loggError(error);
                return;
            }
            dispatch(
                sendSvarResource.actions.post(
                    {
                        ...commonPayload,
                        erOppgaveTilknyttetAnsatt: erOppgaveTilknyttetAnsatt,
                        saksId: state.sak ? state.sak.saksId : undefined
                    },
                    callback
                )
            );
        } else if (FortsettDialogValidator.erGyldigDelsvar(state) && props.tilknyttetOppgave && state.tema) {
            dispatch(
                sendDelsvarResource.actions.post(
                    {
                        fritekst: state.tekst,
                        traadId: props.traad.traadId,
                        oppgaveId: props.tilknyttetOppgave.oppgaveid,
                        temagruppe: state.tema.kodeRef,
                        behandlingsId: opprettHenvendelse.behandlingsId
                    },
                    callback
                )
            );
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
            />
            {props.tilknyttetOppgave && <LeggTilbakepanel oppgave={props.tilknyttetOppgave} temagruppe={temagruppe} />}
        </>
    );
}

export default FortsettDialogContainer;
