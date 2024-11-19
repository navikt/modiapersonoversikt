import { Suspense } from 'react';
import { Switch } from 'react-router';
import { SentryRoute } from '../sentry-route';
import { paths } from './routes/routing';
import SaksDokumentEgetVindu from './personside/infotabs/saksoversikt/SaksDokumentIEgetVindu';
import Personoversikt from './personside/Personoversikt';
import Startbilde from './startbilde/Startbilde';
import { useFodselsnummer } from '../utils/customHooks';
import { CenteredLazySpinner } from '../components/LazySpinner';
import SakerFullscreenProxy from './personside/infotabs/saksoversikt/SakerFullscreenProxy';
import SetFnrIRedux from './PersonOppslagHandler/SetFnrIRedux';
import InnkrevingskravSide from './innkrevingskrav/InnkrevingskravSide';

function Routing() {
    const fnr = useFodselsnummer();

    return (
        <Suspense fallback={<CenteredLazySpinner />}>
            <Switch key={fnr}>
                <SentryRoute
                    path={`${paths.personUri}/:fodselsnummer(\\d+)`}
                    render={(routeProps) => {
                        return (
                            <SetFnrIRedux
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                                fnr={routeProps.match.params.fodselsnummer}
                                redirect={routeProps.location.pathname.replace(/\d{11}\/?/, '')}
                            />
                        );
                    }}
                />
                <SentryRoute path={`${paths.sakerFullscreen}/`} render={() => <SakerFullscreenProxy fnr={fnr} />} />
                <SentryRoute
                    path={`${paths.saksdokumentEgetVindu}/`}
                    render={() => <SaksDokumentEgetVindu fnr={fnr} />}
                />
                <SentryRoute path={`${paths.personUri}/`} render={() => <Personoversikt fnr={fnr} />} />
                <SentryRoute path={`${paths.innkrevingskrav}/`} render={() => <InnkrevingskravSide />} />
                <SentryRoute component={Startbilde} />
            </Switch>
        </Suspense>
    );
}

export default Routing;
