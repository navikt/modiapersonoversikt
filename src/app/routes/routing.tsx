import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { History } from 'history';

import PersonsideContainer from '../personside/PersonsideContainer';
import Startbilde from '../startbilde/Startbilde';
import Brukerprofilside from '../brukerprofil/BrukerprofilSide';
import SaksoversiktMicroFrontend from '../personside/infotabs/saksoversikt/SaksoversiktMicroFrontend';

export const paths = {
    personUri: '/modiapersonoversikt/person',
    saksoversikt: '/modiapersonoversikt/saker',
    brukerprofil: '/modiapersonoversikt/brukerprofil',
    basePath: '/modiapersonoversikt',
    legacyPersonPath: '/modiabrukerdialog/person',
    legacyBrukerprofil: '#!brukerprofil'
};

interface RouterProps {
    fodselsnummer: string;
}

type Props = RouteComponentProps<RouterProps>;

function Routing(props: Props) {
    return (
        <Switch location={props.location}>
            <Route path={`${paths.personUri}/:fodselsnummer/`} component={PersonsideContainer} />
            <Route
                path={`${paths.saksoversikt}/:fodselsnummer/`}
                render={routeProps => (
                    <SaksoversiktMicroFrontend
                        fødselsnummer={routeProps.match.params.fodselsnummer}
                        queryParamString={routeProps.location.search}
                    />
                )}
            />
            <Route path={`${paths.brukerprofil}/:fodselsnummer/`} component={Brukerprofilside} />
            <Route component={Startbilde} />
        </Switch>
    );
}

export function setNyBrukerIPath(history: History, fødselsnummer: string) {
    history.push(`${paths.personUri}/${fødselsnummer}`);
}

export function fjernBrukerFraPath(history: History) {
    history.push(`${paths.basePath}`);
}

export default withRouter(Routing);
