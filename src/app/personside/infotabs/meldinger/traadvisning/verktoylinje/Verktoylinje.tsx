import * as React from 'react';
import { Traad } from '../../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import JournalforingPanel from './journalforing/JournalforingPanel';
import MerkPanel from './merk/MerkPanel';
import OpprettOppgaveContainer from './oppgave/OpprettOppgaveContainer';

interface Props {
    valgtTraad?: Traad;
}

const PanelStyle = styled.div`
    background-color: white;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
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

const SvartLenkeKnapp = styled.button<{ aktiv?: boolean }>`
    color: #3e3832;
    position: relative;
    border: none;
    padding: 0;
    border-radius: ${theme.borderRadius.knapp};
    cursor: pointer;
    background-color: transparent;
    &:before {
        content: '';
        border-bottom: 1px solid transparent;
        width: 100%;
        left: 0;
        bottom: 0;
        position: absolute;
    }
    &:focus {
        ${theme.focus}
    }
    &:hover {
        &:before {
            border-color: #3e3832;
        }
    }
    ${props => {
        if (props.aktiv === undefined) {
            return '';
        }
        const direction = props.aktiv ? 'bottom' : 'top';
        return `
            padding-right: 1.25rem;
            &:after {
              content: '';
              position: absolute;
              height: 0.75rem;
              width: 0.75rem;
              display: block;
              border: 0.5rem solid transparent;
              border-${direction}-color: #3E3832;
              right: 0;
              ${direction}: 25%;
            }
        `;
    }}
`;

enum FunksjonVindu {
    JOURNALFORING,
    OPPGAVE,
    MERK
}

function Funksjoner(props: Props) {
    const [aktivtVindu, settAktivtVindu] = React.useState<FunksjonVindu | null>(FunksjonVindu.JOURNALFORING);

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
                    <SvartLenkeKnapp onClick={setResetVindu(FunksjonVindu.JOURNALFORING)} aktiv={visJournalforing}>
                        Journalfør
                    </SvartLenkeKnapp>
                    <SvartLenkeKnapp onClick={setResetVindu(FunksjonVindu.OPPGAVE)} aktiv={visOppgave}>
                        Lag oppgave
                    </SvartLenkeKnapp>
                    <SvartLenkeKnapp onClick={setResetVindu(FunksjonVindu.MERK)} aktiv={visMerk}>
                        Merk
                    </SvartLenkeKnapp>
                </OppgaveknapperStyle>
                <SvartLenkeKnapp>Skriv ut</SvartLenkeKnapp>
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
