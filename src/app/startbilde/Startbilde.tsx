import * as React from 'react';
import StartBildeLayout from './StartBildeLayout';
import HentOppgaveKnapp from '../personside/dialogpanel/HentOppgaveKnapp';
import SetFnrIRedux from '../PersonOppslagHandler/SetFnrIRedux';
import PersonSokInput from './PersonSokInput';
import StartbildeInnstillinger from '../innstillinger/startbilde-innstillinger';
import { useFetchFeatureTogglesOnNewFnr } from '../PersonOppslagHandler/FetchFeatureToggles';

function Startbilde() {
    useFetchFeatureTogglesOnNewFnr();

    return (
        <StartBildeLayout>
            <SetFnrIRedux fnr="" />
            <HentOppgaveKnapp />
            <PersonSokInput />
            <StartbildeInnstillinger />
        </StartBildeLayout>
    );
}

export default Startbilde;
