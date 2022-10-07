import { useInitializeLogger } from '../utils/logger/frontendLogger';
import gsaktemaResource from '../rest/resources/gsakTema';
import baseurls from '../rest/resources/baseurls';
import innloggetSaksbehandler from '../rest/resources/innloggetSaksbehandler';
import saksbehandlersEnheter from '../rest/resources/saksbehandlersEnheter';

function FetchSessionInfoOgLeggIRedux() {
    useInitializeLogger();

    innloggetSaksbehandler.useFetch();
    saksbehandlersEnheter.useFetch();
    gsaktemaResource.useFetch();
    baseurls.useFetch();

    return null;
}

export default FetchSessionInfoOgLeggIRedux;
