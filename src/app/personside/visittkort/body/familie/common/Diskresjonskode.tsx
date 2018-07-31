import * as React from 'react';

import { lagDiskresjonskodeEtikett } from '../../../header/Etiketter';
import { Kodeverk } from '../../../../../../models/kodeverk';

export function Diskresjonskode({diskresjonskode}: {diskresjonskode?: Kodeverk | null}) {
    if (!diskresjonskode) {
        return null;
    }
    return (
        <>
            {diskresjonskode ? lagDiskresjonskodeEtikett(diskresjonskode) : ''}
        </>
    );
}