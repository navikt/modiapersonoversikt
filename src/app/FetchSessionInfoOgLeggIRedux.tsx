import baseurls from '../rest/resources/baseurlsResource';
import gsaktemaResource from '../rest/resources/gsaktemaResource';
import innloggetSaksbehandler from '../rest/resources/innloggetSaksbehandlerResource';
import oppgaveBehandlerResource from '../rest/resources/oppgaveBehandlerResource';
import saksbehandlersEnheter from '../rest/resources/saksbehandlersEnheterResource';
import { useInitializeLogger } from '../utils/logger/frontendLogger';

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
