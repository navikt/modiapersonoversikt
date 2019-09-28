import * as React from 'react';
import styled from 'styled-components';
import Oversiktskomponent from './Oversiktskomponent';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import VarselOversikt from './VarselOversikt';
import OppfolgingOversikt from './OppfolgingOversikt';
import YtelserOversikt from './YtelserOversikt';
import UtbetalingerOversikt from './UtbetalingerOversikt';
import MeldingerOversikt from './MeldingerOversikt';
import { INFOTABS } from '../InfoTabEnum';
import SakerOversikt from './SakerOversikt';

const Style = styled.article`
    @media (${theme.media.wideScreen}) {
        display: flex;
        justify-content: center;
    }
    padding: ${theme.margin.layout};
`;

const KolonneStyle = styled.div`
    > * {
        margin-bottom: ${theme.margin.layout};
    }
    @media (${theme.media.wideScreen}) {
        &:not(:last-child) {
            margin-right: ${theme.margin.layout};
        }
    }
    flex-basis: 50%;
    max-width: ${pxToRem(800)};
`;

function Oversikt() {
    return (
        <Style>
            <KolonneStyle>
                <Oversiktskomponent
                    infotabPath={INFOTABS.UTBETALING}
                    tittel={'Utbetalinger'}
                    children={setHeaderContent => <UtbetalingerOversikt setHeaderContent={setHeaderContent} />}
                    hurtigtast={'U'}
                />
                <Oversiktskomponent
                    infotabPath={INFOTABS.OPPFOLGING}
                    tittel={'Oppfølging'}
                    children={setHeaderContent => <OppfolgingOversikt />}
                    hurtigtast={'O'}
                />
                <Oversiktskomponent
                    infotabPath={INFOTABS.VARSEL}
                    tittel={'Varsler'}
                    children={setHeaderContent => <VarselOversikt setHeaderContent={setHeaderContent} />}
                    hurtigtast={'V'}
                />
            </KolonneStyle>
            <KolonneStyle>
                <Oversiktskomponent
                    infotabPath={INFOTABS.MELDINGER}
                    tittel={'Meldinger'}
                    children={setHeaderContent => <MeldingerOversikt setHeaderContent={setHeaderContent} />}
                    hurtigtast={'M'}
                />
                <Oversiktskomponent
                    infotabPath={INFOTABS.YTELSER}
                    tittel={'Ytelser'}
                    children={setHeaderContent => <YtelserOversikt setHeaderContent={setHeaderContent} />}
                    hurtigtast={'Y'}
                />
                <Oversiktskomponent
                    tittel={'Saker'}
                    infotabPath={INFOTABS.SAKER}
                    children={setHeaderContent => <SakerOversikt setHeaderContent={setHeaderContent} />}
                    hurtigtast={'S'}
                />
            </KolonneStyle>
        </Style>
    );
}

export default Oversikt;
