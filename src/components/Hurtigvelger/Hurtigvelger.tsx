import * as React from 'react';
import EkspanderbartpanelBase from 'nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base';
import { tekster } from './tekster';
import HurtigvelgerElement from './HurtigvelgerElement';
import styled from 'styled-components';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';

const Style = styled.div`
    width: 35rem;
    margin: 0 auto;
    overflow-y: auto;
`;

const MarginBottom = styled.div`
    margin-bottom: 12rem;
`;

function HurtigvelgerDropDown() {
    return (
        <Style>
            <EkspanderbartpanelBase heading={<Systemtittel>Hurtigvalg</Systemtittel>} ariaTittel={'tittel'}>
                {tekster.map(tekst => (
                    <HurtigvelgerElement key={tekst.tittel} tekst={tekst} />
                ))}
                <MarginBottom />
            </EkspanderbartpanelBase>
        </Style>
    );
}

export default HurtigvelgerDropDown;
