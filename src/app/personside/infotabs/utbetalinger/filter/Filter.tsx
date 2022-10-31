import * as React from 'react';
import { useCallback } from 'react';
import { Radio } from 'nav-frontend-skjema';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { UtbetalingerResponse } from '../../../../../models/utbetalinger';
import UtbetaltTilValg from './UtbetaltTilValg';
import YtelseValg from './YtelseValg';
import { restoreScroll } from '../../../../../utils/restoreScroll';
import { Knapp } from 'nav-frontend-knapper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { AppState } from '../../../../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { oppdaterFilter } from '../../../../../redux/utbetalinger/actions';
import { PeriodeValg, UtbetalingFilterState } from '../../../../../redux/utbetalinger/types';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import EgendefinertDatoInputs from './EgendefinertDatoInputs';
import Panel from 'nav-frontend-paneler';
import dayjs from 'dayjs';
import { ISO_DATE_STRING_FORMAT } from 'nav-datovelger/lib/utils/dateFormatUtils';
import MediaQueryAwareRenderer from '../../../../../components/MediaQueryAwareRenderer';
import utbetalingerResource from '../../../../../rest/resources/utbetalingerResource';

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

const KnappWrapper = styled.div`
    margin-top: 0.5rem;
`;

const RadioWrapper = styled.div`
    margin-bottom: 0.5rem;
`;
const FieldSet = styled.fieldset`
    border: none;
    margin: 0;
    padding: 0;
    > *:first-child {
        margin-bottom: 0.8rem;
    }
    > *:last-child {
        margin-bottom: 0;
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

function Filtrering() {
    const dispatch = useDispatch();
    const utbetalinger = utbetalingerResource.useFetch();

    const filter = useSelector((state: AppState) => state.utbetalinger.filter);
    const updateFilter = useCallback(
        (change: Partial<UtbetalingFilterState>) => {
            dispatch(oppdaterFilter(change));
        },
        [dispatch]
    );

    const reloadUtbetalinger = useCallback(() => {
        if (filter.periode.radioValg === PeriodeValg.EGENDEFINERT) {
            const periode = filter.periode.egendefinertPeriode;
            const fraDato = dayjs(periode.fra, ISO_DATE_STRING_FORMAT);
            const tilDato = dayjs(periode.til, ISO_DATE_STRING_FORMAT);
            if (!fraDato.isValid() || !tilDato.isValid()) {
                return;
            }
        }
        utbetalinger.refetch();
    }, [utbetalinger, filter.periode]);

    const radios = Object.keys(PeriodeValg).map((key) => {
        const label = PeriodeValg[key];
        const checked = filter.periode.radioValg === label;
        return (
            <RadioWrapper key={label}>
                <Radio
                    label={label}
                    checked={checked}
                    onChange={() =>
                        updateFilter({
                            periode: {
                                ...filter.periode,
                                radioValg: PeriodeValg[key]
                            }
                        })
                    }
                    name="FiltreringsvalgGruppe"
                />
            </RadioWrapper>
        );
    });

    const visSpinner = utbetalinger.isLoading;
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
            <FieldSet>
                <Element tag="legend">Velg periode</Element>
                {radios}
            </FieldSet>
            {filter.periode.radioValg === PeriodeValg.EGENDEFINERT && (
                <EgendefinertDatoInputs filter={filter} updateFilter={updateFilter} />
            )}
            <KnappWrapper>
                <Knapp onClick={reloadUtbetalinger} spinner={visSpinner} htmlType="button">
                    Hent utbetalinger
                </Knapp>
            </KnappWrapper>
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

export default Filtrering;
