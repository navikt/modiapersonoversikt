import React from 'react';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';
import IfFeatureToggleOff from '../../../../components/featureToggle/IfFeatureToggleOff';
import SakerFullscreen from './SakerFullscreen';
import SakerFullscreenV2 from './SakerFullscreenV2';

interface Props {
    fnr: string;
}

function SakerFullscreenProxy(props: Props) {
    return (
        <>
            <IfFeatureToggleOn toggleID={FeatureToggles.BrukSoknadsstatus}>
                <SakerFullscreenV2 fnr={props.fnr} />
            </IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={FeatureToggles.BrukSoknadsstatus}>
                <SakerFullscreen fnr={props.fnr} />
            </IfFeatureToggleOff>
        </>
    );
}

export default SakerFullscreenProxy;
