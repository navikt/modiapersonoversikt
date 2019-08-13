import * as React from 'react';
import { useAppState } from '../../../../utils/customHooks';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';

function FortsettDialog() {
    const traad = useAppState(state => state.oppgaver.dialogpanelTraad);
    if (!traad) {
        return <AlertStripeInfo>Ingen tråd er valgt</AlertStripeInfo>;
    }
    return (
        <div>
            <Undertittel>Fortsett dialog</Undertittel>
            {traad.traadId}
        </div>
    );
}

export default FortsettDialog;
