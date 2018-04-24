import * as React from 'react';
import { Sivilstand } from '../../../../../models/person';

interface Props {
    sivilstand: Sivilstand;
}

export function Sivilstand({ sivilstand }: Props) {
    return (
        <li title="Sivilstand">
            {sivilstand.beskrivelse}
        </li>
    );
}