import * as React from 'react';
import { Traad } from '../../../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import theme from '../../../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import JournalforingPanel from './journalforing/JournalforingPanel';
import MerkPanel from './merk/MerkPanel';
import OpprettOppgaveContainer from './oppgave/OpprettOppgaveContainer';
import { createRef, useCallback, useEffect, useRef } from 'react';
import EkspanderKnapp from '../../../../../../components/EkspanderKnapp';
import { usePrevious } from '../../../../../../utils/customHooks';
import usePrinter from '../../../../../../utils/print/usePrinter';
import PrintKnapp from '../../../../../../components/PrintKnapp';
import MeldingerPrintMarkup from '../../../../../../utils/print/MeldingerPrintMarkup';
import { guid } from 'nav-frontend-js-utils';
import ErrorBoundary from '../../../../../../components/ErrorBoundary';
import Panel from 'nav-frontend-paneler';

interface Props {
    valgtTraad: Traad;
    visPrinter?: boolean;
    className?: string;
}

const StyledPanel = styled(Panel)`
    padding: ${theme.margin.layout};
    display: flex;
    flex-direction: column;
    margin-bottom: 0.24rem;
    &:focus {
        ${theme.focus};
    }
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
    white-space: nowrap;
`;

enum VerktøyPanel {
    JOURNALFORING,
    OPPGAVE,
    MERK
}

function Print(props: Props) {
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;
    if (!props.visPrinter) {
        return null;
    }

    return (
        <>
            <PrintKnapp onClick={() => printer?.triggerPrint()} />
            <PrinterWrapper>
                <MeldingerPrintMarkup valgtTraad={props.valgtTraad} />
            </PrinterWrapper>
        </>
    );
}

function Verktoylinje(props: Props) {
    const ref = createRef<HTMLElement>();
    const [aktivtPanel, settAktivtPanel] = React.useState<VerktøyPanel | null>(null);
    const lukk = useCallback(() => {
        settAktivtPanel(null);
        ref.current && ref.current.focus();
    }, [settAktivtPanel, ref]);
    const tittelId = useRef(guid());

    const prevTraad = usePrevious(props.valgtTraad);

    useEffect(() => {
        if (prevTraad && prevTraad.traadId !== props.valgtTraad.traadId) {
            lukk();
        }
    }, [props.valgtTraad, lukk, prevTraad]);

    const togglePanel = (panel: VerktøyPanel) => () =>
        aktivtPanel === panel ? settAktivtPanel(null) : settAktivtPanel(panel);

    const visJournalforing = aktivtPanel === VerktøyPanel.JOURNALFORING;
    const visOppgave = aktivtPanel === VerktøyPanel.OPPGAVE;
    const visMerk = aktivtPanel === VerktøyPanel.MERK;

    return (
        <ErrorBoundary boundaryName="Verktøylinje">
            <article aria-labelledby={tittelId.current} aria-label="Verktøylinje">
                <StyledPanel className={props.className} ref={() => ref} tabIndex={-1}>
                    <KnapperPanelStyle>
                        <OppgaveknapperStyle>
                            <SvartLenkeKnapp
                                onClick={togglePanel(VerktøyPanel.JOURNALFORING)}
                                open={visJournalforing}
                                tittel="Journalfør"
                            />
                            <SvartLenkeKnapp
                                onClick={togglePanel(VerktøyPanel.OPPGAVE)}
                                open={visOppgave}
                                tittel="Oppgave"
                            />
                            <SvartLenkeKnapp onClick={togglePanel(VerktøyPanel.MERK)} open={visMerk} tittel="Merk" />
                        </OppgaveknapperStyle>
                        <Print {...props} />
                    </KnapperPanelStyle>
                    <UnmountClosed isOpened={visJournalforing}>
                        <JournalforingPanel traad={props.valgtTraad} lukkPanel={lukk} />
                    </UnmountClosed>
                    <UnmountClosed isOpened={visOppgave}>
                        <OpprettOppgaveContainer valgtTraad={props.valgtTraad} lukkPanel={lukk} />
                    </UnmountClosed>
                    <UnmountClosed isOpened={visMerk}>
                        <MerkPanel valgtTraad={props.valgtTraad} lukkPanel={lukk} />
                    </UnmountClosed>
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

export default Verktoylinje;
