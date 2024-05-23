import { Switch } from 'react-router';
import { SentryRoute } from '../../sentry-route';
import { paths } from '../routes/routing';
import * as React from 'react';
import SetFnrIRedux from './SetFnrIRedux';

function LyttPaaFnrIURLOgSettIRedux() {
    return (
        <Switch>
            <SentryRoute
                path={`${paths.standaloneKomponenter}/:module/:fodselsnummer(\\d+)/`}
                render={(routeProps) => {
                    // Trengs for å sikre at :fodselsnummer blir satt riktig ved standalone-visning
                    return <SetFnrIRedux fnr={routeProps.match.params.fodselsnummer} />;
                }}
            />
            <SentryRoute
                path={`${paths.basePath}/:module/:fodselsnummer(\\d+)/`}
                render={(routeProps) => {
                    return <SetFnrIRedux fnr={routeProps.match.params.fodselsnummer} />;
                }}
            />
        </Switch>
    );
}

export default LyttPaaFnrIURLOgSettIRedux;
