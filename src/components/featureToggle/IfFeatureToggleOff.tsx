import * as React from 'react';
import { ReactNode } from 'react';
import FeatureToggle, { DisplayWhenToggleIs } from './FeatureToggle';
import { FeatureToggles } from './toggleIDs';

interface Props {
    children: ReactNode;
    toggleID: FeatureToggles;
}

function IfFeatureToggleOff(props: Props) {
    return <FeatureToggle {...props} mode={DisplayWhenToggleIs.OFF} />;
}

export default IfFeatureToggleOff;
