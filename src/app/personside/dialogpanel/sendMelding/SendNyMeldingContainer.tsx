import * as React from 'react';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import SendNyMelding, { OppgavelisteValg, SendNyMeldingState } from './SendNyMelding';
import { NyMeldingValidator } from './validatorer';
import {
    Meldingstype,
    SendInfomeldingRequest,
    SendReferatRequest,
    SendSpørsmålRequest
} from '../../../../models/meldinger/meldinger';
import { useAppState, useFodselsnummer } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import {
    InfomeldingSendtKvittering,
    ReferatSendtKvittering,
    MeldingSendtFeilet,
    SporsmalSendtKvittering
} from './SendNyMeldingKvittering';
import { apiBaseUri } from '../../../../api/config';
import { post } from '../../../../api/api';
import { SendNyMeldingPanelState, SendNyMeldingStatus } from './SendNyMeldingTypes';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import useDraft, { Draft } from '../use-draft';
import { feilMeldinger } from './FeilMeldinger';
import * as JournalforingUtils from '../../journalforings-use-fetch-utils';
import { selectValgtEnhet } from '../../../../redux/session/session';

const initialState: SendNyMeldingState = {
    tekst: '',
    dialogType: Meldingstype.SAMTALEREFERAT_TELEFON,
    tema: undefined,
    sak: undefined,
    oppgaveListe: OppgavelisteValg.MinListe,
    visFeilmeldinger: false
};

function SendNyMeldingContainer() {
    const dispatch = useDispatch();
    const fnr = useFodselsnummer();
    const reloadMeldinger = useRestResource(resources => resources.traader).actions.reload;

    const valgtEnhet = useAppState(selectValgtEnhet);
    const [state, setState] = useState<SendNyMeldingState>(initialState);
    const draftLoader = useCallback((draft: Draft) => setState(current => ({ ...current, tekst: draft.content })), [
        setState
    ]);
    const draftContext = useMemo(() => ({ fnr }), [fnr]);
    const { update: updateDraft, remove: removeDraft } = useDraft(draftContext, draftLoader);
    const updateState = useCallback(
        (change: Partial<SendNyMeldingState>) =>
            setState(currentState => {
                if (change.tekst !== undefined) {
                    updateDraft(change.tekst);
                }
                return { ...currentState, visFeilmeldinger: false, ...change };
            }),
        [setState, updateDraft]
    );

    const [sendNyMeldingStatus, setSendNyMeldingStatus] = useState<SendNyMeldingPanelState>({
        type: SendNyMeldingStatus.UNDER_ARBEID
    });
    const lukkSendtKvittering = () => {
        setSendNyMeldingStatus({ type: SendNyMeldingStatus.UNDER_ARBEID });
        setState(initialState);
    };

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.REFERAT_SENDT) {
        return <ReferatSendtKvittering request={sendNyMeldingStatus.request} lukk={lukkSendtKvittering} />;
    }

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.SPORSMAL_SENDT) {
        return <SporsmalSendtKvittering fritekst={sendNyMeldingStatus.fritekst} lukk={lukkSendtKvittering} />;
    }
    if (sendNyMeldingStatus.type === SendNyMeldingStatus.INFORMELDING_SENDT) {
        return <InfomeldingSendtKvittering fritekst={sendNyMeldingStatus.fritekst} lukk={lukkSendtKvittering} />;
    }

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.ERROR) {
        return <MeldingSendtFeilet fritekst={sendNyMeldingStatus.fritekst} lukk={lukkSendtKvittering} />;
    }

    const handleAvbryt = () => {
        removeDraft();
        setState(initialState);
        setSendNyMeldingStatus({ type: SendNyMeldingStatus.UNDER_ARBEID });
    };

    const handleFeilMelding = (error: Error) => {
        const feilType = JSON.parse(error.toString()).type;
        return feilMeldinger[feilType];
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (sendNyMeldingStatus.type === SendNyMeldingStatus.POSTING) {
            return;
        }
        const callback = () => {
            removeDraft();
            updateState(initialState);
            dispatch(reloadMeldinger);
        };

        if (
            NyMeldingValidator.erGyldigReferat(state) &&
            state.tema &&
            state.dialogType !== Meldingstype.SPORSMAL_MODIA_UTGAAENDE &&
            state.dialogType !== Meldingstype.INFOMELDING_MODIA_UTGAAENDE
        ) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendReferatRequest = {
                enhet: valgtEnhet,
                fritekst: state.tekst,
                meldingstype: state.dialogType,
                temagruppe: state.tema
            };
            post(`${apiBaseUri}/dialog/${fnr}/sendreferat`, request, 'Send-Referat')
                .then(() => {
                    callback();
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.REFERAT_SENDT, request: request });
                })
                .catch(error => {
                    console.error('Send-Referat feilet', error);
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.ERROR, fritekst: request.fritekst });
                });
        } else if (NyMeldingValidator.erGyldigSpørsmal(state) && state.sak) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendSpørsmålRequest = {
                enhet: valgtEnhet,
                fritekst: state.tekst,
                sak: state.sak,
                erOppgaveTilknyttetAnsatt: state.oppgaveListe === OppgavelisteValg.MinListe
            };
            post(`${apiBaseUri}/dialog/${fnr}/sendsporsmal`, request, 'Send-Sporsmal')
                .then(() => {
                    JournalforingUtils.slettCacheForSammensatteSaker(fnr);
                    callback();
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.SPORSMAL_SENDT, fritekst: request.fritekst });
                })
                .catch(error => {
                    callback();
                    console.error('Send-Sporsmal feilet', error);
                    setSendNyMeldingStatus({
                        type: SendNyMeldingStatus.ERROR,
                        fritekst: handleFeilMelding(error)
                    });
                    updateState({ visFeilmeldinger: true });
                });
        } else if (NyMeldingValidator.erGyldigInfomelding(state) && state.sak) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendInfomeldingRequest = {
                enhet: valgtEnhet,
                fritekst: state.tekst,
                sak: state.sak
            };
            post(`${apiBaseUri}/dialog/${fnr}/sendinfomelding`, request, 'Send-Infomelding')
                .then(() => {
                    callback();
                    setSendNyMeldingStatus({
                        type: SendNyMeldingStatus.INFORMELDING_SENDT,
                        fritekst: request.fritekst
                    });
                })
                .catch(error => {
                    callback();
                    setSendNyMeldingStatus({
                        type: SendNyMeldingStatus.ERROR,
                        fritekst: handleFeilMelding(error)
                    });
                    updateState({ visFeilmeldinger: true });
                });
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    return (
        <SendNyMelding
            updateState={updateState}
            state={state}
            handleSubmit={handleSubmit}
            handleAvbryt={handleAvbryt}
            formErEndret={state !== initialState}
            sendNyMeldingPanelState={sendNyMeldingStatus}
        />
    );
}

export default SendNyMeldingContainer;
