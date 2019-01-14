import * as React from 'react';

export function eventTargetIsButton(event: React.FocusEvent | React.MouseEvent) {
    return event.target instanceof HTMLButtonElement;
}
