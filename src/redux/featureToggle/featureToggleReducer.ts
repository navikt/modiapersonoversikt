import { Action } from 'redux';

export interface FeatureToggleState {
    turnedOn: Array<string>;
    turnedOff: Array<string>;
}

const initialState: FeatureToggleState = {
    turnedOn: [],
    turnedOff: []
};

enum actionKeys {
    setFeatureToggleOn,
    setFeatureToggleOff
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
                turnedOff: state.turnedOff.filter(entry => entry !== action.toggleId),
                turnedOn: state.turnedOn.includes(action.toggleId)
                    ? state.turnedOn
                    : [...state.turnedOn, action.toggleId]
            };
        case actionKeys.setFeatureToggleOff:
            return {
                turnedOff: state.turnedOff.includes(action.toggleId)
                    ? state.turnedOff
                    : [...state.turnedOff, action.toggleId],
                turnedOn: state.turnedOn.filter(entry => entry !== action.toggleId)
            };
        default:
            return state;
    }
}
