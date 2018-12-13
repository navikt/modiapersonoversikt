import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { History } from 'history';

import PersonsideContainer from '../personside/PersonsideContainer';
import Startbilde from '../startbilde/Startbilde';
import Brukerprofilside from '../brukerprofil/BrukerprofilSide';
import SaksoversiktStandalone from '../personside/infotabs/saksoversikt/SaksoversiktStandalone';

export const paths = {
    personUri: '/modiapersonoversikt/person',
    saksoversikt: '/modiapersonoversikt/saksoversikt',
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
            <Route path={`${paths.personUri}/:fodselsnummer/`} component={PersonsideContainer}/>
            <Route
                path={`${paths.saksoversikt}/:fodselsnummer/`}
                render={routeProps => <SaksoversiktStandalone fødselsnummer={routeProps.match.params.fodselsnummer}/>}
            />
            <Route
                path={`${paths.brukerprofil}/:fodselsnummer/`}
                render={routeProps => <Brukerprofilside fødselsnummer={routeProps.match.params.fodselsnummer}/>}
            />
            <Route component={Startbilde}/>
        </Switch>
    );
}

export function settPersonIKontekst(history: History, fødselsnummer: string) {
    history.push(`${paths.personUri}/${fødselsnummer}`);
}

export default withRouter(Routing);
