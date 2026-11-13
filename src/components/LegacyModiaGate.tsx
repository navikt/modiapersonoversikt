import { Navigate, useLocation, useSearch } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import type { PropsWithChildren } from 'react';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { getNyModiaRedirect } from 'src/utils/legacyModiaNavigation';
import useDeaktiverGammelModia from './featureToggle/useDeaktiverGammelModia';
import { CenteredLazySpinner } from './LazySpinner';

export default function LegacyModiaGate({ children }: PropsWithChildren) {
    const deaktivering = useDeaktiverGammelModia();
    const aktivBruker = useAtomValue(aktivBrukerAtom);
    const pathname = useLocation({ select: (location) => location.pathname });
    const search = useSearch({ strict: false });

    if (deaktivering.status === 'pending') {
        return <CenteredLazySpinner />;
    }
    if (!deaktivering.isOn) {
        return children;
    }
    if (pathname === '/new' || pathname.startsWith('/new/')) {
        return null;
    }
    return <Navigate {...getNyModiaRedirect(pathname, search, !!aktivBruker)} replace />;
}
