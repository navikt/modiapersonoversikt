import type { JSX, ReactNode } from 'react';
import featuretoggles from '../../rest/resources/featuretogglesResource';
import LazySpinner from '../LazySpinner';
import type { FeatureToggles } from './toggleIDs';

export enum DisplayWhenToggleIs {
    ON = 0,
    OFF = 1
}

interface Props {
    children: ReactNode;
    toggleID: FeatureToggles;
    mode: DisplayWhenToggleIs;
    loader?: JSX.Element;
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
        ifPending: props.loader ?? <LazySpinner type="S" delay={1000} />,
        ifData: (toggles) => {
            if (shouldDisplay(props.mode, toggles[props.toggleID])) {
                return <>{props.children}</>;
            }
            return null;
        }
    });
}

export default FeatureToggle;
