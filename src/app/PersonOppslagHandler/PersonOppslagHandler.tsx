import { Route } from 'react-router';
import { paths } from '../routes/routing';
import * as React from 'react';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from './LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import LyttPåDecoratorEventsOgSettFnrIUrl from './DecoratorListener';
import SetFnrIRedux from './SetFnrIRedux';

function LyttPåFnrIURLOgSettIRedux() {
    return (
        <Route
            path={`${paths.basePath}/:module/:fodselsnummer/`}
            render={routeProps => {
                return <SetFnrIRedux fødselsnummer={routeProps.match.params.fodselsnummer} />;
            }}
        />
    );
}

function PersonOppslagHandler() {
    return (
        <>
            <LyttPåDecoratorEventsOgSettFnrIUrl />
            <LyttPåFnrIURLOgSettIRedux />
            <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
        </>
    );
}

export default PersonOppslagHandler;
