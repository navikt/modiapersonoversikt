import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Action } from 'history';

import PersonsideContainer from '../personside/PersonsideContainer';
import Startbilde from '../startbilde/Startbilde';
import BrukerprofilContainer from '../personside/visittkort/body/brukerprofil/BrukerprofilContainer';

export const paths = {
    personUri : '/modiapersonoversikt/person',
    brukerprofil: '/modiapersonoversikt/brukerprofil'
};

function Routing(props: RouteComponentProps<{}> ) {
    return (
        <Switch location={props.location}>
            <Route path={`${paths.personUri}/:fodselsnummer/`} component={PersonsideContainer}/>
            <Route path={`${paths.brukerprofil}/:fodselsnummer/`} component={BrukerprofilContainer}/>
            <Route component={Startbilde}/>
        </Switch>
    );
}

export function settNyPersonIKontekst(dispatch: Dispatch<Action>, fødselsnummer: string) {
    dispatch(push(`${paths.personUri}/${fødselsnummer}`));
}

export function fjernPersonFraKontekst(dispatch: Dispatch<Action>) {
    dispatch(push('/modiapersonoversikt/'));
}

export default withRouter(Routing);
