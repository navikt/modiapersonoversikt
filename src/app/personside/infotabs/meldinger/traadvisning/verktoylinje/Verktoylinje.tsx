import * as React from 'react';
import { Traad } from '../../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import JournalforingPanel from './journalforing/JournalforingPanel';
import MerkPanel from './merk/MerkPanel';
import OpprettOppgaveContainer from './oppgave/OpprettOppgaveContainer';
import { createRef, useCallback, useEffect } from 'react';
import EkspanderKnapp from '../../../../../../components/EkspanderKnapp';
import { LenkeKnapp } from '../../../../../../components/common-styled-components';
import { apiBaseUri } from '../../../../../../api/config';
import { useFødselsnummer, usePrevious } from '../../../../../../utils/customHooks';
import { Normaltekst } from 'nav-frontend-typografi';
import { meldingstittel, nyesteMelding } from '../../utils/meldingerUtils';

interface Props {
    valgtTraad: Traad;
}

const PanelStyle = styled.section`
    ${theme.hvittPanel};
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
const PrintKnapp = styled(LenkeKnapp.withComponent('a'))`
    text-decoration: none;
    color: #3e3832;
`;

enum VerktøyPanel {
    JOURNALFORING,
    OPPGAVE,
    MERK
}

function Verktoylinje(props: Props) {
    const titleRef = createRef<HTMLHeadingElement>();
    const fnr = useFødselsnummer();
    const [aktivtPanel, settAktivtPanel] = React.useState<VerktøyPanel | null>(null);
    const lukk = useCallback(() => {
        settAktivtPanel(null);
        titleRef.current && titleRef.current.focus();
    }, [settAktivtPanel, titleRef]);

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
        <PanelStyle>
            <h3 className="sr-only" ref={titleRef} tabIndex={-1}>
                Verktøylinje - {meldingstittel(nyesteMelding(props.valgtTraad))}
            </h3>
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
                        tittel="Lag oppgave"
                    />
                    <SvartLenkeKnapp onClick={togglePanel(VerktøyPanel.MERK)} open={visMerk} tittel="Merk" />
                </OppgaveknapperStyle>
                <PrintKnapp href={`${apiBaseUri}/dialog/${fnr}/${props.valgtTraad.traadId}/print`} download>
                    <Normaltekst>Skriv ut</Normaltekst>
                </PrintKnapp>
            </KnapperPanelStyle>
            <UnmountClosed isOpened={visJournalforing} hasNestedCollapse={true}>
                <JournalforingPanel traad={props.valgtTraad} lukkPanel={lukk} />
            </UnmountClosed>
            <UnmountClosed isOpened={visOppgave}>
                <OpprettOppgaveContainer valgtTraad={props.valgtTraad} lukkPanel={lukk} />
            </UnmountClosed>
            <UnmountClosed isOpened={visMerk}>
                <MerkPanel valgtTraad={props.valgtTraad} lukkPanel={lukk} />
            </UnmountClosed>
        </PanelStyle>
    );
}

export default Verktoylinje;
