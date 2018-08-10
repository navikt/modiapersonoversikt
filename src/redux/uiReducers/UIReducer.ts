import { Action } from 'redux';

export enum actions {
    TOGGLE_VISITTKORT = 'TOGGLE_VISITTKORT',
    TOGGLE_DIALOGPANEL = 'TOGGLE_DIALOGPANEL'
}

export interface UIState {
    visittkort: {
        apent: boolean
    };
    dialogPanel: {
        ekspandert: boolean
    };
}

export const initialUIState: UIState = {
    visittkort: {
        apent: false
    },
    dialogPanel: {
        ekspandert: false
    }
};

export function toggleVisittkort() {
    return {
        type: actions.TOGGLE_VISITTKORT
    };
}

export function toggleDialogpanel() {
    return {
        type: actions.TOGGLE_DIALOGPANEL
    };
}

export default function reducer(state: UIState = initialUIState, action: Action) {
    switch (action.type) {
        case actions.TOGGLE_VISITTKORT:
            return {
                ...state,
                visittkort: {
                    ...state.visittkort,
                    apent: !state.visittkort.apent
                }
            };
        case actions.TOGGLE_DIALOGPANEL:
            return {
                ...state,
                dialogPanel: {
                    ...state.visittkort,
                    ekspandert: !state.dialogPanel.ekspandert
                }
            };
        default:
            return state;
    }
}
