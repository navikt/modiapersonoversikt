import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Varsler from './Varsler';
import VarslerLoader, { type VarslerRendererProps } from './varsel-loader';

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
