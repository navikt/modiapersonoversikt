import * as React from 'react';
import { Kodeverk } from '../../../../../../models/kodeverk';
import { Normaltekst } from 'nav-frontend-typografi';

export function Diskresjonskode({diskresjonskode}: {diskresjonskode?: Kodeverk | null}) {
    if (!diskresjonskode) {
        return null;
    }
    return (
        <Normaltekst>
            {diskresjonskode ? diskresjonskode.beskrivelse : ''}
        </Normaltekst>
    );
}