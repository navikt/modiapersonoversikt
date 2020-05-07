import * as React from 'react';
import StartBildeLayout from './StartBildeLayout';
import HentOppgaveKnapp from '../personside/dialogpanel/HentOppgaveKnapp';
import SetFnrIRedux from '../PersonOppslagHandler/SetFnrIRedux';
import StartbildeDevKnapper from './StartbildeDevKnapper';
import PersonSokInput from './PersonSokInput';
import StartbildeInnstillinger from '../innstillinger/startbilde-innstillinger';
import { useFetchFeatureTogglesOnNewFnr } from '../PersonOppslagHandler/FetchFeatureToggles';

function Startbilde() {
    useFetchFeatureTogglesOnNewFnr();
    return (
        <StartBildeLayout>
            <SetFnrIRedux fødselsnummer="" />
            <HentOppgaveKnapp />
            <PersonSokInput />
            <StartbildeInnstillinger />
            <StartbildeDevKnapper />
        </StartBildeLayout>
    );
}

export default Startbilde;
