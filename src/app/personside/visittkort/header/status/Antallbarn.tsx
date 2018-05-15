import * as React from 'react';
import { Familierelasjon, getBarn, getBarnUnder21 } from '../../../../../models/person/person';

interface Props {
    familierelasjoner: Familierelasjon[];
}

export function AntallBarn({ familierelasjoner }: Props) {
    const barnUnder21 = getBarnUnder21(familierelasjoner);
    const barn = getBarn(familierelasjoner);
    if (barn.length === 0) {
        return null;
    }
    if (barnUnder21.length === 0) {
        return (
            <li title="Barn under 21 år">
                Ingen barn under 21 år
            </li>
        );
    }
    return (
        <li title="Barn under 21 år">
            {barnUnder21.length} barn under 21 år
        </li>
    );
}