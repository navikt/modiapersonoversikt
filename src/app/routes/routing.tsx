import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import PersonsideContainer from '../personside/PersonsideContainer';
import Startbilde from '../startbilde/Startbilde';

export const paths = {
    personUri : '/person'
};

function Routing(props: RouteComponentProps<{}> ) {
    return (
        <Switch location={props.location}>
            <Route path={`${paths.personUri}/:fodselsnummer/`} component={PersonsideContainer}/>
            <Route component={Startbilde}/>
        </Switch>
    );
}

export default withRouter(Routing);