import React, { useState, useContext, createContext, useCallback, useMemo, useEffect } from 'react';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { useInfotabsDyplenker } from '../dyplenker';

interface SakstemaContextType {
    valgteSakstemaer: Sakstema[];
    setValgteSakstemaer: (sakstemaer: Sakstema[]) => void;
}

export const SakstemaContext = createContext<SakstemaContextType>({
    valgteSakstemaer: [],
    setValgteSakstemaer: () => {}
});

export function useSakstemaer() {
    return useContext(SakstemaContext);
}

interface Props {
    children: React.ReactNode;
}

function SakstemaContextProvider({ children }: Props) {
    const sakstemaResource = useRestResource((resources) => resources.sakstema);
    const [sakstemaer, setSakstemaer] = useState<Sakstema[]>([]);
    const dyplenker = useInfotabsDyplenker();

    const setValgteSakstemaer = useCallback((sakstemaer: Sakstema[]) => setSakstemaer(sakstemaer), [setSakstemaer]);

    useEffect(() => {
        const alleSakstema =
            sakstemaResource.data && sakstemaResource.data.resultat.isNotEmpty() ? sakstemaResource.data.resultat : [];
        const sakstemaerFraLink = alleSakstema.filter(dyplenker.saker.erValgtSakstema);
        const ingenSakValgt = dyplenker.saker.erIngenSakstemaValgt;

        let valgteSakstemaer: Sakstema[];
        if (ingenSakValgt) {
            valgteSakstemaer = [];
        } else if (sakstemaerFraLink.isNotEmpty()) {
            valgteSakstemaer = sakstemaerFraLink;
        } else {
            valgteSakstemaer = alleSakstema;
        }

        setValgteSakstemaer(valgteSakstemaer);
    }, [sakstemaResource.data, setValgteSakstemaer, dyplenker]);

    const value = useMemo(
        () => ({ valgteSakstemaer: sakstemaer, setValgteSakstemaer }),
        [sakstemaer, setValgteSakstemaer]
    );

    return <SakstemaContext.Provider value={value}>{children}</SakstemaContext.Provider>;
}

export default SakstemaContextProvider;
