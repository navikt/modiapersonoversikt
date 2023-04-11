import * as React from 'react';
import styled from 'styled-components/macro';
import Varsler from './Varsler';
import theme from '../../../../styles/personOversiktTheme';
import VarslerLoader, { VarslerRendererProps } from './varsel-loader';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import VarslerNy from './VarslerNy';
import IfFeatureToggleOff from '../../../../components/featureToggle/IfFeatureToggleOff';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';

const Style = styled.div`
    padding: ${theme.margin.layout};
`;

function VarselLamellRenderer(props: VarslerRendererProps) {
    return (
        <Style>
            {props.feilmelding}
            <IfFeatureToggleOn toggleID={FeatureToggles.visRevarslingDetaljer}>
                <VarslerNy varsler={props.varsler} />
            </IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={FeatureToggles.visRevarslingDetaljer}>
                <Varsler varsler={props.varsler} />
            </IfFeatureToggleOff>
        </Style>
    );
}

function VarslerContainer() {
    return <VarslerLoader component={VarselLamellRenderer} />;
}

export default VarslerContainer;
