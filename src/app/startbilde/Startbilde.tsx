import * as React from 'react';
import { Route, withRouter } from 'react-router';
import StartBildeLayout from './StartBildeLayout';
import HentOppgaveKnapp from '../personside/dialogpanel/HentOppgaveKnapp';
import SetFnrIRedux from '../PersonOppslagHandler/SetFnrIRedux';
import StartbildeDevKnapper from './StartbildeDevKnapper';
import { paths } from '../routes/routing';

function Startbilde() {
    return (
        <StartBildeLayout>
            <SetFnrIRedux fødselsnummer="" />
            <Route path={`${paths.basePath}/dev`} component={StartbildeDevKnapper} />
            <HentOppgaveKnapp />
        </StartBildeLayout>
    );
}

export default withRouter(Startbilde);
