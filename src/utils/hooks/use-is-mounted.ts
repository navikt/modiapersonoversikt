import * as React from 'react';
import { RefObject, useEffect } from 'react';

function useIsMounted(): RefObject<boolean> {
    const ref = React.useRef<boolean>(true);
    useEffect(() => {
        return () => {
            ref.current = false;
        };
    }, [ref]);

    return ref;
}

export default useIsMounted;
