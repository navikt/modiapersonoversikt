import * as React from 'react';
import { Kodeverk } from '../../../../../../models/kodeverk';
import { Normaltekst } from 'nav-frontend-typografi';
import { Diskresjonskoder } from '../../../../../../konstanter';

export function Diskresjonskode({diskresjonskode}: {diskresjonskode?: Kodeverk | null}) {

    const diskresjonskoderSomSkalVises =
        [
            Diskresjonskoder.FORTROLIG_ADRESSE,
            Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE
        ];

    if (diskresjonskode && diskresjonskoderSomSkalVises.includes(diskresjonskode.kodeRef)) {
        return (
            <Normaltekst>
                {diskresjonskode.beskrivelse}
            </Normaltekst>
        );
    }

    return null;
}
