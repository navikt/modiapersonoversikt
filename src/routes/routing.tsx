import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import Personside from '../components/personside/Personside';
import Startbilde from '../components/startbilde/Startbilde';

export const paths = {
    personUri : '/person'
};

function Routing(props: RouteComponentProps<{}> ) {
    return (
        <Switch location={props.location}>
            <Route path={`${paths.personUri}/:fodselsnummer/`} component={Personside}/>
            <Route component={Startbilde}/>
        </Switch>
    );
}

export default withRouter(Routing);