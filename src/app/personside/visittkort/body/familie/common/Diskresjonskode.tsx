import * as React from 'react';
import { Kodeverk } from '../../../../../../models/kodeverk';
import { Normaltekst } from 'nav-frontend-typografi';

export const Diskresjonskoder = {
    STRENGT_FORTROLIG_ADRESSE: 'SPSF',
    FORTROLIG_ADRESSE: 'SPFO'
};

export function Diskresjonskode({ diskresjonskode }: { diskresjonskode?: Kodeverk | null }) {
    const diskresjonskoderSomSkalVises = [
        Diskresjonskoder.FORTROLIG_ADRESSE,
        Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE
    ];

    if (diskresjonskode && diskresjonskoderSomSkalVises.includes(diskresjonskode.kodeRef)) {
        return <Normaltekst>{diskresjonskode.beskrivelse}</Normaltekst>;
    }

    return null;
}
