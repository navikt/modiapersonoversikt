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

enum FunksjonVindu {
    JOURNALFORING,
    OPPGAVE,
    MERK
}

function Funksjoner(props: Props) {
    const [aktivtVindu, settAktivtVindu] = React.useState<FunksjonVindu | null>(null);

    if (!props.valgtTraad) {
        return null;
    }

    const setResetVindu = (klikketVindu: FunksjonVindu) => () =>
        aktivtVindu === klikketVindu ? settAktivtVindu(null) : settAktivtVindu(klikketVindu);

    const visJournalforing = aktivtVindu === FunksjonVindu.JOURNALFORING;
    const visOppgave = aktivtVindu === FunksjonVindu.OPPGAVE;
    const visMerk = aktivtVindu === FunksjonVindu.MERK;

    return (
        <>
            <KnapperPanelStyle>
                <OppgaveknapperStyle>
                    <LenkeKnapp onClick={setResetVindu(FunksjonVindu.JOURNALFORING)} underline={visJournalforing}>
                        Journalfør
                    </LenkeKnapp>
                    <LenkeKnapp onClick={setResetVindu(FunksjonVindu.OPPGAVE)} underline={visOppgave}>
                        Lag oppgave
                    </LenkeKnapp>
                    <LenkeKnapp onClick={setResetVindu(FunksjonVindu.MERK)} underline={visMerk}>
                        Merk
                    </LenkeKnapp>
                </OppgaveknapperStyle>
                <LenkeKnapp>Skriv ut</LenkeKnapp>
            </KnapperPanelStyle>
            <UnmountClosed isOpened={visJournalforing}>
                <JournalforingPanel />
            </UnmountClosed>
            <UnmountClosed isOpened={visOppgave}>
                <OpprettOppgaveContainer lukkPanel={() => settAktivtVindu(null)} />
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
