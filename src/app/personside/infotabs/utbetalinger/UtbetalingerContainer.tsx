import * as React from 'react';
import Utbetalinger from './Utbetalinger';
import UtbetalingFiltrering from './filter/UtbetalingFilter';
import theme from '../../../../styles/personOversiktTheme';
import styled, { css } from 'styled-components';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import Arenalenke from './Arenalenke/Arenalenke';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import { erIE11 } from '../../../../utils/erIE11';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import utbetalinger from '../../../../rest/resources/utbetalingerResource';

const UtbetalingerStyle = styled.div`
    ${scrollBarContainerStyle(theme.media.utbetalinger.minWidth)};
    @media (min-width: ${theme.media.utbetalinger.minWidth}) {
        ${erIE11() &&
        css`
            height: 0; /* IE11 */
            flex-grow: 1; /* IE11 */
        `};
        display: flex;
        align-items: flex-start;
        > *:last-child {
            flex-grow: 1;
        }
    }
    position: relative;
`;

const FiltreringSection = styled.section`
    height: fit-content;
    width: 100%;
    @media (min-width: ${theme.media.utbetalinger.minWidth}) {
        width: 22.5rem;
    }
`;

const UtbetalingerSection = styled.section`
    position: relative;
    min-width: 35rem; // Tabellene begynner å wrappe ved bredder mindre enn dette
`;

function UtbetalingerContainer() {
    const utbetalingerResource = utbetalinger.useFetch();
    let content = BigCenteredLazySpinner;
    if (utbetalingerResource.data) {
        content = <Utbetalinger utbetalingerData={utbetalingerResource.data} />;
    }
    return (
        <ErrorBoundary boundaryName={'UtbetalingerContainer'}>
            <UtbetalingerStyle>
                <ScrollBar keepScrollId="utbetalinger-filter">
                    <Arenalenke />
                    <FiltreringSection>
                        <UtbetalingFiltrering />
                    </FiltreringSection>
                </ScrollBar>
                <ScrollBar keepScrollId="utbetalinger-liste">
                    <UtbetalingerSection aria-label="Filtrerte utbetalinger">{content}</UtbetalingerSection>
                </ScrollBar>
            </UtbetalingerStyle>
        </ErrorBoundary>
    );
}

export default UtbetalingerContainer;
