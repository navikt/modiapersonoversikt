import { useInitializeLogger } from '../utils/logger/frontendLogger';
import gsaktemaResource from '../rest/resources/gsaktemaResource';
import baseurls from '../rest/resources/baseurlsResource';
import innloggetSaksbehandler from '../rest/resources/innloggetSaksbehandlerResource';
import saksbehandlersEnheter from '../rest/resources/saksbehandlersEnheterResource';
import oppgaveBehandlerResource from '../rest/resources/oppgaveBehandlerResource';

function FetchSessionInfoOgLeggIRedux() {
    useInitializeLogger();

    innloggetSaksbehandler.usePrefetch();
    saksbehandlersEnheter.usePrefetch();
    gsaktemaResource.usePrefetch();
    oppgaveBehandlerResource.usePrefetch();
    baseurls.usePrefetch();

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
