import * as React from 'react';
import { Kodeverk } from '../../../../../models/kodeverk';

interface Props {
    sivilstand: Kodeverk;
}

export function Sivilstand({ sivilstand }: Props) {
    return (
        <li title="Sivilstand">
            {sivilstand.beskrivelse}
        </li>
    );
}