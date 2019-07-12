import * as React from 'react';
import { Traad } from '../../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { LenkeKnapp } from '../../../../../../components/common-styled-components';
import { UnmountClosed } from 'react-collapse';
import JournalforingPanel from './journalforing/JournalforingPanel';
import MerkPanel from './merk/MerkPanel';
import OpprettOppgaveContainer from './oppgave/OpprettOppgaveContainer';

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
    justify-content: space-between;
`;

const OppgaveknapperStyle = styled.div`
    display: flex;
    > *:not(:last-child) {
        margin-right: 1.5rem;
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
                <OppgaveknapperStyle>
                    <LenkeKnapp onClick={journalforingKlikk} underline={visJournalforing}>
                        Journalfør
                    </LenkeKnapp>
                    <LenkeKnapp onClick={oppgaveKlikk} underline={visOppgave}>
                        Lag oppgave
                    </LenkeKnapp>
                    <LenkeKnapp onClick={merkKlikk} underline={visMerk}>
                        Merk
                    </LenkeKnapp>
                </OppgaveknapperStyle>
                <LenkeKnapp>Skriv ut</LenkeKnapp>
            </KnapperPanelStyle>
            <UnmountClosed isOpened={visJournalforing}>
                <JournalforingPanel />
            </UnmountClosed>
            <UnmountClosed isOpened={visOppgave}>
                <OpprettOppgaveContainer lukkPanel={() => settVisOppgave(false)} />
            </UnmountClosed>
            <UnmountClosed isOpened={visMerk}>
                <MerkPanel lukkPanel={() => settVisMerk(false)} />
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
