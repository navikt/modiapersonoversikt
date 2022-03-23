import { useMemo } from 'react';
import { useHistory } from 'react-router';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { datoSynkende } from '../../../../utils/date-utils';
import { hentDatoForSisteHendelse, sakstemakodeAlle, sakstemakodeIngen } from './utils/saksoversiktUtils';
import { useQueryParams } from '../../../../utils/url-utils';

interface SakstemaURLState {
    valgteSakstemaer: Sakstema[];
    setIngenValgte(): void;
    setAlleValgte(): void;
    toggleValgtSakstema(sakstema: Sakstema): void;
}

export function useSakstemaURLState(alleSakstemaer: Sakstema[]): SakstemaURLState {
    const history = useHistory();
    const queryParams = useQueryParams<{ sakstema?: string }>(); //SYK-BAR-AAP
    return useMemo(() => {
        const sakstemaerFraUrl: string[] = queryParams.sakstema?.split('-') ?? [sakstemakodeAlle];
        const valgteSakstemaer: Sakstema[] = sakstemaerFraUrl.includes(sakstemakodeAlle)
            ? alleSakstemaer
            : alleSakstemaer.filter((sakstema) => sakstemaerFraUrl.includes(sakstema.temakode));

        const setIngenValgte = () => {
            history.push({
                search: `?sakstema=${sakstemakodeIngen}`
            });
        };

        const setAlleValgte = () => {
            history.push({
                search: `?sakstema=${sakstemakodeAlle}`
            });
        };

        const toggleValgtSakstema = (sakstema: Sakstema) => {
            const nyTemaliste = valgteSakstemaer.includes(sakstema)
                ? valgteSakstemaer.filter((tema) => tema !== sakstema)
                : [...valgteSakstemaer, sakstema];

            if (nyTemaliste.isEmpty()) {
                setIngenValgte();
            } else if (nyTemaliste.length === alleSakstemaer.length) {
                setAlleValgte();
            } else {
                const nyURL = nyTemaliste
                    .sort(datoSynkende((sakstema) => hentDatoForSisteHendelse(sakstema)))
                    .map((sakstema) => sakstema.temakode)
                    .join('-');
                history.push({
                    search: `?sakstema=${nyURL}`
                });
            }
        };

        return { valgteSakstemaer, setAlleValgte, setIngenValgte, toggleValgtSakstema };
    }, [history, queryParams, alleSakstemaer]);
}

export function useHentAlleSakstemaFraResource(): Sakstema[] {
    const sakstemaResource = useRestResource((resources) => resources.sakstema);
    return useMemo(() => {
        const alleSakstema =
            sakstemaResource.data && sakstemaResource.data.resultat.isNotEmpty() ? sakstemaResource.data.resultat : [];
        return alleSakstema.sort(datoSynkende((sakstema) => hentDatoForSisteHendelse(sakstema)));
    }, [sakstemaResource.data]);
}
