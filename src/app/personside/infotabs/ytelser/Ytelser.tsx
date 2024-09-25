import * as React from 'react';
import YtelseListe from './YtelserListe';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import styled from 'styled-components';
import ValgtYtelse from './ValgtYtelse';
import useBrukersYtelser from './useBrukersYtelser';
import { useInfotabsDyplenker } from '../dyplenker';
import { useKeepQueryParams } from '../../../../utils/hooks/useKeepQueryParams';
import { useAppState } from '../../../../utils/customHooks';
import { PeriodeOptions } from '../../../../redux/utbetalinger/types';
import { useCallback } from 'react';
import { oppdaterYtelseFilter } from '../../../../redux/ytelser/ytelserReducer';
import { useDispatch } from 'react-redux';
import FiltreringPeriode from '../utbetalinger/filter/FilterPeriode';
import Panel from 'nav-frontend-paneler';
import { pxToRem } from '../../../../styles/personOversiktTheme';

const ytelserMediaTreshold = '45rem';

const Layout = styled.div`
    ${scrollBarContainerStyle(ytelserMediaTreshold)};
    @media (min-width: ${ytelserMediaTreshold}) {
        height: 0; /* IE11 */
        flex-grow: 1; /* IE11 */
        display: flex;
        > *:first-child {
            min-width: 24rem;
            max-width: 24rem;
            flex-basis: 24rem;
            flex-grow: 0.5;
        }
        > *:last-child {
            flex-grow: 1;
        }
        align-items: flex-start;
    }
`;

const Styling = styled.section`
    flex-grow: 1; /* IE11 */
    flex-direction: column;
    display: flex;
`;

const FiltreringsPanel = styled(Panel)`
    padding: ${pxToRem(15)};
    margin-bottom: 0.5rem;
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

function Ytelser() {
    useKeepQueryParams();
    const dispatch = useDispatch();
    const periode = useAppState((appState) => appState.ytelser.periode);
    const fraTilDato = periode.egendefinertPeriode;
    const ytelser = useBrukersYtelser(fraTilDato);
    const dypLenker = useInfotabsDyplenker();
    const valgtYtelse = ytelser.ytelser.find((ytelse) => dypLenker.ytelser.erValgt(ytelse)) || ytelser.ytelser[0];

    const updateFilter = useCallback(
        (change: PeriodeOptions) => {
            dispatch(oppdaterYtelseFilter(change));
        },
        [dispatch]
    );

    return (
        <Styling>
            <Layout>
                <ScrollBar keepScrollId="ytelser-liste">
                    <FiltreringsPanel>
                        <InputPanel>
                            <FiltreringPeriode
                                periode={periode}
                                updatePeriod={(change) => {
                                    updateFilter(change);
                                }}
                            />
                        </InputPanel>
                    </FiltreringsPanel>
                    <YtelseListe
                        placeHolders={ytelser.placeholders}
                        pending={ytelser.pending}
                        ytelser={ytelser.ytelser}
                        valgtYtelse={valgtYtelse}
                    />
                </ScrollBar>
                <ScrollBar keepScrollId="ytelser-valgt">
                    <ValgtYtelse valgtYtelse={valgtYtelse} />
                </ScrollBar>
            </Layout>
        </Styling>
    );
}

export default Ytelser;
