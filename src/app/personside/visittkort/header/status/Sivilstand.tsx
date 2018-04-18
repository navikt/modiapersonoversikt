import * as React from 'react';
import { Person } from '../../../../../models/person';

interface Props {
    person: Person;
}

export function Sivilstand({person}: Props) {
    return (
        <>{person.sivilstand.beskrivelse} / 2 barn (under 21)</>
    );
}