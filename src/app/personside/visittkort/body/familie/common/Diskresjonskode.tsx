import * as React from 'react';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import { lagDiskresjonskodeEtikett } from '../../../header/Etiketter';
import { Kodeverk } from '../../../../../../models/kodeverk';

export function Diskresjonskode({diskresjonskode}: {diskresjonskode?: Kodeverk | null}) {
    if (!diskresjonskode) {
        return null;
    }
    return (
        <Undertekst>
            {diskresjonskode ? lagDiskresjonskodeEtikett(diskresjonskode) : ''}
        </Undertekst>
    );
}