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
    if (relasjon.tilPerson.alder  === undefined || relasjon.tilPerson.alder === null) {
        return null;
    } else if (relasjon.tilPerson.alder > 0) {
        return relasjon.tilPerson.alder;
    } else {
        return relasjon.tilPerson.alderMåneder + ' mnd';
    }
}

export function getAlderTekst(relasjon: Familierelasjon) {
    if (erDød(relasjon.tilPerson.personstatus)) {
        return '(Død)';
    }

    if (relasjon.tilPerson.alder === undefined || relasjon.tilPerson.alder === null) {
        return null;
    } else {
        const alder = getAlder(relasjon);
        return `(${alder})`;
    }
}

function NavnOgAlder({relasjon}: Props) {
    const navn = relasjon.tilPerson.navn ? getNavn(relasjon.tilPerson.navn) : '';
    return <>{navn} {getAlderTekst(relasjon)} </>;
}

export default NavnOgAlder;