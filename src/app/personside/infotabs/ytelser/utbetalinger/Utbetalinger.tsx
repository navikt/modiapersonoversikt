import * as React from 'react';
import { HistoriskUtbetaling, KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import DescriptionList from '../felles-styling/DescriptionList';
import { GråttPanel } from '../../../../../components/common-styled-components';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
    historiskeUtbetalinger: HistoriskUtbetaling[];
}

const Wrapper = styled.div`
  > * {
    margin-top: ${theme.margin.px20};
  }
`;

function Utbetalinger(props: Props) {

    const dummyEntries  = {
        Torolo: 'lalala',
        Fo: 'Bar',
        Sneile: 'Smaker rart'
    };

    return (
        <Wrapper>
            <GråttPanel>
                <Undertittel tag="h4">Kommende utbetalinger</Undertittel>
                <DescriptionList entries={dummyEntries}/>
            </GråttPanel>
            <GråttPanel>
                <Undertittel tag="h4">Histortiske utbetalinger</Undertittel>
                <DescriptionList entries={dummyEntries}/>
            </GråttPanel>
        </Wrapper>
    );
}

export default Utbetalinger;
