import * as React from 'react';
import { FormEvent, useState } from 'react';
import HurtigReferatContainer from '../Hurtigreferat/HurtigreferatContainer';
import SendNyMelding, { FormState, OppgavelisteValg } from './SendNyMelding';
import styled from 'styled-components';
import { theme } from '../../../../styles/personOversiktTheme';
import { NyMeldingValidator } from './validatorer';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { useRestResource } from '../../../../utils/customHooks';
import { isFailedPosting, isFinishedPosting, isPosting } from '../../../../rest/utils/postResource';
import { useDispatch } from 'react-redux';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { ReferatSendtKvittering, SporsmalSendtKvittering } from './SendNyMeldingKvittering';
import { DialogpanelFeilmelding } from '../fellesStyling';

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

function SendNyMeldingContainer() {
    const [state, setState] = useState<FormState>(initialState);
    const updateState = (change: Partial<FormState>) => setState({ ...state, visFeilmeldinger: false, ...change });
    const postReferatResource = useRestResource(resources => resources.sendReferat);
    const postSpørsmålResource = useRestResource(resources => resources.sendSpørsmål);
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const senderMelding = isPosting(postReferatResource) || isPosting(postSpørsmålResource);
    const dispatch = useDispatch();

    const handleAvbryt = () => {
        updateState(initialState);
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
                        temagruppe: state.tema.kodeRef
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

    if (senderMelding) {
        return <CenteredLazySpinner type="XL" delay={100} />;
    }

    if (isFinishedPosting(postReferatResource)) {
        return <ReferatSendtKvittering resource={postReferatResource} />;
    }

    if (isFinishedPosting(postSpørsmålResource)) {
        return <SporsmalSendtKvittering resource={postSpørsmålResource} />;
    }

    if (isFailedPosting(postReferatResource)) {
        return <DialogpanelFeilmelding resource={postReferatResource} />;
    }

    if (isFailedPosting(postSpørsmålResource)) {
        return <DialogpanelFeilmelding resource={postSpørsmålResource} />;
    }

    return (
        <>
            <HurtigreferatWrapper>
                <HurtigReferatContainer />
            </HurtigreferatWrapper>
            <SendNyMelding
                updateState={updateState}
                state={state}
                handleSubmit={handleSubmit}
                handleAvbryt={handleAvbryt}
            />
        </>
    );
}

export default SendNyMeldingContainer;
