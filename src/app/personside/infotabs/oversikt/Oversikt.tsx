import * as React from 'react';
import styled from 'styled-components';
import Oversiktskomponent from './Oversiktskomponent';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import VarselOversikt from './VarselOversikt';
import OppfolgingOversikt from './OppfolgingOversikt';
import YtelserOversikt from './YtelserOversikt';
import UtbetalingerOversikt from './UtbetalingerOversikt';
import MeldingerOversikt from './MeldingerOversikt';

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
                    uriKomponent={'utbetaling'}
                    tittel={'Utbetalinger'}
                    children={<UtbetalingerOversikt />}
                />
                <Oversiktskomponent
                    uriKomponent={'oppfølging'}
                    tittel={'Oppfølging'}
                    children={<OppfolgingOversikt />}
                />
                <Oversiktskomponent uriKomponent={'varsler'} tittel={'Varsler'} children={<VarselOversikt />} />
            </KolonneStyle>
            <KolonneStyle>
                <Oversiktskomponent uriKomponent={'meldinger'} tittel={'Meldinger'} children={<MeldingerOversikt />} />
                <Oversiktskomponent uriKomponent={'ytelser'} tittel={'Ytelser'} children={<YtelserOversikt />} />
            </KolonneStyle>
        </Style>
    );
}

export default Oversikt;
