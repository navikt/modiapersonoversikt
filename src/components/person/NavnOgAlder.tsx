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

function getAlder(relasjon: Familierelasjon) {
    if (relasjon.tilPerson.alder > 0) {
        return relasjon.tilPerson.alder;
    } else {
        return relasjon.tilPerson.alderMåneder + ' mnd';
    }
}

function NavnOgAlder({relasjon}: Props) {
    const alder = erDød(relasjon.tilPerson.personstatus) ? 'Død' : getAlder(relasjon);
    const navn = relasjon.tilPerson.navn ? getNavn(relasjon.tilPerson.navn) : '';
    return <>{navn} ({alder}) </>;
}

export default NavnOgAlder;