import React from 'react';
import IfFeatureToggleOff from '../../../../components/featureToggle/IfFeatureToggleOff';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';
import SaksoversiktContainer from './SaksoversiktContainer';
import SaksoversiktContainerV2 from './SaksoversiktContainerV2';

function SaksoversiktFactory() {
    return (
        <>
            <IfFeatureToggleOn toggleID={FeatureToggles.BrukSoknadsstatus}>
                <SaksoversiktContainerV2 />
            </IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={FeatureToggles.BrukSoknadsstatus}>
                <SaksoversiktContainer />
            </IfFeatureToggleOff>
        </>
    );
}

export default SaksoversiktFactory;
