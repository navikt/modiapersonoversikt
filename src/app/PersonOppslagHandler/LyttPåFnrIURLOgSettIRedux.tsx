import { Route, Switch } from 'react-router';
import { paths } from '../routes/routing';
import * as React from 'react';
import SetFnrIRedux from './SetFnrIRedux';

function LyttPåFnrIURLOgSettIRedux() {
    return (
        <Switch>
            <Route
                path={`${paths.standaloneKomponenter}/:module/:fodselsnummer/`}
                render={routeProps => {
                    // Trengs for å sikre at :fodselsnummer blir satt riktig ved standalone-visning
                    return <SetFnrIRedux fnr={routeProps.match.params.fodselsnummer} />;
                }}
            />
            <Route
                path={`${paths.basePath}/:module/:fodselsnummer/`}
                render={routeProps => {
                    return <SetFnrIRedux fnr={routeProps.match.params.fodselsnummer} />;
                }}
            />
        </Switch>
    );
}

export default LyttPåFnrIURLOgSettIRedux;
