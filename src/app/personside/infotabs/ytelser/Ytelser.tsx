import YtelseListe from './YtelserListe';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import styled from 'styled-components';
import ValgtYtelse from './ValgtYtelse';
import useBrukersYtelser from './useBrukersYtelser';
import { useInfotabsDyplenker } from '../dyplenker';
import FiltreringPeriode from '../utbetalinger/filter/FilterPeriode';
import Panel from 'nav-frontend-paneler';
import { pxToRem } from 'src/styles/personOversiktTheme';
import { useAtom } from 'jotai';
import { ytelsePeriodeAtom } from 'src/app/personside/infotabs/ytelser/YtelserState';

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
`;

function Ytelser() {
    const [period, setPeriod] = useAtom(ytelsePeriodeAtom);
    const ytelser = useBrukersYtelser(period.egendefinertPeriode);
    const dypLenker = useInfotabsDyplenker();
    const valgtYtelse = ytelser.ytelser.find((ytelse) => dypLenker.ytelser.erValgt(ytelse)) || ytelser.ytelser[0];

    return (
        <Styling>
            <Layout>
                <ScrollBar keepScrollId="ytelser-liste">
                    <FiltreringsPanel>
                        <InputPanel>
                            <FiltreringPeriode
                                periode={period}
                                updatePeriod={(change) => {
                                    setPeriod(change);
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
