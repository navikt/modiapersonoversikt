import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useRestResource } from '../../utils/customHooks';
import { useInitializeLogger } from '../../utils/frontendLogger';

function FetchSessionInfoOgLeggIRedux() {
    useInitializeLogger();
    const dispatch = useDispatch();
    const innlogetSaksbehandlerFetch = useSelector(
        (state: AppState) => state.restResources.innloggetSaksbehandler.actions.fetch
    );
    const oppgaveGsakTemaFetch = useSelector((state: AppState) => state.restResources.oppgaveGsakTema.actions.fetch);
    const baseUrlFetch = useSelector((state: AppState) => state.restResources.baseUrl.actions.fetch);
    const fetchVeilederRoller = useRestResource(resources => resources.veilederRoller.actions.fetch);

    useEffect(() => {
        dispatch(innlogetSaksbehandlerFetch);
        dispatch(fetchVeilederRoller);
        dispatch(oppgaveGsakTemaFetch);
        dispatch(baseUrlFetch);
    }, [dispatch, innlogetSaksbehandlerFetch, oppgaveGsakTemaFetch, baseUrlFetch, fetchVeilederRoller]);

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
