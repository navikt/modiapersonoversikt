import { useLocation } from '@tanstack/react-router';
import { INFOTABS, type InfotabConfig } from '../InfoTabEnum';

export function getOpenTabFromRouterPath(currentPath: string): InfotabConfig {
    const pathfragments = currentPath.toLowerCase().split('/');

    const infotabsWithDokumenter = {
        ...INFOTABS,
        DOKUMENTER: { tittel: 'Dokumenter', path: 'dokumenter' }
    };
    const infotab: InfotabConfig | undefined = Object.values(infotabsWithDokumenter).find((infotab) =>
        pathfragments.includes(infotab.path)
    );
    return infotab ?? infotabsWithDokumenter.OVERSIKT;
}

export function useOpenTab() {
    const location = useLocation();
    return getOpenTabFromRouterPath(location.pathname);
}
