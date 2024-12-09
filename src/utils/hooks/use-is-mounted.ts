import { type RefObject, useEffect, useRef } from 'react';

function useIsMounted(): RefObject<boolean> {
    const ref = useRef<boolean>(true);
    useEffect(() => {
        return () => {
            ref.current = false;
        };
    }, [ref]);

    return ref;
}

export default useIsMounted;
