import * as React from 'react';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import { Verge } from '../../../../../models/vergemal/vergemal';

export function Vergesakstype({verger}: {verger: Verge[]}) {
    const alleVergesakstyper = verger.map(verge => verge.vergesakstype ?
        verge.vergesakstype.beskrivelse : 'Ingen vergesakstype oppgitt');
    const unikeVergssakstyper = Array.from(new Set(alleVergesakstyper)).join(', ');
    return (
        <Undertekst>{unikeVergssakstyper}</Undertekst>
    );
}
