import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { AlertStyling } from '../OppgaveSkjema';

interface Props {
    lukkPanel: VoidFunction;
}

function OppgaveSkjemaErBehandlet({ lukkPanel }: Props) {
    return (
        <AlertStyling>
            <AlertStripeInfo>Kan ikke opprette oppgave på denne tråden</AlertStripeInfo>
            <Hovedknapp autoFocus={true} onClick={lukkPanel}>
                Lukk
            </Hovedknapp>
        </AlertStyling>
    );
}

export default OppgaveSkjemaErBehandlet;
