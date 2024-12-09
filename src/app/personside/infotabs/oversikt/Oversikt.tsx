import styled from 'styled-components';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { INFOTABS } from '../InfoTabEnum';
import MeldingerOversikt from './MeldingerOversikt';
import OppfolgingOversikt from './OppfolgingOversikt';
import Oversiktskomponent from './Oversiktskomponent';
import SakerOversiktFactory from './SakerOversiktFactory';
import UtbetalingerOversikt from './UtbetalingerOversikt';
import VarselOversikt from './VarselOversikt';
import YtelserOversikt from './YtelserOversikt';

const oversiktMediaThreshold = pxToRem(750);

const Style = styled.div`
    @media (min-width: ${oversiktMediaThreshold}) {
        display: flex;
        justify-content: center;
    }
    padding: ${theme.margin.layout};
    .alertstripe {
        background-color: transparent;
        border: none;
    }
`;

const KolonneStyle = styled.div`
    > * {
        margin-bottom: ${theme.margin.layout};
    }
    @media (min-width: ${oversiktMediaThreshold}) {
        &:not(:last-child) {
            margin-right: ${theme.margin.layout};
        }
    }
    flex-basis: 50%;
    max-width: ${pxToRem(800)};
`;

function Oversikt() {
    return (
        <ErrorBoundary boundaryName="Oversikt">
            <Style>
                <KolonneStyle>
                    <Oversiktskomponent
                        infotabPath={INFOTABS.OPPFOLGING}
                        tittel={'Oppfølging'}
                        component={OppfolgingOversikt}
                        hurtigtast={'T'}
                    />
                    <Oversiktskomponent
                        infotabPath={INFOTABS.UTBETALING}
                        tittel={'Utbetalinger'}
                        component={UtbetalingerOversikt}
                        hurtigtast={'U'}
                    />
                    <Oversiktskomponent
                        tittel={'Saker'}
                        infotabPath={INFOTABS.SAKER}
                        component={SakerOversiktFactory}
                        hurtigtast={'S'}
                    />
                </KolonneStyle>
                <KolonneStyle>
                    <Oversiktskomponent
                        infotabPath={INFOTABS.MELDINGER}
                        tittel={'Kommunikasjon'}
                        component={MeldingerOversikt}
                        hurtigtast={'M'}
                    />
                    <Oversiktskomponent
                        infotabPath={INFOTABS.YTELSER}
                        tittel={'Ytelser'}
                        component={YtelserOversikt}
                        hurtigtast={'Y'}
                    />
                    <Oversiktskomponent
                        infotabPath={INFOTABS.VARSLER}
                        tittel={'Varsler'}
                        component={VarselOversikt}
                        hurtigtast={'V'}
                    />
                </KolonneStyle>
            </Style>
        </ErrorBoundary>
    );
}

export default Oversikt;
