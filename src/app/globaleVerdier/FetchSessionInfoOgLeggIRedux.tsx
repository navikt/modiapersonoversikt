import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

function FetchSessionInfoOgLeggIRedux() {
    const dispatch = useDispatch();
    const innlogetSaksbehandlerFetch = useSelector(
        (state: AppState) => state.restResources.innloggetSaksbehandler.actions.fetch
    );
    const oppgaveGsakTemaFetch = useSelector((state: AppState) => state.restResources.oppgaveGsakTema.actions.fetch);

    useEffect(() => {
        dispatch(innlogetSaksbehandlerFetch);
        dispatch(oppgaveGsakTemaFetch);
    }, [dispatch, innlogetSaksbehandlerFetch, oppgaveGsakTemaFetch]);

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
