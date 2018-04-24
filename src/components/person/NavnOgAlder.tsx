import * as React from 'react';
import { erDød, Familierelasjon } from '../../models/person';

interface Props {
    relasjon: Familierelasjon;
}

function NavnOgAlder({relasjon}: Props) {
    const alder = erDød(relasjon.tilPerson.personstatus) ? 'Død' : relasjon.tilPerson.alder;
    return <>{relasjon.tilPerson.navn.sammensatt} ({alder}) </>;
}

export default NavnOgAlder;