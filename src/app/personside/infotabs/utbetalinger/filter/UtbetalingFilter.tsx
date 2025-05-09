import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Panel from 'nav-frontend-paneler';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import type { UtbetalingerResponse } from 'src/models/utbetalinger';
import { oppdaterFilter } from 'src/redux/utbetalinger/actions';
import type { UtbetalingFilterState } from 'src/redux/utbetalinger/types';
import { useUtbetalingerFilter } from 'src/redux/utbetalinger/utbetalingerReducer';
import { restoreScroll } from 'src/utils/restoreScroll';
import styled from 'styled-components';
import MediaQueryAwareRenderer from '../../../../../components/MediaQueryAwareRenderer';
import utbetalingerResource from '../../../../../rest/resources/utbetalingerResource';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import FiltreringPeriode from './FilterPeriode';
import UtbetaltTilValg from './UtbetaltTilValg';
import YtelseValg from './YtelseValg';

const FiltreringsPanel = styled(Panel)`
  padding: ${pxToRem(15)};
`;

const InputPanel = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  > *:first-child {
    margin-bottom: 0.5rem;
  }
  > * {
    margin-top: 0.5rem;
  }
  .skjemaelement--horisontal {
    margin-bottom: 0.4rem;
  }
`;

const WrapOnSmallScreen = styled.div`
  @media (max-width: ${theme.media.utbetalinger.maxWidth}) {
    display: flex;
    flex-wrap: wrap;
    > * {
      flex-grow: 1;
      flex-basis: 30%;
    }
    > *:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

function visCheckbokser(utbetalingerResponse: UtbetalingerResponse): boolean {
    return utbetalingerResponse.utbetalinger && utbetalingerResponse.utbetalinger.length > 0;
}

function UtbetalingFiltrering() {
    const dispatch = useDispatch();
    const filter = useUtbetalingerFilter();
    const periode = filter.periode.egendefinertPeriode;
    const utbetalinger = utbetalingerResource.useFetch(periode.fra, periode.til);

    const updateFilter = useCallback(
        (change: Partial<UtbetalingFilterState>) => {
            dispatch(oppdaterFilter(change));
        },
        [dispatch]
    );

    const checkBokser = utbetalinger.data && visCheckbokser(utbetalinger.data) && (
        <>
            <InputPanel>
                <Element>Utbetaling til</Element>
                <UtbetaltTilValg
                    utbetalinger={utbetalinger.data.utbetalinger}
                    onChange={updateFilter}
                    filterState={filter}
                />
            </InputPanel>
            <InputPanel>
                <Element>Velg ytelse</Element>
                <YtelseValg
                    onChange={updateFilter}
                    filterState={filter}
                    utbetalinger={utbetalinger.data.utbetalinger}
                />
            </InputPanel>
        </>
    );
    const hentUtbetalingerPanel = (
        <InputPanel>
            <FiltreringPeriode
                periode={filter.periode}
                updatePeriod={(change) => {
                    updateFilter({
                        ...filter,
                        periode: change
                    });
                }}
            />
        </InputPanel>
    );

    return (
        <nav>
            <MediaQueryAwareRenderer
                alternatives={{
                    [`(min-width: ${theme.media.utbetalinger.minWidth})`]: () => (
                        <FiltreringsPanel onClick={restoreScroll} aria-label="Filtrering utbetalinger">
                            <Undertittel>Filtrering</Undertittel>

                            <WrapOnSmallScreen>
                                {hentUtbetalingerPanel}
                                {checkBokser}
                            </WrapOnSmallScreen>
                        </FiltreringsPanel>
                    ),
                    screen: () => (
                        <Ekspanderbartpanel
                            tittel="Filtrering"
                            onClick={restoreScroll}
                            aria-label="Filtrering utbetalinger"
                            apen
                            border={false}
                        >
                            <WrapOnSmallScreen>
                                {hentUtbetalingerPanel}
                                {checkBokser}
                            </WrapOnSmallScreen>
                        </Ekspanderbartpanel>
                    )
                }}
            />
        </nav>
    );
}

export default UtbetalingFiltrering;
