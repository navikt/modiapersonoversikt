import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInitializeLogger } from '../utils/logger/frontendLogger';
import { useRestResource } from '../rest/consumer/useRestResource';
import gsaktemaResource from '../rest/resources/gsakTema';
import baseurls from '../rest/resources/baseurls';
import innloggetSaksbehandler from '../rest/resources/innloggetSaksbehandler';

function FetchSessionInfoOgLeggIRedux() {
    useInitializeLogger();
    const dispatch = useDispatch();
    innloggetSaksbehandler.useFetch();
    gsaktemaResource.useFetch();
    baseurls.useFetch();

    const fetchVeiledersEnheter = useRestResource((resources) => resources.saksbehandlersEnheter).actions.fetch;

    useEffect(() => {
        dispatch(fetchVeiledersEnheter);
    }, [dispatch, fetchVeiledersEnheter]);

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
