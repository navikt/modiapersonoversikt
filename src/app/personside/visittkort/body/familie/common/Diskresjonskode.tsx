import * as React from 'react';
import { Kodeverk } from '../../../../../../models/kodeverk';

export function Diskresjonskode({diskresjonskode}: {diskresjonskode?: Kodeverk | null}) {
    if (!diskresjonskode) {
        return null;
    }
    return (
        <>
            {diskresjonskode ? diskresjonskode.beskrivelse : ''}
        </>
    );
}