import * as React from 'react';
import { Traad } from '../../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { LenkeKnapp } from '../../../../../../components/common-styled-components';
import { UnmountClosed } from 'react-collapse';
import JournalforingPanel from './journalforing/JournalforingPanel';
import MerkPanel from './merk/MerkPanel';
import OppgavePanel from './oppgave/OppgavePanel';

interface Props {
    valgtTraad?: Traad;
}

const PanelStyle = styled.div`
    background-color: #e8e8e8;
    padding: ${theme.margin.layout};
    display: flex;
    flex-direction: column;
`;

const KnapperPanelStyle = styled.div`
    display: flex;
    > * {
        margin-right: ${theme.margin.layout};
    }
`;

function Funksjoner(props: Props) {
    const [visJournalforing, settVisJournalforing] = React.useState(false);
    const [visOppgave, settVisOppgave] = React.useState(false);
    const [visMerk, settVisMerk] = React.useState(false);

    if (!props.valgtTraad) {
        return null;
    }

    function journalforingKlikk() {
        settVisJournalforing(!visJournalforing);
        settVisOppgave(false);
        settVisMerk(false);
    }

    function oppgaveKlikk() {
        settVisOppgave(!visOppgave);
        settVisJournalforing(false);
        settVisMerk(false);
    }

    function merkKlikk() {
        settVisMerk(!visMerk);
        settVisJournalforing(false);
        settVisOppgave(false);
    }

    return (
        <>
            <KnapperPanelStyle>
                <LenkeKnapp onClick={() => journalforingKlikk()} underline={visJournalforing}>
                    Journalfør
                </LenkeKnapp>
                <LenkeKnapp onClick={() => oppgaveKlikk()} underline={visOppgave}>
                    Oppgave
                </LenkeKnapp>
                <LenkeKnapp onClick={() => merkKlikk()} underline={visMerk}>
                    Merk
                </LenkeKnapp>
                <LenkeKnapp>Skriv ut</LenkeKnapp>
            </KnapperPanelStyle>
            <UnmountClosed isOpened={visJournalforing}>
                <JournalforingPanel />
            </UnmountClosed>
            <UnmountClosed isOpened={visOppgave}>
                <OppgavePanel />
            </UnmountClosed>
            <UnmountClosed isOpened={visMerk}>
                <MerkPanel />
            </UnmountClosed>
        </>
    );
}

function Verktoylinje(props: Props) {
    return (
        <PanelStyle>
            <Funksjoner valgtTraad={props.valgtTraad} />
        </PanelStyle>
    );
}

export default Verktoylinje;
