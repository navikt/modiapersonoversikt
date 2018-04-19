import * as React from 'react';
import { Kodeverk } from '../../../../../models/kodeverk';

interface Props {
    sivilstand: Kodeverk;
}

export function Sivilstand({sivilstand}: Props) {
    return (
        <>{sivilstand.beskrivelse}</>
    );
}