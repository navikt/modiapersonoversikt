import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

function FetchSessionInfoOgLeggIRedux() {
    const dispatch = useDispatch();
    const restResources = useSelector((state: AppState) => state.restResources);

    useEffect(() => {
        dispatch(restResources.innloggetSaksbehandler.actions.fetch);
        dispatch(restResources.oppgaveGsakTema.actions.fetch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
