import { useLocation } from '@tanstack/react-router';
import { INFOTABS, type InfotabConfig } from '../InfoTabEnum';

export function getOpenTabFromRouterPath(currentPath: string): InfotabConfig {
    const pathfragments = currentPath.toLowerCase().split('/');
    const infotab: InfotabConfig | undefined = Object.values(INFOTABS).find((infotab) =>
        pathfragments.includes(infotab.path)
    );
    return infotab ?? INFOTABS.OVERSIKT;
}

export function useOpenTab() {
    const location = useLocation();
    return getOpenTabFromRouterPath(location.pathname);
}
