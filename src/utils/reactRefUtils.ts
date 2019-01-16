import { RefObject } from 'react';

interface EventWithTarget {
    target: EventTarget | null;
}

type Ref = RefObject<HTMLElement> | RefObject<HTMLElement>[];

export function eventTagetIsInsideRef(event: EventWithTarget, ref: Ref): boolean {
    if (ref instanceof Array) {
        return ref.some(r => eventTagetIsInsideRef(event, r));
    }

    if ((event.target instanceof Node) && ref.current) {
        return ref.current.contains(event.target);
    } else {
        return false;
    }
}

export function runIfEventIsNotInsideRef(ref: Ref, fn: Function) {
    return (event: EventWithTarget) => !eventTagetIsInsideRef(event, ref) && fn();
}

export function runIfEventIsInsideRef(ref: Ref, fn: Function) {
    return (event: EventWithTarget) => eventTagetIsInsideRef(event, ref) && fn();
}
