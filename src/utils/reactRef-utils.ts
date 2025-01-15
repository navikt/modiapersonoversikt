import type { RefObject } from 'react';

// Litt egne typer slik at funksjonene nedenfor kan brukes med både react-events og DOM-events
type EventWithTarget = Event | React.SyntheticEvent;
export type EventListener = (event: EventWithTarget) => void;

type Ref = RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[];

export function eventTagetIsInsideRef(event: EventWithTarget, ref: Ref): boolean {
    if (Array.isArray(ref)) {
        return ref.some((r) => eventTagetIsInsideRef(event, r));
    }

    if (event.target instanceof Node && ref.current) {
        return ref.current.contains(event.target);
    }
    return false;
}

export function runIfEventIsNotInsideRef(ref: Ref, fn: EventListener) {
    return (event: EventWithTarget) => !eventTagetIsInsideRef(event, ref) && fn(event);
}
