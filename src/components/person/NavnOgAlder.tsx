import * as React from 'react';
import { erDød, Familierelasjon, Navn } from '../../models/person/person';

interface Props {
    relasjon: Familierelasjon;
}

function getNavn(navn: Navn) {
    return navn.fornavn + ' ' + (navn.mellomnavn ? navn.mellomnavn + ' ' : '') + navn.etternavn;
}

function NavnOgAlder({relasjon}: Props) {
    const alder = erDød(relasjon.tilPerson.personstatus) ? 'Død' : relasjon.tilPerson.alder;
    const navn = getNavn(relasjon.tilPerson.navn);
    return <>{navn} ({alder}) </>;
}

export default NavnOgAlder;