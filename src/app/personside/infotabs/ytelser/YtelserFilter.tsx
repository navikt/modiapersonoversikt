import * as React from 'react';
import { useCallback } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { AppState } from '../../../../redux/reducers';
import { PeriodeValg } from '../../../../redux/utbetalinger/types';
import { oppdaterFilter } from '../../../../redux/utbetalinger/actions';
import FiltreringPeriode from '../utbetalinger/filter/FilterPeriode';
import Panel from 'nav-frontend-paneler';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import { YtelserState } from '../../../../redux/ytelser/ytelserReducer';
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

    const filter = useSelector((state: AppState) => state.ytelser);
    const updateFilter = useCallback(
        (change: Partial<YtelserState>) => {
            dispatch(oppdaterFilter(change));
        },
        [dispatch]
    );

    const reloadUtbetalinger = useCallback(() => {
        if (filter.periode.radioValg === PeriodeValg.EGENDEFINERT) {
            const periode = filter.periode.egendefinertPeriode;
            const fraDato = dayjs(periode.fra);
            const tilDato = dayjs(periode.til);
            if (!fraDato.isValid() || !tilDato.isValid()) {
                return;
            }
        }
        foreldrepenger.refetch();
        pleiepenger.refetch();
        sykepenger.refetch();
        tiltakspenger.refetch();
    }, [foreldrepenger, pleiepenger, sykepenger, tiltakspenger, filter]);

    const visSpinner =
        foreldrepenger.isLoading || pleiepenger.isLoading || sykepenger.isLoading || tiltakspenger.isLoading;

    return (
        <FiltreringsPanel>
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
