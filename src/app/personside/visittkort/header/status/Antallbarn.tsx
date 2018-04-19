import * as React from 'react';
import { Familierelasjon, getBarnUnder21 } from '../../../../../models/person';

interface Props {
    familierelasjoner: Familierelasjon[];
}

export function AntallBarn({familierelasjoner}: Props) {
    const barn = getBarnUnder21(familierelasjoner);
    if (barn.length === 0 ) {
        return <>Ingen barn under 21 år </>;
    }

    return (
        <> {barn.length} barn (under 21)</>
    );
}