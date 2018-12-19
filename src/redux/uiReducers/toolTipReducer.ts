import { Action } from 'redux';

export interface TooltipState {
    tooltip?: string;
}

export const initialTooltipState: TooltipState = {
    tooltip: undefined
};

export interface ToolTipAction extends Action {
    tooltip: string;
}

export enum ToolTipActionTypes {
    ENDRETOOLTIP = 'EndreTooltip'
}

export function settNyttTooltip(tooltip: string): ToolTipAction {
    return {
        type: ToolTipActionTypes.ENDRETOOLTIP,
        tooltip
    };
}

function tooltipReducer(state: TooltipState = initialTooltipState, action: ToolTipAction) {
    switch (action.type) {
        case ToolTipActionTypes.ENDRETOOLTIP:
            return {
                ...state,
                tooltip: action.tooltip
            };
        default:
            return state;
    }
}

export default tooltipReducer;
