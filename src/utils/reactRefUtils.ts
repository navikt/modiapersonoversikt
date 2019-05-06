import { RefObject } from 'react';

// Litt egne typer slik at funksjonene nedenfor kan brukes med både react-events og DOM-events
export type EventWithTarget = Event | React.SyntheticEvent;
export type EventListener = (event: EventWithTarget) => void;

type Ref = RefObject<HTMLElement> | RefObject<HTMLElement>[];

export function eventTagetIsInsideRef(event: EventWithTarget, ref: Ref): boolean {
    if (ref instanceof Array) {
        return ref.some(r => eventTagetIsInsideRef(event, r));
    }

    if (event.target instanceof Node && ref.current) {
        return ref.current.contains(event.target);
    } else {
        return false;
    }
}

export function runIfEventIsNotInsideRef(ref: Ref, fn: EventListener) {
    return (event: EventWithTarget) => !eventTagetIsInsideRef(event, ref) && fn(event);
}

export function runIfEventIsInsideRef(ref: Ref, fn: EventListener) {
    return (event: EventWithTarget) => eventTagetIsInsideRef(event, ref) && fn(event);
}
