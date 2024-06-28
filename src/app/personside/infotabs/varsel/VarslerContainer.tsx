import * as React from 'react';
import styled from 'styled-components/macro';
import Varsler from './Varsler';
import theme from '../../../../styles/personOversiktTheme';
import VarslerLoader, { VarslerRendererProps } from './varsel-loader';

const Style = styled.div`
    padding: ${theme.margin.layout};
`;

function VarselLamellRenderer(props: VarslerRendererProps) {
    return (
        <Style>
            {props.feilmelding}
            <Varsler varsler={props.varsler} />
        </Style>
    );
}

function VarslerContainer() {
    return <VarslerLoader component={VarselLamellRenderer} />;
}

export default VarslerContainer;
