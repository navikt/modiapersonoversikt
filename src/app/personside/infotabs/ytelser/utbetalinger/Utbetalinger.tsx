import * as React from 'react';
import { KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import KommendeUtbetalinger from './KommendeUtbetalinger';
import { YtelserKeys } from '../ytelserKeys';
import HistoriskeUtbetalingerContainer from './historiskeUtbetalinger/HistoriskeUtbetalingerContainer';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { useContext } from 'react';
import { PersonContext } from '../../../../App';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

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
    const fødselsnummer = useContext(PersonContext);

    if (!fødselsnummer) {
        return <AlertStripeInfo>Ingen person i context</AlertStripeInfo>;
    }

    return (
        <ErrorBoundary boundaryName="Utbetalinger Ytelser">
            <StyledSection aria-label={'Utbetalinger ' + props.ytelsesType}>
                <KommendeUtbetalinger kommendeUtbetalinger={props.kommendeUtbetalinger} />
                <HistoriskeUtbetalingerContainer ytelseType={props.ytelsesType} fødselsnummer={fødselsnummer} />
            </StyledSection>
        </ErrorBoundary>
    );
}

export default Utbetalinger;
