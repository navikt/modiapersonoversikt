import * as React from 'react';
import styled from 'styled-components';
import Oversiktskomponent from './Oversiktskomponent';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import VarselOversikt from './VarselOversikt';
import OppfolgingOversikt from './OppfolgingOversikt';
import YtelserOversikt from './YtelserOversikt';
import UtbetalingerOversikt from './UtbetalingerOversikt';
import MeldingerOversikt from './MeldingerOversikt';
import { INFOTABS } from '../InfoTabEnum';
import SakerOversikt from './SakerOversikt';

const Style = styled.article`
    display: flex;
`;

const KolonneStyle = styled.div`
    > * {
        margin: ${pxToRem(15)};
        max-width: 30rem;
    }
`;

function Oversikt() {
    return (
        <Style>
            <KolonneStyle>
                <Oversiktskomponent
                    infotabPath={INFOTABS.UTBETALING}
                    tittel={'Utbetalinger'}
                    children={<UtbetalingerOversikt />}
                />
                <Oversiktskomponent
                    infotabPath={INFOTABS.OPPFOLGING}
                    tittel={'Oppfølging'}
                    children={<OppfolgingOversikt />}
                />
                <Oversiktskomponent infotabPath={INFOTABS.VARSEL} tittel={'Varsler'} children={<VarselOversikt />} />
            </KolonneStyle>
            <KolonneStyle>
                <Oversiktskomponent
                    infotabPath={INFOTABS.MELDINGER}
                    tittel={'Meldinger'}
                    children={<MeldingerOversikt />}
                />
                <Oversiktskomponent infotabPath={INFOTABS.YTELSER} tittel={'Ytelser'} children={<YtelserOversikt />} />
            </KolonneStyle>
            <KolonneStyle>
                <Oversiktskomponent tittel={'Saker'} infotabPath={INFOTABS.SAKER} children={<SakerOversikt />} />
            </KolonneStyle>
        </Style>
    );
}

export default Oversikt;
