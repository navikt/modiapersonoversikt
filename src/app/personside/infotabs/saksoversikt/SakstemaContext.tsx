import React, { useState, useContext, createContext, useCallback, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { datoSynkende } from '../../../../utils/date-utils';
import { useInfotabsDyplenker } from '../dyplenker';
import { aggregertSakstema, hentDatoForSisteHendelse } from './utils/saksoversiktUtils';

interface SakstemaContextType {
    alleSakstemaer: Sakstema[];
    valgteSakstemaer: Sakstema[];
    setValgteSakstemaer: (sakstemaer: Sakstema[]) => void;
    filtrerPaTema: (temaEndringer: Sakstema[]) => void;
}

export const SakstemaContext = createContext<SakstemaContextType>({
    alleSakstemaer: [],
    valgteSakstemaer: [],
    setValgteSakstemaer: () => {},
    filtrerPaTema: () => {}
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
    const history = useHistory();
    const alleSakstemaer = useMemo(() => {
        const alleSakstema =
            sakstemaResource.data && sakstemaResource.data.resultat.isNotEmpty() ? sakstemaResource.data.resultat : [];
        return alleSakstema.sort(datoSynkende((sakstema) => hentDatoForSisteHendelse(sakstema)));
    }, [sakstemaResource.data]);

    const setValgteSakstemaer = useCallback((sakstemaer: Sakstema[]) => setSakstemaer(sakstemaer), [setSakstemaer]);

    const filtrerPaTema = useCallback(
        (temaEndringer: Sakstema[]) => {
            let nyTemaliste: Sakstema[];
            if (temaEndringer.isEmpty() || temaEndringer.length === alleSakstemaer.length) {
                nyTemaliste = temaEndringer;
            } else {
                const temaEndring = temaEndringer[0];
                nyTemaliste = sakstemaer.includes(temaEndring)
                    ? sakstemaer.filter((tema) => tema !== temaEndring)
                    : [...sakstemaer, temaEndring];
            }
            setValgteSakstemaer(nyTemaliste);
            const nyttAggregertSakstema = aggregertSakstema(alleSakstemaer, nyTemaliste);
            history.push(dyplenker.saker.link(nyttAggregertSakstema));
        },
        [dyplenker.saker, history, sakstemaer, alleSakstemaer, setValgteSakstemaer]
    );

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
        () => ({ alleSakstemaer, valgteSakstemaer: sakstemaer, setValgteSakstemaer, filtrerPaTema }),
        [alleSakstemaer, sakstemaer, setValgteSakstemaer, filtrerPaTema]
    );

    return <SakstemaContext.Provider value={value}>{children}</SakstemaContext.Provider>;
}

export default SakstemaContextProvider;
