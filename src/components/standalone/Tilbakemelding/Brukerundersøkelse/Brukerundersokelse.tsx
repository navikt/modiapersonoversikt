import * as React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Sidetittel, Element } from 'nav-frontend-typografi';
import styled from 'styled-components';
import BrukerundersøkelseSpørsmål from './BrukerundersøkelseSpørsmål';
import { FormEvent, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { loggEvent } from '../../../../utils/frontendLogger';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';

const Form = styled.form`
    padding: 2rem;
`;

const StyledKnapp = styled(Hovedknapp)`
    float: right;
`;

const StyledAlertStripeSuksess = styled(AlertStripeSuksess)`
    padding: 1rem;
    margin-bottom: 1rem;
`;

const TittelWrapper = styled.div`
    padding-bottom: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #254b6d;
`;

interface Props {}

const spørsmål = [
    'På en skala fra 1-10, hvor effektivt opplever du at det er å behandle saker generelt?',
    'På en skala fra 1-10, hvor effektivt opplever du at det er å åpne dokumenter i saksoversikten?',
    'Hvor ofte har du opplevd at systemet er nede/ikke fungerer i løpet av de siste 3 månedene?',
    'Hvor ofte opplever du at du må vente på systemet for å kunne komme videre med en oppgave du forsøker å utføre?',
    'Hvor ofte opplever du å miste arbeids du har jobbet med?',
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

    const [visFeilmelding, setVisFeilmelding] = useState(false);
    const [visSuksess, setVisSuksess] = useState(false);
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const alleValgt = !Object.keys(state).some(key => state[key] === -1);
        if (!alleValgt) {
            setVisFeilmelding(true);
            return;
        }
        setVisSuksess(true);
        loggEvent('submit', 'brukerundersøkelse', undefined, state);
    }

    return (
        <ModalWrapper isOpen={true} contentLabel={'Brukerundersøkelse'} closeButton={true} onRequestClose={() => null}>
            <Form onSubmit={handleSubmit}>
                <TittelWrapper>
                    <Sidetittel>Brukerundersøkelse</Sidetittel>
                    <Element>Her kommer det en beskrivelse av brukerundersøkelsen</Element>
                </TittelWrapper>
                {spørsmål.map(spm => {
                    const value = state[spm];
                    const setValue = (value: number) => {
                        setVisFeilmelding(false);
                        return setState({ ...state, [spm]: value });
                    };
                    return (
                        <BrukerundersøkelseSpørsmål
                            visFeilmelding={visFeilmelding && value === -1}
                            sporsmal={spm}
                            value={value}
                            setValue={setValue}
                        />
                    );
                })}
                {visSuksess && <StyledAlertStripeSuksess>Svarene ble sendt!</StyledAlertStripeSuksess>}
                <StyledKnapp htmlType="submit">Send</StyledKnapp>
            </Form>
        </ModalWrapper>
    );
}

export default Brukerundersøkelse;
