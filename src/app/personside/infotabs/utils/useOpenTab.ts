import { INFOTABS } from '../InfoTabEnum';
import { useLocation } from 'react-router';

export function getOpenTabFromRouterPath(currentPath: string): INFOTABS {
    const infoTabs: INFOTABS[] = Object.keys(INFOTABS).map(key => INFOTABS[key]);
    const openTab: INFOTABS | undefined = infoTabs.find((infoTab: string) =>
        currentPath
            .toUpperCase()
            .split('/')
            .includes(infoTab)
    );
    return openTab || INFOTABS.OVERSIKT;
}

export function useOpenTab() {
    const location = useLocation();
    return getOpenTabFromRouterPath(location.pathname);
}
