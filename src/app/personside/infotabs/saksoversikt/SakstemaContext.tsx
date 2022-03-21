import React, { useState, useContext, createContext, useCallback, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { datoSynkende } from '../../../../utils/date-utils';
import { useInfotabsDyplenker } from '../dyplenker';
import { aggregertSakstema, hentDatoForSisteHendelse } from './utils/saksoversiktUtils';

interface SakstemaContextType {
    alleSakstemaer: Sakstema[];
    valgtSakstema: Sakstema;
    filtrerPaTema: (temaEndringer: Sakstema[]) => void;
}

const defaultSakstema: Sakstema = {
    harTilgang: false,
    temakode: '',
    temanavn: '',
    erGruppert: false,
    behandlingskjeder: [],
    dokumentMetadata: [],
    tilhørendeSaker: [],
    feilkoder: []
};

export const SakstemaContext = createContext<SakstemaContextType>({
    alleSakstemaer: [],
    valgtSakstema: defaultSakstema,
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
    const [valgtSakstema, setValgtSakstema] = useState<Sakstema>(aggregertSakstema(alleSakstemaer));

    // TODO: Mangler dokument

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
            setSakstemaer(nyTemaliste);
            const nyttAggregertSakstema = aggregertSakstema(alleSakstemaer, nyTemaliste);
            setValgtSakstema(nyttAggregertSakstema);
            history.push(dyplenker.saker.link(nyttAggregertSakstema));
        },
        [dyplenker.saker, history, sakstemaer, alleSakstemaer, setSakstemaer]
    );

    useEffect(() => {
        const sakstemaerFraLink = alleSakstemaer.filter(dyplenker.saker.erValgtSakstema);
        const ingenSakValgt = dyplenker.saker.erIngenSakstemaValgt;

        let valgteSakstemaer: Sakstema[];
        if (ingenSakValgt) {
            valgteSakstemaer = [];
        } else if (sakstemaerFraLink.isNotEmpty()) {
            valgteSakstemaer = sakstemaerFraLink;
        } else {
            valgteSakstemaer = alleSakstemaer;
        }

        setSakstemaer(valgteSakstemaer);
        setValgtSakstema(aggregertSakstema(alleSakstemaer, valgteSakstemaer));
    }, [alleSakstemaer, sakstemaResource.data, setSakstemaer, dyplenker]);

    const value = useMemo(
        () => ({ alleSakstemaer, valgtSakstema, filtrerPaTema }),
        [alleSakstemaer, valgtSakstema, filtrerPaTema]
    );

    return <SakstemaContext.Provider value={value}>{children}</SakstemaContext.Provider>;
}

export default SakstemaContextProvider;
