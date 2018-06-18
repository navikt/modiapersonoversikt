import * as React from 'react';

import { formatterRiktigAdresse } from '../../personside/visittkort/body/kontaktinformasjon/adresse/Adresse';
import { Person } from '../../../models/person/person';

export default function FolkeregistrertAdresse({person}: {person: Person}) {
    const adresse = person.folkeregistrertAdresse ?
        formatterRiktigAdresse(person.folkeregistrertAdresse)
        : 'Ikke registrert';
    return <>{adresse}</>;
}
