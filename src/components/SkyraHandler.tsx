import { useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';

export function SkyraHandler() {
    const { pathname, status } = useRouterState({
        select: (s) => ({ pathname: s.location.pathname, status: s.status })
    });

    useEffect(() => {
        if (status !== 'idle') return;
        console.log('[Skyra] Route changed, triggering reload:', pathname);
        window.skyra?.reload?.();
    }, [pathname, status]);

    return null;
}
