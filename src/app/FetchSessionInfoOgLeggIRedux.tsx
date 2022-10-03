import { useEffect } from 'react';
import { AppState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useInitializeLogger } from '../utils/logger/frontendLogger';
import { useRestResource } from '../rest/consumer/useRestResource';
import gsaktemaResource from '../rest/resources/gsakTema';
import baseurls from '../rest/resources/baseurls';
import veilederroller from '../rest/resources/veilederroller';

function FetchSessionInfoOgLeggIRedux() {
    useInitializeLogger();
    const dispatch = useDispatch();
    const innlogetSaksbehandlerFetch = useSelector(
        (state: AppState) => state.restResources.innloggetSaksbehandler.actions.fetch
    );
    gsaktemaResource.usePreload();
    baseurls.usePreload();
    veilederroller.usePreload();

    const fetchVeiledersEnheter = useRestResource((resources) => resources.saksbehandlersEnheter).actions.fetch;

    useEffect(() => {
        dispatch(innlogetSaksbehandlerFetch);
        dispatch(fetchVeiledersEnheter);
    }, [dispatch, innlogetSaksbehandlerFetch, fetchVeiledersEnheter]);

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
