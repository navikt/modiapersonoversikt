import { useInfotabsDyplenker } from '../dyplenker';
import { useAppState, useRestResource } from '../../../../utils/customHooks';
import { useAgregerteSaker } from './utils/saksoversiktUtils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { huskValgtSakstema } from '../../../../redux/saksoversikt/actions';
import { useHistory } from 'react-router';
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

export function useSyncSaksoversiktMedUrl() {
    const saksTemaIUrl = useValgtSakstemaIUrl();
    const forrigeValgteSaksTema = useAppState(state => state.saksoversikt.forrigeValgteSakstema);
    const agregerteSakstema = useAgregerteSaker();
    const dyplenker = useInfotabsDyplenker();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!agregerteSakstema) {
            return;
        }
        if (!saksTemaIUrl) {
            history.push(dyplenker.saker.link(forrigeValgteSaksTema || agregerteSakstema));
        } else if (saksTemaIUrl !== forrigeValgteSaksTema) {
            dispatch(huskValgtSakstema(saksTemaIUrl));
        }
    }, [forrigeValgteSaksTema, agregerteSakstema, saksTemaIUrl, history, dispatch, dyplenker.saker]);
    return saksTemaIUrl || forrigeValgteSaksTema || agregerteSakstema;
}
