import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Hurtigvelger from './Hurtigvelger';
import { Radio, Select, TextareaControlled } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { Tekst, tekster } from './tekster';
import Preview from './Preview';
import theme from '../../styles/personOversiktTheme';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { FlexCenter } from '../common-styled-components';
import HentOppgaveKnappStandalone from '../standalone/HentOppgaveKnapp';
import KnappBase from 'nav-frontend-knapper';

const Style = styled.div`
    width: 30rem;
    min-height: 100%;
    margin-left: auto;
    overflow-y: auto;
    padding: 1.5rem;
    background-color: #eeeef8;
    box-shadow: 0 1rem 2rem grey;
    overflow-y: auto;
    > * {
        margin-bottom: 1rem;
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

const TilbakeMeldingStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${theme.animation.fadeIn};
    > * {
        margin-bottom: 2rem;
    }
`;

const RadioRekke = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
`;

const RadioColumn = styled.div`
    display: grid;
    grid-template-areas: '. radio1 .' '. radio2 .';
    grid-template-columns: 1fr auto 1fr;
    > *:nth-child(1) {
        grid-area: radio1;
    }
    > *:nth-child(2) {
        grid-area: radio2;
    }
    margin-top: 3rem;
`;

// @ts-ignore
const Luft = styled.div`
    margin-bottom: 3rem;
`;

enum State {
    IkkeSendt,
    Sender,
    Sent
}

function FakeDialogPanel() {
    const [state, setState] = useState(State.IkkeSendt);
    const [tekst, setTekst] = useState(tekster[0]);

    if (state === State.Sent) {
        return (
            <Style>
                <TilbakeMeldingStyle>
                    <Undertittel>Svaret ditt er registrert</Undertittel>
                    <Preview tekst={tekst} />
                    <KnappBase type="flat" onClick={() => setState(State.IkkeSendt)}>
                        Tilbake
                    </KnappBase>
                </TilbakeMeldingStyle>
            </Style>
        );
    }

    if (state === State.Sender) {
        setTimeout(() => setState(State.Sent), 2000);
        return (
            <Style>
                <FlexCenter>
                    <NavFrontendSpinner type="XXL" />
                </FlexCenter>
            </Style>
        );
    }

    return (
        <Style>
            <HentOppgaveKnappStandalone />
            <Luft />
            <Hurtigvelger
                send={(valgtTekst: Tekst) => {
                    setState(State.Sender);
                    setTekst(valgtTekst);
                }}
            />
            <RadioColumn>
                <Radio label="Samtalereferat" name="type" />
                <Radio label="Spørsmål" name="type" />
            </RadioColumn>
            <TextareaControlled label="Samtalereferat" defaultValue="" />
            <RadioRekke>
                <Radio label="Telefon" name="måte" />
                <Radio label="Oppmøte" name="måte" />
            </RadioRekke>
            <Select label="Velg temagruppe" defaultValue="">
                <option value="" disabled={true}>
                    Velg temagruppe
                </option>
                <option value="Arbeid">Arbeid</option>
                <option value="Familie">Familie</option>
                <option value="Hjelpemidler">Hjelpemidler</option>
                <option value="Pensjon">Pensjon</option>
            </Select>
            <FlexCenter>
                <KnappBase type="hoved">Del med Aremark</KnappBase>
            </FlexCenter>
            <FlexCenter>
                <KnappBase type="flat">Avbryt</KnappBase>
            </FlexCenter>
        </Style>
    );
}

export default FakeDialogPanel;
