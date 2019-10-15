import * as React from 'react';
import { FormEvent, useState } from 'react';
import HurtigReferatContainer from '../Hurtigreferat/HurtigreferatContainer';
import SendNyMelding, { FormState, OppgavelisteValg } from './SendNyMelding';
import styled from 'styled-components';
import { theme } from '../../../../styles/personOversiktTheme';
import { NyMeldingValidator } from './validatorer';
import { Meldingstype, SendReferatRequest, SendSpørsmålRequest } from '../../../../models/meldinger/meldinger';
import { useFødselsnummer, useRestResource } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { ReferatSendtKvittering, SporsmalSendtKvittering } from './SendNyMeldingKvittering';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';
import { apiBaseUri } from '../../../../api/config';
import { post } from '../../../../api/api';

const HurtigreferatWrapper = styled.div`
    background-color: white;
    border-bottom: ${theme.border.skilleSvak};
    padding: 1rem ${theme.margin.layout};
`;

const initialState: FormState = {
    tekst: '',
    dialogType: Meldingstype.SAMTALEREFERAT_TELEFON,
    tema: undefined,
    sak: undefined,
    oppgaveListe: OppgavelisteValg.MinListe,
    visFeilmeldinger: false
};

export enum SendNyMeldingStatus {
    UNDER_ARBEID,
    POSTING,
    ERROR,
    REFERAT_SENDT,
    SPORSMAL_SENDT
}

interface SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus;
}

interface UnderArbeid extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.UNDER_ARBEID | SendNyMeldingStatus.POSTING | SendNyMeldingStatus.ERROR;
}

interface ReferatSendtSuccess extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.REFERAT_SENDT;
    request: SendReferatRequest;
}

interface SporsmalSendtSuccess extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.SPORSMAL_SENDT;
    fritekst: string;
}

export type SendNyMeldingPanelState = UnderArbeid | ReferatSendtSuccess | SporsmalSendtSuccess;

function SendNyMeldingContainer() {
    const [state, setState] = useState<FormState>(initialState);
    const updateState = (change: Partial<FormState>) =>
        setState(currentState => ({ ...currentState, visFeilmeldinger: false, ...change }));
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const dispatch = useDispatch();
    const fnr = useFødselsnummer();
    const [sendNyMeldingStatus, setSendNyMeldingStatus] = useState<SendNyMeldingPanelState>({
        type: SendNyMeldingStatus.UNDER_ARBEID
    });

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.REFERAT_SENDT) {
        return <ReferatSendtKvittering request={sendNyMeldingStatus.request} />;
    }

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.SPORSMAL_SENDT) {
        return <SporsmalSendtKvittering fritekst={sendNyMeldingStatus.fritekst} />;
    }

    const handleAvbryt = () => {
        setState(initialState);
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
                temagruppe: state.tema.kodeRef
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
            <IfFeatureToggleOn toggleID={FeatureToggles.Hurtigreferat}>
                <HurtigreferatWrapper>
                    <HurtigReferatContainer />
                </HurtigreferatWrapper>
            </IfFeatureToggleOn>
            <SendNyMelding
                updateState={updateState}
                state={state}
                handleSubmit={handleSubmit}
                handleAvbryt={handleAvbryt}
                formErEndret={state !== initialState}
                status={sendNyMeldingStatus}
            />
        </>
    );
}

export default SendNyMeldingContainer;
