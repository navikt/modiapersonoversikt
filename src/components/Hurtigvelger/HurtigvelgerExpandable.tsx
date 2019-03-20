import * as React from 'react';
import EkspanderbartpanelBase from 'nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base';
import { Tekst } from './tekster';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import HurtigvalgListe from './HurtigvalgListe';

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

function HurtigvelgerExpandable(props: Props) {
    return (
        <Style>
            <EkspanderbartpanelBase heading={<Undertittel>SEND HURTIGSVAR</Undertittel>} ariaTittel={'hurtigsvar'}>
                <HurtigvalgListe send={props.send} />
            </EkspanderbartpanelBase>
        </Style>
    );
}

export default HurtigvelgerExpandable;
