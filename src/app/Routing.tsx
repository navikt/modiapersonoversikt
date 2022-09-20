import React, { Suspense } from 'react';
import { Switch } from 'react-router';
import { SentryRoute } from '../sentry-route';
import { paths } from './routes/routing';
import SakerFullscreen from './personside/infotabs/saksoversikt/SakerFullscreen';
import SaksDokumentEgetVindu from './personside/infotabs/saksoversikt/SaksDokumentIEgetVindu';
import Personoversikt from './personside/Personoversikt';
import Startbilde from './startbilde/Startbilde';
import { useFodselsnummer } from '../utils/customHooks';
import { CenteredLazySpinner } from '../components/LazySpinner';

function Routing() {
    const fnr = useFodselsnummer();

    return (
        <Suspense fallback={<CenteredLazySpinner />}>
            <Switch key={fnr}>
                <SentryRoute
                    path={`${paths.sakerFullscreen}/:fodselsnummer/`}
                    render={(routeProps) => <SakerFullscreen fnr={routeProps.match.params.fodselsnummer} />}
                />
                <SentryRoute
                    path={`${paths.saksdokumentEgetVindu}/:fodselsnummer/`}
                    render={(routeProps) => <SaksDokumentEgetVindu fnr={routeProps.match.params.fodselsnummer} />}
                />
                <SentryRoute path={`${paths.personUri}/:fodselsnummer`} component={Personoversikt} />
                <SentryRoute component={Startbilde} />
            </Switch>
        </Suspense>
    );
}

export default Routing;
