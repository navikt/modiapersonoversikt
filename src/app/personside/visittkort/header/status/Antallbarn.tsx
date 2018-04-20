import * as React from 'react';
import { Familierelasjon, getBarnUnder21 } from '../../../../../models/person';

interface Props {
    familierelasjoner: Familierelasjon[];
}

export function AntallBarn({ familierelasjoner }: Props) {
    const barn = getBarnUnder21(familierelasjoner);
    if (barn.length === 0) {
        return (
            <li title="Barn under 21 år">
                Ingen barn under 21 år
            </li>
        );
    }

    return (
        <li title="Barn under 21 år">
            {barn.length} barn (under 21)
        </li>
    );
}