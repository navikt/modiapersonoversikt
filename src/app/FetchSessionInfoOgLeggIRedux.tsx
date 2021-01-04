import { useEffect } from 'react';
import { AppState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useInitializeLogger } from '../utils/logger/frontendLogger';
import { useRestResource } from '../rest/consumer/useRestResource';

function FetchSessionInfoOgLeggIRedux() {
    useInitializeLogger();
    const dispatch = useDispatch();
    const innlogetSaksbehandlerFetch = useSelector(
        (state: AppState) => state.restResources.innloggetSaksbehandler.actions.fetch
    );
    const oppgaveGsakTemaFetch = useSelector((state: AppState) => state.restResources.oppgaveGsakTema.actions.fetch);
    const baseUrlFetch = useSelector((state: AppState) => state.restResources.baseUrl.actions.fetch);
    const fetchVeilederRoller = useRestResource(resources => resources.veilederRoller).actions.fetch;
    const fetchVeiledersEnheter = useRestResource(resources => resources.saksbehandlersEnheter).actions.fetch;

    useEffect(() => {
        dispatch(innlogetSaksbehandlerFetch);
        dispatch(fetchVeilederRoller);
        dispatch(oppgaveGsakTemaFetch);
        dispatch(baseUrlFetch);
        dispatch(fetchVeiledersEnheter);
    }, [
        dispatch,
        innlogetSaksbehandlerFetch,
        oppgaveGsakTemaFetch,
        baseUrlFetch,
        fetchVeilederRoller,
        fetchVeiledersEnheter
    ]);

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
