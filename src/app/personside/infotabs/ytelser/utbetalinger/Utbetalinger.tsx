import * as React from 'react';
import { HistoriskUtbetaling, KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import DescriptionList from '../DescriptionList';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
    historiskeUtbetalinger: HistoriskUtbetaling[];
}

const Wrapper = styled.div`
  > * {
    margin-top: ${theme.margin.px20};
  }
`;

const Panel = styled.div`
  ${theme.gråttPanel};
`;

function Utbetalinger(props: Props) {

    const dummyEntries  = {
        Torolo: 'lalala',
        Fo: 'Bar',
        Sneile: 'Smaker rart'
    };

    return (
        <Wrapper>
            <Panel>
                <Undertittel tag="h4">Kommende utbetalinger</Undertittel>
                <DescriptionList entries={dummyEntries}/>
            </Panel>
            <Panel>
                <Undertittel tag="h4">Histortiske utbetalinger</Undertittel>
                <DescriptionList entries={dummyEntries}/>
            </Panel>
        </Wrapper>
    );
}

export default Utbetalinger;
