import * as React from 'react';
import { KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import KommendeUtbetalinger from './kommendeUtbetalinger/KommendeUtbetalinger';
import { YtelserKeys } from '../ytelserKeys';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import UtførteUtbetalingerContainer from './utførteUtbetalinger/UtførteUtbetalingerContainer';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
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
                <UtførteUtbetalingerContainer ytelseType={props.ytelsesType} />
            </StyledSection>
        </ErrorBoundary>
    );
}

export default Utbetalinger;
