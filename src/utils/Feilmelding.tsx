import * as React from 'react';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

export function Feilmelding({feil}: { feil: SkjemaelementFeil | undefined }) {
    if (!feil) {
        return null;
    }
    return (
        <div role={'alert'}>
            <div className={'skjemaelement__feilmelding'}>{feil.feilmelding}</div>
        </div>
    );
}
