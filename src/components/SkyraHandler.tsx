import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';

export function SkyraHandler() {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log('[Skyra] Route changed, triggering reload:', pathname);
        window.skyra?.reload?.();
    }, [pathname]);

    return null;
}
