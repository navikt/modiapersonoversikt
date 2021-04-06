import { InfotabsType } from '../InfoTabEnum';
import { useLocation } from 'react-router';

export function getOpenTabFromRouterPath(currentPath: string): InfotabsType {
    const infoTabs: InfotabsType[] = Object.keys(InfotabsType).map(key => InfotabsType[key]);
    const openTab: InfotabsType | undefined = infoTabs.find((infoTab: string) =>
        currentPath
            .toUpperCase()
            .split('/')
            .includes(infoTab)
    );
    return openTab || InfotabsType.OVERSIKT;
}

export function useOpenTab() {
    const location = useLocation();
    return getOpenTabFromRouterPath(location.pathname);
}
