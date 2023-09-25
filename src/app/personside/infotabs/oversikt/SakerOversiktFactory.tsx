import React, { ReactNode } from 'react';
import IfFeatureToggleOff from '../../../../components/featureToggle/IfFeatureToggleOff';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';
import SakerOversiktV2 from './SakerOversiktV2';
import SakerOversikt from './SakerOversikt';

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function SakerOversiktFactory(props: Props) {
    return (
        <>
            <IfFeatureToggleOn toggleID={FeatureToggles.BrukSoknadsstatus}>
                <SakerOversiktV2 setHeaderContent={props.setHeaderContent} />
            </IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={FeatureToggles.BrukSoknadsstatus}>
                <SakerOversikt setHeaderContent={props.setHeaderContent} />
            </IfFeatureToggleOff>
        </>
    );
}

export default SakerOversiktFactory;
