import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { settValgtPeriode } from '../../../../redux/oppfolging/actions';
import { useDispatch } from 'react-redux';
import { useCallback, useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { useAppState } from '../../../../utils/customHooks';
import FiltreringPeriode from '../utbetalinger/filter/FilterPeriode';
import { PeriodeOptions } from '../../../../redux/utbetalinger/types';

const StyledPanel = styled(Panel)`
    padding: ${pxToRem(15)};
`;

const TittelWrapper = styled.div`
    &:focus {
        outline: none;
    }
    margin-bottom: ${theme.margin.layout};
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

function OppfolgingFilter() {
    const headerId = useRef(guid());
    const dispatch = useDispatch();
    const periode = useAppState((appState) => appState.oppfolging.periode);
    const updateFilter = useCallback(
        (change: PeriodeOptions) => {
            dispatch(settValgtPeriode(change));
        },
        [dispatch]
    );

    return (
        <StyledPanel aria-labelledby={headerId.current}>
            <article>
                <TittelWrapper>
                    <Undertittel id={headerId.current}>Oppfølging og ytelser vises for perioden:</Undertittel>
                </TittelWrapper>
                <InputPanel>
                    <FiltreringPeriode
                        periode={periode}
                        updatePeriod={(change) => {
                            updateFilter(change);
                        }}
                    />
                </InputPanel>
            </article>
        </StyledPanel>
    );
}

export default OppfolgingFilter;
