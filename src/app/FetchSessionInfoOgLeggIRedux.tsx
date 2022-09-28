import { useEffect } from 'react';
import { AppState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useInitializeLogger } from '../utils/logger/frontendLogger';
import { useRestResource } from '../rest/consumer/useRestResource';
import gsaktemaResource from '../rest/resources/gsakTema';
import baseurls from '../rest/resources/baseurls';

function FetchSessionInfoOgLeggIRedux() {
    useInitializeLogger();
    const dispatch = useDispatch();
    const innlogetSaksbehandlerFetch = useSelector(
        (state: AppState) => state.restResources.innloggetSaksbehandler.actions.fetch
    );
    gsaktemaResource.usePreload();
    baseurls.usePreload();

    const fetchVeilederRoller = useRestResource((resources) => resources.veilederRoller).actions.fetch;
    const fetchVeiledersEnheter = useRestResource((resources) => resources.saksbehandlersEnheter).actions.fetch;

    useEffect(() => {
        dispatch(innlogetSaksbehandlerFetch);
        dispatch(fetchVeilederRoller);
        dispatch(fetchVeiledersEnheter);
    }, [dispatch, innlogetSaksbehandlerFetch, fetchVeilederRoller, fetchVeiledersEnheter]);

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
