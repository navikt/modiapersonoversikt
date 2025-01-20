import type { JSX, ReactNode } from 'react';
import FeatureToggle, { DisplayWhenToggleIs } from './FeatureToggle';
import type { FeatureToggles } from './toggleIDs';

interface Props {
    children: ReactNode;
    toggleID: FeatureToggles;
    loader?: JSX.Element;
}

function IfFeatureToggleOn(props: Props) {
    return <FeatureToggle {...props} mode={DisplayWhenToggleIs.ON} />;
}

export default IfFeatureToggleOn;
