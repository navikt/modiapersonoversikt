import * as React from 'react';
import { RefObject } from 'react';

export function eventTagetIsInsideRef(
    event: React.MouseEvent<HTMLElement>,
    ref: RefObject<HTMLElement> | RefObject<HTMLElement>[]
): boolean {

    if (ref instanceof Array) {
        return ref.some(r => eventTagetIsInsideRef(event, r));
    }

    return (event.target instanceof Node) && ref && ref.current && ref.current.contains(event.target) || false;
}
