import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import Personside from './components/personside/Personside';
import Startbilde from './components/startbilde/Startbilde';

function Routing(props: RouteComponentProps<{}> ) {
    return (
        <Switch location={props.location}>
            <Route path="/person/:fodselsnummer/" component={Personside}/>
            <Route component={Startbilde}/>
        </Switch>
    );
}

export default withRouter(Routing);