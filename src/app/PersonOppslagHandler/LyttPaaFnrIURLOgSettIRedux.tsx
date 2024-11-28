import { Switch } from 'react-router';
import { SentryRoute } from '../../sentry-route';
import { paths } from '../routes/routing';
import SetFnrIRedux from './SetFnrIRedux';

function LyttPaaFnrIURLOgSettIRedux() {
    return (
        <Switch>
            <SentryRoute
                path={`${paths.standaloneKomponenter}/:module/:fodselsnummer(\\d+)/`}
                render={(routeProps) => {
                    // Trengs for å sikre at :fodselsnummer blir satt riktig ved standalone-visning
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    return <SetFnrIRedux fnr={routeProps.match.params.fodselsnummer} />;
                }}
            />
            <SentryRoute
                path={`${paths.basePath}/:module/:fodselsnummer(\\d+)/`}
                render={(routeProps) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    return <SetFnrIRedux fnr={routeProps.match.params.fodselsnummer} />;
                }}
            />
        </Switch>
    );
}

export default LyttPaaFnrIURLOgSettIRedux;
