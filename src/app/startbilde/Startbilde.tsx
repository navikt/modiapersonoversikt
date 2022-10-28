import * as React from 'react';
import StartBildeLayout from './StartBildeLayout';
import SetFnrIRedux from '../PersonOppslagHandler/SetFnrIRedux';
import PersonSokInput from './PersonSokInput';
import StartbildeInnstillinger from '../innstillinger/startbilde-innstillinger';

function Startbilde() {
    return (
        <StartBildeLayout>
            <SetFnrIRedux fnr="" />
            <PersonSokInput />
            <StartbildeInnstillinger />
        </StartBildeLayout>
    );
}

export default Startbilde;
