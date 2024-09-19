import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { AppState } from '../../../../redux/reducers';
import { PeriodeOptions, PeriodeValg } from '../../../../redux/utbetalinger/types';
import FiltreringPeriode from '../utbetalinger/filter/FilterPeriode';
import Panel from 'nav-frontend-paneler';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import { oppdaterYtelseFilter } from '../../../../redux/ytelser/ytelserReducer';
import { getFraDateFromPeriod } from '../utbetalinger/utils/utbetalinger-utils';
import foreldrepengerResource from '../../../../rest/resources/foreldrepengerResource';
import pleiepengerResource from '../../../../rest/resources/pleiepengerResource';
import sykepengerResource from '../../../../rest/resources/sykepengerResource';
import tiltakspengerResource from '../../../../rest/resources/tiltakspengerResource';

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

const FiltreringsPanel = styled(Panel)`
    padding: ${pxToRem(15)};
    margin-bottom: 0.5rem;
`;

function YtelserFiltrering() {
    const dispatch = useDispatch();
    const foreldrepenger = foreldrepengerResource.useFetch();
    const pleiepenger = pleiepengerResource.useFetch();
    const sykepenger = sykepengerResource.useFetch();
    const tiltakspenger = tiltakspengerResource.useFetch();

    const periode = useSelector((state: AppState) => state.ytelser.periode);
    const updateFilter = useCallback(
        (change: PeriodeOptions) => {
            dispatch(oppdaterYtelseFilter(change));
        },
        [dispatch]
    );

    useEffect(() => {
        return () => {
            dispatch(
                oppdaterYtelseFilter({
                    radioValg: PeriodeValg.EGENDEFINERT,
                    egendefinertPeriode: getFraDateFromPeriod(PeriodeValg.EGENDEFINERT)
                })
            );
        };
    }, []);

    const reloadUtbetalinger = useCallback(() => {
        if (periode.radioValg === PeriodeValg.EGENDEFINERT) {
            const egendefinertPeriode = periode.egendefinertPeriode;
            const fraDato = dayjs(egendefinertPeriode.fra);
            const tilDato = dayjs(egendefinertPeriode.til);
            if (!fraDato.isValid() || !tilDato.isValid()) {
                return;
            }
        }
        foreldrepenger.refetch();
        pleiepenger.refetch();
        sykepenger.refetch();
        tiltakspenger.refetch();
    }, [foreldrepenger, pleiepenger, sykepenger, tiltakspenger, periode]);

    const visSpinner =
        foreldrepenger.isLoading || pleiepenger.isLoading || sykepenger.isLoading || tiltakspenger.isLoading;

    return (
        <FiltreringsPanel>
            <InputPanel>
                <FiltreringPeriode
                    periode={periode}
                    updatePeriod={(change) => {
                        updateFilter(change);
                    }}
                />
                <KnappWrapper>
                    <Knapp onClick={reloadUtbetalinger} spinner={visSpinner} htmlType="button">
                        Hent ytelser
                    </Knapp>
                </KnappWrapper>
            </InputPanel>
        </FiltreringsPanel>
    );
}

export default YtelserFiltrering;
