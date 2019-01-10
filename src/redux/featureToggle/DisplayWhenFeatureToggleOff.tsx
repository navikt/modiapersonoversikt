import * as React from 'react';
import { ReactNode } from 'react';
import FeatureToggle, { DisplayWhenToggleIs } from './FeatureToggle';

interface Props {
    children: ReactNode;
    toggleID: string;
}

function DisplayWhenFeatureToggleOff(props: Props) {
    return <FeatureToggle {...props} mode={DisplayWhenToggleIs.OFF}/>;
}

export default DisplayWhenFeatureToggleOff;
