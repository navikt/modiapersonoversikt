import { useInitializeLogger } from '../utils/logger/frontendLogger';
import gsaktemaResource from '../rest/resources/gsakTema';
import baseurls from '../rest/resources/baseurlsResource';
import innloggetSaksbehandler from '../rest/resources/innloggetSaksbehandler';
import saksbehandlersEnheter from '../rest/resources/saksbehandlersEnheter';
import { useQueryClient } from '@tanstack/react-query';

function FetchSessionInfoOgLeggIRedux() {
    useInitializeLogger();
    const queryClient = useQueryClient();

    innloggetSaksbehandler.useFetch();
    saksbehandlersEnheter.useFetch();
    gsaktemaResource.useFetch();
    baseurls.prefetch(queryClient);

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
