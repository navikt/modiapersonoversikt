import * as React from 'react';
import HurtigReferatContainer from '../Hurtigreferat/HurtigreferatContainer';
import SendNyMelding, { FormState, OppgavelisteValg } from './SendNyMelding';
import styled from 'styled-components';
import { theme } from '../../../../styles/personOversiktTheme';
import { FormEvent } from 'react';
import { NyMeldingValidator } from './validatorer';
import { KommunikasjonsKanal, Meldingstype } from '../../../../models/meldinger/meldinger';
import { useState } from 'react';
import { useRestResource } from '../../../../utils/customHooks';
import { isFailedPosting, isFinishedPosting, isPosting } from '../../../../rest/utils/postResource';
import { useDispatch } from 'react-redux';
import SendNyMeldingKvittering from './SendNyMeldingKvittering';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';

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
    const meldingSendt = isFinishedPosting(postReferatResource) || isFinishedPosting(postSpørsmålResource);
    const meldingFeilet = isFailedPosting(postReferatResource) || isFailedPosting(postSpørsmålResource);
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
        if (NyMeldingValidator.erGyldigReferat(state) && state.tema) {
            const erOppmøte = state.dialogType === Meldingstype.SAMTALEREFERAT_OPPMOTE;
            dispatch(
                postReferatResource.actions.post(
                    {
                        fritekst: state.tekst,
                        kanal: erOppmøte ? KommunikasjonsKanal.Oppmøte : KommunikasjonsKanal.Telefon,
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

    if (meldingSendt || meldingFeilet) {
        return <SendNyMeldingKvittering />;
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
