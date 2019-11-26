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

function FeatureToggle(props: Props) {
    const featureToggleIsOn = useSelector((state: AppState) => featureIsOnSelector(state, props.toggleID));

    function shouldDisplay() {
        if (props.mode === DisplayWhenToggleIs.ON && featureToggleIsOn) {
            return true;
        }
        if (props.mode === DisplayWhenToggleIs.OFF && !featureToggleIsOn) {
            return true;
        }
        return false;
    }

    const pending = featureToggleIsOn === undefined;
    if (pending) {
        return <LazySpinner type="S" delay={1000} />;
    }

    if (shouldDisplay()) {
        return <>{props.children}</>;
    }

    return null;
}

export function featureIsOnSelector(state: AppState, toggleId: string): boolean | undefined {
    const toggleResource = state.restResources.featureToggles;
    if (!hasData(toggleResource)) {
        return undefined;
    }
    return toggleResource.data[toggleId];
}

export default FeatureToggle;
