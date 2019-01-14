import * as React from 'react';
import { RefObject } from 'react';

export function eventTagetIsInsideRef(event: React.MouseEvent<HTMLElement>, ref: RefObject<HTMLElement>) {
    return (event.target instanceof Node) && ref && ref.current && ref.current.contains(event.target);
}