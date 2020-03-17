import * as React from 'react';
import Utbetalinger from './Utbetalinger';
import { UtbetalingerResponse } from '../../../../models/utbetalinger';
import Filter from './filter/Filter';
import theme from '../../../../styles/personOversiktTheme';
import styled, { css } from 'styled-components/macro';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import Arenalenke from './Arenalenke/Arenalenke';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { erIE11, erModiabrukerdialog, erNyePersonoversikten } from '../../../../utils/erNyPersonoversikt';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';

const UtbetalingerStyle = styled.div`
    ${scrollBarContainerStyle(theme.media.utbetalinger.minWidth)};
    @media (min-width: ${theme.media.utbetalinger.minWidth}) {
        ${erNyePersonoversikten() &&
            erIE11() &&
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
    min-width: 19.5rem;
    flex-basis: 19.5rem;
`;

const UtbetalingerSection = styled.section`
    position: relative;
    min-width: 35rem; // Tabellene begynner å wrappe ved bredder mindre enn dette
`;

function UtbetalingerContainer() {
    return (
        <ErrorBoundary boundaryName={'UtbetalingerContainer'}>
            <UtbetalingerStyle>
                {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Utbetalinger" />}
                <ScrollBar keepScrollId="utbetalinger-filter">
                    <Arenalenke />
                    <FiltreringSection>
                        <Filter />
                    </FiltreringSection>
                </ScrollBar>
                <ScrollBar keepScrollId="utbetalinger-liste">
                    <UtbetalingerSection aria-label="Filtrerte utbetalinger">
                        <RestResourceConsumer<UtbetalingerResponse>
                            getResource={restResources => restResources.utbetalinger}
                            returnOnPending={BigCenteredLazySpinner}
                        >
                            {utbetalinger => <Utbetalinger utbetalingerData={utbetalinger} />}
                        </RestResourceConsumer>
                    </UtbetalingerSection>
                </ScrollBar>
            </UtbetalingerStyle>
        </ErrorBoundary>
    );
}

export default UtbetalingerContainer;
