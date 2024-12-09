import type { ReactNode } from 'react';
import FeatureToggle, { DisplayWhenToggleIs } from './FeatureToggle';
import type { FeatureToggles } from './toggleIDs';

interface Props {
    children: ReactNode;
    toggleID: FeatureToggles;
}

function IfFeatureToggleOff(props: Props) {
    return <FeatureToggle {...props} mode={DisplayWhenToggleIs.OFF} />;
}

export default IfFeatureToggleOff;
