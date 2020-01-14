import { Route, Switch } from 'react-router';
import { paths } from './routes/routing';
import StandAloneKomponenter from '../components/standalone/StandAloneKomponenter';
import SakerFullscreen from './personside/infotabs/saksoversikt/SakerFullscreen';
import SaksDokumentEgetVindu from './personside/infotabs/saksoversikt/SaksDokumentIEgetVindu';
import Personoversikt from './personside/Personoversikt';
import Startbilde from './startbilde/Startbilde';
import * as React from 'react';
import { useFødselsnummer } from '../utils/customHooks';

function Routing() {
    const fnr = useFødselsnummer();
    return (
        <Switch key={fnr}>
            <Route path={`${paths.standaloneKomponenter}/:component?/:fnr?`} component={StandAloneKomponenter} />
            <Route
                path={`${paths.sakerFullscreen}/:fodselsnummer/`}
                render={routeProps => <SakerFullscreen fødselsnummer={routeProps.match.params.fodselsnummer} />}
            />
            <Route
                path={`${paths.saksdokumentEgetVindu}/:fodselsnummer/`}
                render={routeProps => <SaksDokumentEgetVindu fødselsnummer={routeProps.match.params.fodselsnummer} />}
            />
            <Route path={`${paths.personUri}/:fodselsnummer`} component={Personoversikt} />
            <Route component={Startbilde} />
        </Switch>
    );
}

export default Routing;
