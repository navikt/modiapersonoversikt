import * as React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Sidetittel, Element } from 'nav-frontend-typografi';
import styled from 'styled-components';
import BrukerundersøkelseSpørsmål from './BrukerundersøkelseSpørsmål';
import { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';

const Style = styled.div`
    padding: 2rem;
`;

const StyledKnapp = styled(Hovedknapp)`
    float: right;
`;

const TittelWrapper = styled.div`
    padding-bottom: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #254b6d;
`;

interface Props {}

const spørsmål = [
    'Hvor ofte opplever du feil?',
    'Hvor ofte finner du det du leter etter ?',
    'Hvor fornøyd er du med brukeropplevelsen?',
    'Hvor fort laster applikasjonen?',
    'Hvor ofte blir du hindret i ditt arbeid fordi applikasjonen henger?',
    'Sammenlignet med andre saksbehandlingssystemer, hvor scorer dette?'
];

interface State {
    [key: string]: number;
}

function Brukerundersøkelse(props: Props) {
    const [state, setState] = useState(
        spørsmål.reduce(
            (acc: State, spm: string) => ({
                ...acc,
                [spm]: -1
            }),
            {}
        )
    );
    console.log(state);
    return (
        <ModalWrapper isOpen={true} contentLabel={'Brukerundersøkelse'} closeButton={true} onRequestClose={() => null}>
            <Style>
                <TittelWrapper>
                    <Sidetittel>Brukerundersøkelse</Sidetittel>
                    <Element>Her kommer det en beskrivelse av brukerundersøkelsen</Element>
                </TittelWrapper>
                {spørsmål.map(spm => {
                    const value = state[spm];
                    const setValue = (value: number) => setState({ ...state, [spm]: value });
                    return <BrukerundersøkelseSpørsmål sporsmal={spm} value={value} setValue={setValue} />;
                })}

                <StyledKnapp>Send</StyledKnapp>
            </Style>
        </ModalWrapper>
    );
}

export default Brukerundersøkelse;
