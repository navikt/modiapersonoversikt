import * as React from 'react';
export function Feilmelding({ feil }: { feil: string | undefined }) {
    if (!feil) {
        return null;
    }
    return (
        <div role={'alert'}>
            <div className={'skjemaelement__feilmelding'}>{feil}</div>
        </div>
    );
}
