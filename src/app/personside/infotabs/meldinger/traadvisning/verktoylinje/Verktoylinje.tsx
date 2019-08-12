import * as React from 'react';
import { Traad } from '../../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import JournalforingPanel from './journalforing/JournalforingPanel';
import MerkPanel from './merk/MerkPanel';
import OpprettOppgaveContainer from './oppgave/OpprettOppgaveContainer';
import { useEffect } from 'react';
import EkspanderKnapp from '../../../../../../components/EkspanderKnapp';

interface Props {
    valgtTraad?: Traad;
}

const PanelStyle = styled.div`
    ${theme.hvittPanel}
    padding: ${theme.margin.layout};
    display: flex;
    flex-direction: column;
    margin-bottom: 0.24rem;
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

const SvartLenkeKnapp = styled(EkspanderKnapp)`
    color: #3e3832;
`;

enum FunksjonVindu {
    JOURNALFORING,
    OPPGAVE,
    MERK
}

function Funksjoner(props: Props) {
    const [aktivtVindu, settAktivtVindu] = React.useState<FunksjonVindu | null>(null);
    useEffect(() => {
        settAktivtVindu(null);
    }, [props.valgtTraad, settAktivtVindu]);

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
                    <SvartLenkeKnapp
                        onClick={setResetVindu(FunksjonVindu.JOURNALFORING)}
                        open={visJournalforing}
                        tittel="Journalfør"
                    />
                    <SvartLenkeKnapp
                        onClick={setResetVindu(FunksjonVindu.OPPGAVE)}
                        open={visOppgave}
                        tittel="Lag oppgave"
                    />
                    <SvartLenkeKnapp onClick={setResetVindu(FunksjonVindu.MERK)} open={visMerk} tittel="Merk" />
                </OppgaveknapperStyle>
                <SvartLenkeKnapp onClick={() => {}} tittel="Skriv ut" />
            </KnapperPanelStyle>
            <UnmountClosed isOpened={visJournalforing}>
                <JournalforingPanel traad={props.valgtTraad} lukkPanel={() => settAktivtVindu(null)} />
            </UnmountClosed>
            <UnmountClosed isOpened={visOppgave}>
                <OpprettOppgaveContainer lukkPanel={() => settAktivtVindu(null)} />
            </UnmountClosed>
            <UnmountClosed isOpened={visMerk}>
                <MerkPanel lukkPanel={() => settAktivtVindu(null)} />
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
