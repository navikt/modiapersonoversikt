import * as React from 'react';
import { HistoriskUtbetaling, KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import KommendeUtbetalinger from './KommendeUtbetalinger';
import { YtelserKeys } from '../ytelserKeys';
import HistoriskeUtbetalingerContainer from './HistoriskeUtbetalingerContainer';
import ErrorBoundary from '../../../../../components/ErrorBoundary';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
    historiskeUtbetalinger: HistoriskUtbetaling[];
    ytelsesType: YtelserKeys;
}

const StyledSection = styled.section`
    > * {
        margin: ${theme.margin.px10} 0;
    }
    margin-right: 1rem;
`;

function Utbetalinger(props: Props) {
    return (
        <ErrorBoundary boundaryName="Utbetalinger Ytelser">
            <StyledSection aria-label={'Utbetalinger ' + props.ytelsesType}>
                <KommendeUtbetalinger kommendeUtbetalinger={props.kommendeUtbetalinger} />
                <HistoriskeUtbetalingerContainer
                    historiskeUtbetalinger={props.historiskeUtbetalinger}
                    ytelseType={props.ytelsesType}
                />
            </StyledSection>
        </ErrorBoundary>
    );
}

export default Utbetalinger;
