import { useEffect } from 'react';

export function SkyraHandler() {
    useEffect(() => {
        window.skyra?.reload?.();
    }, []);
    return null;
}
