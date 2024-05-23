import * as React from 'react';
import StartBildeLayout from './StartBildeLayout';
import PersonSokInput from './PersonSokInput';
import StartbildeInnstillinger from '../innstillinger/startbilde-innstillinger';

function Startbilde() {
    return (
        <StartBildeLayout>
            <PersonSokInput />
            <StartbildeInnstillinger />
        </StartBildeLayout>
    );
}

export default Startbilde;
