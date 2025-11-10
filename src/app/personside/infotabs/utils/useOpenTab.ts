import { useLocation } from '@tanstack/react-router';
import { INFOTABS, type InfotabConfig } from '../InfoTabEnum';

export function getOpenTabFromRouterPath(currentPath: string): InfotabConfig {
    const pathfragments = currentPath.toLowerCase().split('/');
    const infotabsWithOppgave = { ...INFOTABS, OPPGAVER: { tittel: 'Oppgaver', path: 'oppgaver' } };
    const infotab: InfotabConfig | undefined = Object.values(infotabsWithOppgave).find((infotab) =>
        pathfragments.includes(infotab.path)
    );
    return infotab ?? infotabsWithOppgave.OVERSIKT;
}

export function useOpenTab() {
    const location = useLocation();
    return getOpenTabFromRouterPath(location.pathname);
}
