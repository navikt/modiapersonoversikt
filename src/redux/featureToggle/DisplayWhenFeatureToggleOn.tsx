import * as React from 'react';
import { ReactNode } from 'react';
import FeatureToggle, { DisplayWhenToggleIs } from './FeatureToggle';

interface Props {
    children: ReactNode;
    toggleID: string;
}

function DisplayWhenFeatureToggleOn(props: Props) {
    return <FeatureToggle {...props} mode={DisplayWhenToggleIs.ON}/>;
}

export default DisplayWhenFeatureToggleOn;
