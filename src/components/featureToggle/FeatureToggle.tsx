import * as React from 'react';
import { ReactNode } from 'react';
import { AppState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import LazySpinner from '../LazySpinner';
import { FeatureToggles } from './toggleIDs';
import { hasData } from '../../rest/utils/restResource';

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
    const featureToggleIsOn = useSelector((state: AppState) => featureIsOnSelector(state, props.toggleID));
    if (featureToggleIsOn === undefined) {
        return <LazySpinner type="S" delay={1000} />;
    }

    if (shouldDisplay(props.mode, featureToggleIsOn)) {
        return <>{props.children}</>;
    }

    return null;
}

function featureIsOnSelector(state: AppState, toggleId: string): boolean | undefined {
    const toggleResource = state.restResources.featureToggles;
    if (!hasData(toggleResource)) {
        return undefined;
    }
    return toggleResource.data[toggleId];
}

export default FeatureToggle;
