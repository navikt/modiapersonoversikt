import * as React from 'react';
import { RefObject } from 'react';

export function eventTagetIsInsideRef(
    event: React.MouseEvent<HTMLElement>,
    ref: RefObject<HTMLElement> | RefObject<HTMLElement>[]
): boolean {

    if (ref instanceof Array) {
        return ref.some(r => eventTagetIsInsideRef(event, r));
    }

    if ((event.target instanceof Node) && ref.current) {
        return ref.current.contains(event.target);
    } else {
        return false;
    }
}
