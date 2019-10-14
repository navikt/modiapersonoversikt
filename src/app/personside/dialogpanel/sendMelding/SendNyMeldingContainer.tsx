import * as React from 'react';
import { FormEvent, useState } from 'react';
import HurtigReferatContainer from '../Hurtigreferat/HurtigreferatContainer';
import SendNyMelding, { SendNyMeldingState, OppgavelisteValg } from './SendNyMelding';
import styled from 'styled-components';
import { theme } from '../../../../styles/personOversiktTheme';
import { NyMeldingValidator } from './validatorer';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { useRestResource } from '../../../../utils/customHooks';
import { isFinishedPosting, isPosting } from '../../../../rest/utils/postResource';
import { useDispatch } from 'react-redux';
import { ReferatSendtKvittering, SporsmalSendtKvittering } from './SendNyMeldingKvittering';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';

const HurtigreferatWrapper = styled.div`
    background-color: white;
    border-bottom: ${theme.border.skilleSvak};
    padding: 1rem ${theme.margin.layout};
`;

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
    const postReferatResource = useRestResource(resources => resources.sendReferat);
    const postSpørsmålResource = useRestResource(resources => resources.sendSpørsmål);
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const senderMelding = isPosting(postReferatResource) || isPosting(postSpørsmålResource);
    const dispatch = useDispatch();

    const handleAvbryt = () => {
        setState(initialState);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (senderMelding) {
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
            dispatch(
                postReferatResource.actions.post(
                    {
                        fritekst: state.tekst,
                        meldingstype: state.dialogType,
                        temagruppe: state.tema
                    },
                    callback
                )
            );
        } else if (NyMeldingValidator.erGyldigSpørsmal(state) && state.sak) {
            dispatch(
                postSpørsmålResource.actions.post(
                    {
                        fritekst: state.tekst,
                        saksID: state.sak.saksId,
                        erOppgaveTilknyttetAnsatt: state.oppgaveListe === OppgavelisteValg.MinListe
                    },
                    callback
                )
            );
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    if (isFinishedPosting(postReferatResource)) {
        return <ReferatSendtKvittering resource={postReferatResource} />;
    }

    if (isFinishedPosting(postSpørsmålResource)) {
        return <SporsmalSendtKvittering resource={postSpørsmålResource} />;
    }

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
                senderMelding={senderMelding}
            />
        </>
    );
}

export default SendNyMeldingContainer;
