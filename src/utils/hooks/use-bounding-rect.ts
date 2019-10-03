import { RefObject, useEffect, useState } from 'react';

export default function useBoundingRect(ref: RefObject<HTMLDivElement>): ClientRect {
    const [position, setPosition] = useState<ClientRect>({ top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 });
    useEffect(() => {
        if (ref.current && ref.current) {
            setPosition(ref.current.getBoundingClientRect());
        }
    }, [ref]);

    return position;
}
