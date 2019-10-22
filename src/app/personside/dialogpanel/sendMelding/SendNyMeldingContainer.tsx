import * as React from 'react';
import { FormEvent, useState } from 'react';
import SendNyMelding, { SendNyMeldingState, OppgavelisteValg } from './SendNyMelding';
import { NyMeldingValidator } from './validatorer';
import { Meldingstype, SendReferatRequest, SendSpørsmålRequest } from '../../../../models/meldinger/meldinger';
import { useFødselsnummer, useRestResource } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { ReferatSendtKvittering, SporsmalSendtKvittering } from './SendNyMeldingKvittering';
import { apiBaseUri } from '../../../../api/config';
import { post } from '../../../../api/api';
import { SendNyMeldingPanelState, SendNyMeldingStatus } from './SendNyMeldingTypes';

const initialState: SendNyMeldingState = {
    tekst: '',
    dialogType: Meldingstype.SAMTALEREFERAT_TELEFON,
    tema: undefined,
    sak: undefined,
    oppgaveListe: OppgavelisteValg.MinListe,
    visFeilmeldinger: false
};

function SendNyMeldingContainer() {
    const [state, setState] = useState<SendNyMeldingState>(initialState);
    const updateState = (change: Partial<SendNyMeldingState>) =>
        setState(currentState => ({ ...currentState, visFeilmeldinger: false, ...change }));
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const dispatch = useDispatch();
    const fnr = useFødselsnummer();
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

    const handleAvbryt = () => {
        setState(initialState);
        setSendNyMeldingStatus({ type: SendNyMeldingStatus.UNDER_ARBEID });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (sendNyMeldingStatus.type === SendNyMeldingStatus.POSTING) {
            return;
        }
        const callback = () => {
            updateState(initialState);
            dispatch(reloadMeldinger);
        };

        if (
            NyMeldingValidator.erGyldigReferat(state) &&
            state.tema &&
            state.dialogType !== Meldingstype.SPORSMAL_MODIA_UTGAAENDE
        ) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendReferatRequest = {
                fritekst: state.tekst,
                meldingstype: state.dialogType,
                temagruppe: state.tema
            };
            post(`${apiBaseUri}/dialog/${fnr}/sendreferat`, request)
                .then(() => {
                    callback();
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.REFERAT_SENDT, request: request });
                })
                .catch(() => {
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.ERROR });
                });
        } else if (NyMeldingValidator.erGyldigSpørsmal(state) && state.sak) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendSpørsmålRequest = {
                fritekst: state.tekst,
                saksID: state.sak.saksId,
                erOppgaveTilknyttetAnsatt: state.oppgaveListe === OppgavelisteValg.MinListe
            };

            post(`${apiBaseUri}/dialog/${fnr}/sendsporsmal`, request)
                .then(() => {
                    callback();
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.SPORSMAL_SENDT, fritekst: request.fritekst });
                })
                .catch(() => {
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.ERROR });
                });
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    return (
        <>
            <SendNyMelding
                updateState={updateState}
                state={state}
                handleSubmit={handleSubmit}
                handleAvbryt={handleAvbryt}
                formErEndret={state !== initialState}
                sendNyMeldingPanelState={sendNyMeldingStatus}
            />
        </>
    );
}

export default SendNyMeldingContainer;
