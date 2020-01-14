import * as React from 'react';
import { Route } from 'react-router';
import StartBildeLayout from './StartBildeLayout';
import HentOppgaveKnapp from '../personside/dialogpanel/HentOppgaveKnapp';
import SetFnrIRedux from '../PersonOppslagHandler/SetFnrIRedux';
import StartbildeDevKnapper from './StartbildeDevKnapper';
import { paths } from '../routes/routing';
import PersonSokInput from './PersonSokInput';

function Startbilde() {
    return (
        <StartBildeLayout>
            <SetFnrIRedux fødselsnummer="" />
            <Route path={`${paths.basePath}/dev`} component={StartbildeDevKnapper} />
            <HentOppgaveKnapp />
            <PersonSokInput />
        </StartBildeLayout>
    );
}

export default Startbilde;
