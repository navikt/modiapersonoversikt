import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { paths } from './routes/routing';
import SakerFullscreen from './personside/infotabs/saksoversikt/SakerFullscreen';
import SaksDokumentEgetVindu from './personside/infotabs/saksoversikt/SaksDokumentIEgetVindu';
import Personoversikt from './personside/Personoversikt';
import Startbilde from './startbilde/Startbilde';
import { useFodselsnummer, useTriggerHotjarForLokalKontor } from '../utils/customHooks';
import { CenteredLazySpinner } from '../components/LazySpinner';

const StandAloneKomponenter = lazy(() =>
    import(/* webpackChunkName: "standalonekomponenter" */ '../components/standalone/StandAloneKomponenter')
);

function Routing() {
    const fnr = useFodselsnummer();
    useTriggerHotjarForLokalKontor();

    return (
        <Suspense fallback={<CenteredLazySpinner />}>
            <Switch key={fnr}>
                <Route path={`${paths.standaloneKomponenter}/:component?/:fnr?`} component={StandAloneKomponenter} />
                <Route
                    path={`${paths.sakerFullscreen}/:fodselsnummer/`}
                    render={routeProps => <SakerFullscreen fnr={routeProps.match.params.fodselsnummer} />}
                />
                <Route
                    path={`${paths.saksdokumentEgetVindu}/:fodselsnummer/`}
                    render={routeProps => <SaksDokumentEgetVindu fnr={routeProps.match.params.fodselsnummer} />}
                />
                <Route path={`${paths.personUri}/:fodselsnummer`} component={Personoversikt} />
                <Route component={Startbilde} />
            </Switch>
        </Suspense>
    );
}

export default Routing;
