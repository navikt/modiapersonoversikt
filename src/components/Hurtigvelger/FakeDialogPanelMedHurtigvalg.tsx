import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components/macro';
import HurtigvelgerExpandable from './HurtigvelgerExpandable';
import { Radio, Select, TextareaControlled } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { Tekst, tekster } from './tekster';
import Preview from './Preview';
import theme from '../../styles/personOversiktTheme';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { FlexCenter } from '../common-styled-components';
import HentOppgaveKnappStandalone from '../standalone/HentOppgaveKnapp';
import KnappBase from 'nav-frontend-knapper';
import { TabsPure } from 'nav-frontend-tabs';
import { mapEnumToTabProps } from '../../utils/mapEnumToTabProps';
import HurtigvalgListe from './HurtigvalgListe';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 30rem;
    grid-auto-rows: 100%;
    height: 100%;
`;

const Style = styled.div`
    max-height: 100%;
    min-height: 100%;
    overflow-y: auto;
    padding: 1.5rem;
    background-color: #efeff6;
    box-shadow: 0 1rem 2rem grey;
    > * {
        margin-bottom: 1rem;
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
    .tab {
        margin: 0 -1.5rem;
    }
`;

const TilbakeMeldingStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${theme.animation.fadeIn};
    > * {
        margin: 1rem 0;
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

const TabStyle = styled.div`
    margin: -1.5rem -1.5rem 0;
`;

const RadioCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Shadow = styled.div`
    box-shadow: 0 0.5rem 1rem grey;
`;

const Luft = styled.div`
    margin-bottom: 3rem;
`;

enum State {
    IkkeSendt,
    Sender,
    Sent
}

enum Tabs {
    Dialogpanel,
    Hurtigsvar
}

enum Mode {
    Inline,
    Tabs
}

function FakeDialogPanelMedHurtigvalg() {
    const [mode, setMode] = useState(Mode.Inline);
    const [state, setState] = useState(State.IkkeSendt);
    const [tekst, setTekst] = useState(tekster[0]);
    const [tab, setTab] = useState(Tabs.Dialogpanel);

    const handleSend = (valgtTekst: Tekst) => {
        setState(State.Sender);
        setTekst(valgtTekst);
    };

    const dialogPanel = (
        <>
            <HentOppgaveKnappStandalone />
            <Luft />
            {mode === Mode.Inline && <HurtigvelgerExpandable send={handleSend} />}
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
        </>
    );

    const tabProps = mapEnumToTabProps(Tabs, tab);
    const tabs = (
        <TabStyle>
            <TabsPure tabs={tabProps} onChange={(event, index) => setTab(index)} />
        </TabStyle>
    );

    function getInnhold() {
        if (state === State.Sent) {
            return (
                <TilbakeMeldingStyle>
                    <Undertittel>Svaret ditt er registrert</Undertittel>
                    <Shadow>
                        <Preview tekst={tekst} />
                    </Shadow>
                    <KnappBase type="flat" onClick={() => setState(State.IkkeSendt)}>
                        Tilbake
                    </KnappBase>
                </TilbakeMeldingStyle>
            );
        } else if (state === State.Sender) {
            setTimeout(() => setState(State.Sent), 1500);
            return (
                <FlexCenter>
                    <NavFrontendSpinner type="XXL" />
                </FlexCenter>
            );
        } else {
            return (
                <>
                    {mode === Mode.Tabs && tabs}
                    {tab === Tabs.Dialogpanel ? (
                        dialogPanel
                    ) : (
                        <>
                            <Luft />
                            <HurtigvalgListe send={handleSend} />
                        </>
                    )}
                </>
            );
        }
    }

    return (
        <Grid>
            <RadioCenter>
                <Radio
                    defaultChecked={true}
                    label="Inline"
                    name="mode"
                    onClick={() => {
                        setMode(Mode.Inline);
                        setTab(Tabs.Dialogpanel);
                    }}
                />
                <Radio label="Tabs" name="mode" onClick={() => setMode(Mode.Tabs)} />
            </RadioCenter>
            <Style>{getInnhold()}</Style>
        </Grid>
    );
}

export default FakeDialogPanelMedHurtigvalg;
