import { useInfotabsDyplenker } from '../dyplenker';
import { useAppState, useRestResource } from '../../../../utils/customHooks';
import { useAgregerteSaker } from './utils/saksoversiktUtils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { huskValgtSakstema } from '../../../../redux/saksoversikt/actions';
import { hasData } from '../../../../rest/utils/restResource';

function useValgtSakstemaIUrl() {
    const dyplenker = useInfotabsDyplenker();
    const sakstemaResource = useRestResource(resources => resources.sakstema);
    const agregerteSaker = useAgregerteSaker();
    if (!hasData(sakstemaResource) || !agregerteSaker) {
        return undefined;
    }
    return [agregerteSaker, ...sakstemaResource.data.resultat].find(dyplenker.saker.erValgt);
}

export function useValgtSakstema() {
    const saksTemaIUrl = useValgtSakstemaIUrl();
    const forrigeValgteSaksTema = useAppState(state => state.saksoversikt.forrigeValgteSakstema);
    const agregerteSakstema = useAgregerteSaker();
    const dispatch = useDispatch();

    useEffect(() => {
        if (saksTemaIUrl) {
            dispatch(huskValgtSakstema(saksTemaIUrl));
        }
    }, [saksTemaIUrl, dispatch]);

    return saksTemaIUrl || forrigeValgteSaksTema || agregerteSakstema;
}
