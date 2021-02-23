import * as React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import { Verge } from '../../../../../models/vergemal/vergemal';
import { vergesakstypeMapper } from './VergemalMapper';

export function Vergesakstype({ verger }: { verger: Verge[] }) {
    const alleVergesakstyper = verger.map(verge =>
        verge.vergesakstype ? vergesakstypeMapper[verge.vergesakstype] : verge.vergesakstype
    );
    const unikeVergssakstyper = Array.from(new Set(alleVergesakstyper)).join(', ');
    return <Normaltekst>{unikeVergssakstyper}</Normaltekst>;
}
