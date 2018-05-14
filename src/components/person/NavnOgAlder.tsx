import * as React from 'react';
import { erDød, Familierelasjon, Navn } from '../../models/person/person';

interface Props {
    relasjon: Familierelasjon;
}

function getNavn({fornavn, mellomnavn, etternavn, sammensatt}: Navn) {
    if (!fornavn && !etternavn) {
        return sammensatt || 'Ukjent navn';
    }

    let navn = [];
    if (fornavn) {
        navn.push(fornavn);
    }
    if (mellomnavn) {
        navn.push(mellomnavn);
    }
    if (etternavn) {
        navn.push(etternavn);
    }

    return navn.join(' ');
}

function NavnOgAlder({relasjon}: Props) {
    const alder = erDød(relasjon.tilPerson.personstatus) ? 'Død' : relasjon.tilPerson.alder;
    const navn = getNavn(relasjon.tilPerson.navn);
    return <>{navn} ({alder}) </>;
}

export default NavnOgAlder;