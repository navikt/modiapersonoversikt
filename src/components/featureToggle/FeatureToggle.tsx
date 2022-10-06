import * as React from 'react';
import { ReactNode } from 'react';
import LazySpinner from '../LazySpinner';
import { FeatureToggles } from './toggleIDs';
import featuretoggles from '../../rest/resources/featuretoggles';

export enum DisplayWhenToggleIs {
    ON,
    OFF
}

interface Props {
    children: ReactNode;
    toggleID: FeatureToggles;
    mode: DisplayWhenToggleIs;
}

function shouldDisplay(mode: DisplayWhenToggleIs, featureToggleIsOn: boolean): boolean {
    switch (mode) {
        case DisplayWhenToggleIs.ON:
            return featureToggleIsOn;
        case DisplayWhenToggleIs.OFF:
            return !featureToggleIsOn;
    }
}

function FeatureToggle(props: Props) {
    return featuretoggles.useRenderer({
        ifPending: <LazySpinner type="S" delay={1000} />,
        ifData: (toggles) => {
            if (shouldDisplay(props.mode, toggles[props.toggleID])) {
                return <>{props.children}</>;
            } else {
                return null;
            }
        }
    });
}

export default FeatureToggle;
