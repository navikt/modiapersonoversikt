import * as React from 'react';
import Utbetalinger from './Utbetalinger';
import { UtbetalingerResponse } from '../../../../models/utbetalinger';
import Filter from './filter/Filter';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { loggEvent } from '../../../../utils/frontendLogger';
import Arenalenke from './Arenalenke/Arenalenke';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { useOnMount } from '../../../../utils/customHooks';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';

const UtbetalingerArticle = styled.article`
    ${scrollBarContainerStyle(theme.media.utbetalinger)};
    @media (min-width: ${theme.media.utbetalinger}) {
        display: flex;
        align-items: flex-start;
        > *:last-child {
            flex-grow: 1;
        }
    }
    position: relative;
`;

const FiltreringSection = styled.section`
    min-width: 18rem;
    flex-basis: 18rem;
`;

const UtbetalingerSection = styled.section`
    position: relative;
    min-width: 35rem; // Tabellene begynner å wrappe ved bredder mindre enn dette
`;

function UtbetalingerContainer() {
    useOnMount(() => loggEvent('Sidevisning', 'Utbetalinger'));

    return (
        <ErrorBoundary boundaryName={'UtbetalingerContainer'}>
            <UtbetalingerArticle role="region" aria-label="Utbetalinger">
                {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Utbetalinger" />}
                <ScrollBar>
                    <Arenalenke />
                    <FiltreringSection>
                        <Filter />
                    </FiltreringSection>
                </ScrollBar>
                <ScrollBar>
                    <UtbetalingerSection aria-label="Filtrerte utbetalinger">
                        <RestResourceConsumer<UtbetalingerResponse>
                            getResource={restResources => restResources.utbetalinger}
                            returnOnPending={BigCenteredLazySpinner}
                        >
                            {utbetalinger => <Utbetalinger utbetalingerData={utbetalinger} />}
                        </RestResourceConsumer>
                    </UtbetalingerSection>
                </ScrollBar>
            </UtbetalingerArticle>
        </ErrorBoundary>
    );
}

export default UtbetalingerContainer;
