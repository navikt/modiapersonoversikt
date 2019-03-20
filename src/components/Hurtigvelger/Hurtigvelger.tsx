import * as React from 'react';
import EkspanderbartpanelBase from 'nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base';
import { Tekst, tekster } from './tekster';
import HurtigvelgerElement from './HurtigvelgerElement';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    send: (tekst: Tekst) => void;
}

const Style = styled.div`
    .ekspanderbartPanel__innhold {
        padding: 0;
    }
    .ekspanderbartPanel__hode:hover {
        ${theme.hover}
    }
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.7));
`;

const MarginBottom = styled.div`
    margin-bottom: 6rem;
`;

function Hurtigvelger(props: Props) {
    return (
        <Style>
            <EkspanderbartpanelBase heading={<Undertittel>SEND HURTIGSVAR</Undertittel>} ariaTittel={'hurtigsvar'}>
                {tekster.map(tekst => (
                    <HurtigvelgerElement key={tekst.tittel} tekst={tekst} sendTekst={() => props.send(tekst)} />
                ))}
                <MarginBottom />
            </EkspanderbartpanelBase>
        </Style>
    );
}

export default Hurtigvelger;
