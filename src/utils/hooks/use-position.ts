import { RefObject, useEffect, useState } from 'react';

export type Position = ClientRect | DOMRect;
export default function usePosition(ref: RefObject<HTMLDivElement>): Position {
    const [position, setPosition] = useState<Position>({ top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 });
    useEffect(() => {
        if (ref.current && ref.current) {
            setPosition(ref.current.getBoundingClientRect());
        }
    }, [ref]);

    return position;
}
