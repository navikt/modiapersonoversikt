import * as React from 'react';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import styled from 'styled-components';
import Oversiktskomponent from './Oversiktskomponent';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import VarselOversikt from './VarselOversikt';

const Style = styled.article`
    display: flex;
    flex-wrap: wrap;
    > * {
        margin: ${pxToRem(15)};
        width: 25rem;
        overflow-wrap: break-word;
    }
`;

function Oversikt() {
    return (
        <Style>
            <Oversiktskomponent tittel={'Utbetalinger'} children={<Normaltekst>Utbelainger</Normaltekst>} />
            <Oversiktskomponent tittel={'Oppfølging'} children={<Normaltekst>Oppfølging</Normaltekst>} />
            <Oversiktskomponent tittel={'Varsler'} children={<VarselOversikt />} />
            <Oversiktskomponent tittel={'Meldinger'} children={<Normaltekst>Meldinger</Normaltekst>} />
            <Oversiktskomponent tittel={'Ytelser'} children={<Normaltekst>Ytelser</Normaltekst>} />
        </Style>
    );
}

export default Oversikt;
