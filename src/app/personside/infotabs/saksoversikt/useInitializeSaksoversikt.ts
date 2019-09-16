import { SakerDyplenkeRouteComponentProps, useInfotabsDyplenker, useValgtSakstemaIUrl } from '../dyplenker';
import { useAppState } from '../../../../utils/customHooks';
import { useAgregerteSaker } from './utils/saksoversiktUtils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { huskValgtSakstema } from '../../../../redux/saksoversikt/actions';

export function useSyncSaksoversiktMedUrl(props: SakerDyplenkeRouteComponentProps) {
    const saksTemaIUrl = useValgtSakstemaIUrl(props);
    const forrigeValgteSaksTema = useAppState(state => state.saksoversikt.forrigeValgteSakstema);
    const agregerteSakstema = useAgregerteSaker();
    const dyplenker = useInfotabsDyplenker();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!agregerteSakstema) {
            return;
        }
        if (!saksTemaIUrl) {
            props.history.push(dyplenker.saker.link(forrigeValgteSaksTema || agregerteSakstema));
        } else if (saksTemaIUrl !== forrigeValgteSaksTema) {
            dispatch(huskValgtSakstema(saksTemaIUrl));
        }
    }, [forrigeValgteSaksTema, agregerteSakstema, saksTemaIUrl, props.history, dispatch, dyplenker.saker]);
    return saksTemaIUrl || forrigeValgteSaksTema || agregerteSakstema;
}
