import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { History } from 'history';

import PersonsideContainer from '../personside/PersonsideContainer';
import Startbilde from '../startbilde/Startbilde';
import Brukerprofilside from '../brukerprofil/BrukerprofilSide';

export const paths = {
    personUri: '/modiapersonoversikt/person',
    brukerprofil: '/modiapersonoversikt/brukerprofil',
    basePath: '/modiapersonoversikt',
    legacyPersonPath: '/modiabrukerdialog/person',
    legacyBrukerprofil: '#!brukerprofil'
};

function Routing(props: RouteComponentProps<{}> ) {
    return (
        <Switch location={props.location}>
            <Route path={`${paths.personUri}/:fodselsnummer/`} component={PersonsideContainer}/>
            <Route path={`${paths.brukerprofil}/:fodselsnummer/`} component={Brukerprofilside}/>
            <Route component={Startbilde}/>
        </Switch>
    );
}

export function settPersonIKontekst(history: History, fødselsnummer: string) {
    history.push(`${paths.personUri}/${fødselsnummer}`);
}

export default withRouter(Routing);
