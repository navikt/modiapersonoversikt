import * as React from 'react';
import { Verge } from '../../../../../models/personPdl/verge';
import { vergesakstypeMapper } from './VergemalMapper';
import { Normaltekst } from 'nav-frontend-typografi';

export default function Vergesakstype({ verger }: { verger: Verge[] }) {
    const alleVergesakstyper = verger.map(
        verge => vergesakstypeMapper[verge.vergesakstype ?? 'undefined'] ?? verge.vergesakstype
    );
    const unikeVergesakstyper = Array.from(new Set(alleVergesakstyper)).join(', ');
    return <Normaltekst>{unikeVergesakstyper}</Normaltekst>;
}
