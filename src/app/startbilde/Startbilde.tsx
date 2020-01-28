import * as React from 'react';
import StartBildeLayout from './StartBildeLayout';
import HentOppgaveKnapp from '../personside/dialogpanel/HentOppgaveKnapp';
import SetFnrIRedux from '../PersonOppslagHandler/SetFnrIRedux';
import StartbildeDevKnapper from './StartbildeDevKnapper';
import PersonSokInput from './PersonSokInput';

function Startbilde() {
    return (
        <StartBildeLayout>
            <SetFnrIRedux fødselsnummer="" />
            <HentOppgaveKnapp />
            <PersonSokInput />
            <StartbildeDevKnapper />
        </StartBildeLayout>
    );
}

export default Startbilde;
