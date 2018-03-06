import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import PersonPage from './components/person/PersonPage';
import Startbilde from './components/startbilde/Startbilde';

function Routing(props: RouteComponentProps<{}> ) {
    return (
        <Switch location={props.location}>
            <Route path="/person/:fodselsnummer/" component={PersonPage}/>
            <Route component={Startbilde}/>
        </Switch>
    );
}

export default withRouter(Routing);