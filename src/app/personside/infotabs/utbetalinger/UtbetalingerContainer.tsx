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

const UtbetalingerArticle = styled.article`
    display: flex;
    align-items: flex-start;
    @media (max-width: ${theme.media.utbetalinger}) {
        display: block;
    }
    @media not all and (max-width: ${theme.media.utbetalinger}) {
        > * {
            overflow-y: auto;
            max-height: 100%;
        }
        max-height: 100%;
    }
    position: relative;
`;

const FiltreringSection = styled.section`
    min-width: 19rem;
    flex-basis: 19rem;
`;

const UtbetalingerSection = styled.section`
    position: relative;
    flex-grow: 1;
    min-width: 35rem; // Tabellene begynner å wrappe ved bredder mindre enn dette
    @media not all and (max-width: ${theme.media.utbetalinger}) {
        margin-left: ${theme.margin.layout};
    }
`;

function UtbetalingerContainer() {
    useOnMount(() => loggEvent('Sidevisning', 'Utbetalinger'));

    return (
        <ErrorBoundary boundaryName={'UtbetalingerContainer'}>
            <UtbetalingerArticle role="region" aria-label="Utbetalinger">
                {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Utbetalinger" />}
                <div>
                    <Arenalenke />
                    <FiltreringSection>
                        <Filter />
                    </FiltreringSection>
                </div>
                <UtbetalingerSection aria-label="Filtrerte utbetalinger">
                    <RestResourceConsumer<UtbetalingerResponse>
                        getResource={restResources => restResources.utbetalinger}
                        returnOnPending={BigCenteredLazySpinner}
                    >
                        {utbetalinger => <Utbetalinger utbetalingerData={utbetalinger} />}
                    </RestResourceConsumer>
                </UtbetalingerSection>
            </UtbetalingerArticle>
        </ErrorBoundary>
    );
}

export default UtbetalingerContainer;
