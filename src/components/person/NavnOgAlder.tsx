import * as React from 'react';
import { erDød, Familierelasjon, getNavn } from '../../models/person/person';

interface Props {
    relasjon: Familierelasjon;
}

function getAlder(relasjon: Familierelasjon) {
    if (relasjon.tilPerson.alder === undefined || relasjon.tilPerson.alder === null) {
        return null;
    } else if (relasjon.tilPerson.alder > 0) {
        return relasjon.tilPerson.alder;
    } else {
        return relasjon.tilPerson.alderMåneder + ' mnd';
    }
}

function getAlderTekst(relasjon: Familierelasjon) {
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

function NavnOgAlder({ relasjon }: Props) {
    const navn = relasjon.tilPerson.navn ? getNavn(relasjon.tilPerson.navn) : '';
    return (
        <>
            {navn} {getAlderTekst(relasjon)}{' '}
        </>
    );
}

export default NavnOgAlder;
