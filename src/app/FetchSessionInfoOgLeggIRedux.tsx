import { useInitializeLogger } from '../utils/logger/frontendLogger';
import gsaktemaResource from '../rest/resources/gsaktemaResource';
import baseurls from '../rest/resources/baseurlsResource';
import innloggetSaksbehandler from '../rest/resources/innloggetSaksbehandlerResource';
import saksbehandlersEnheter from '../rest/resources/saksbehandlersEnheterResource';
import { useQueryClient } from '@tanstack/react-query';

function FetchSessionInfoOgLeggIRedux() {
    useInitializeLogger();
    const queryClient = useQueryClient();

    innloggetSaksbehandler.prefetch(queryClient);
    saksbehandlersEnheter.prefetch(queryClient);
    gsaktemaResource.prefetch(queryClient);
    baseurls.prefetch(queryClient);

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
