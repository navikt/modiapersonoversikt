import { RefObject, useEffect, useState } from 'react';

const initialBCR: DOMRect = {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON(): any {}
};
export default function useBoundingRect(ref: RefObject<HTMLDivElement>): DOMRect {
    const [position, setPosition] = useState<DOMRect>(initialBCR);
    useEffect(() => {
        if (ref.current && ref.current) {
            setPosition(ref.current.getBoundingClientRect());
        }
    }, [ref]);

    return position;
}
