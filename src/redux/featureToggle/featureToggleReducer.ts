import { Action } from 'redux';

export interface FeatureToggleState {
    [name: string]: boolean;
}

const initialState: FeatureToggleState = {
};

enum actionKeys {
    setFeatureToggleOn = 'FEATURETOGGLE / SET_ON',
    setFeatureToggleOff = 'FEATURETOGGLE / SET_OFF'
}

interface FeatureToggleAction extends Action {
    type: actionKeys;
    toggleId: string;
}

export function setFeatureToggleOn(toggleID: string): FeatureToggleAction {
    return {
        type: actionKeys.setFeatureToggleOn,
        toggleId: toggleID
    };
}

export function setFeatureToggleOff(toggleID: string): FeatureToggleAction {
    return {
        type: actionKeys.setFeatureToggleOff,
        toggleId: toggleID
    };
}

export function featureToggleReducer(state: FeatureToggleState = initialState, action: FeatureToggleAction)
    : FeatureToggleState {
    switch (action.type) {
        case actionKeys.setFeatureToggleOn:
            return {
                ...state,
                [action.toggleId]: true
            };
        case actionKeys.setFeatureToggleOff:
            return {
                ...state,
                [action.toggleId]: false
            };
        default:
            return state;
    }
}
