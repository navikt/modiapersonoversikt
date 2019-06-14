import * as React from 'react';
import FeatureToggle, { DisplayWhenToggleIs } from './FeatureToggle';
import { FeatureToggles } from './toggleIDs';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    toggleID: FeatureToggles;
}

function IfFeatureToggleOff(props: Props) {
    return <FeatureToggle {...props} mode={DisplayWhenToggleIs.OFF} />;
}

export default IfFeatureToggleOff;
