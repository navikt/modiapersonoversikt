import * as React from 'react';
import { ReactNode } from 'react';
import FeatureToggle from './FeatureToggle';

interface Props {
    children: ReactNode;
    toggleID: string;
}

function FeatureToggleOff(props: Props) {
    return <FeatureToggle {...props} reverse={true}/>;
}

export default FeatureToggleOff;
