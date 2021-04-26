import * as React from 'react';
import { erDod, Familierelasjon } from '../../models/person/person';

interface Props {
    relasjon?: Familierelasjon;
}

function BorMedBruker({ relasjon }: Props) {
    const personErDod = relasjon && erDod(relasjon.tilPerson.personstatus);
    if (relasjon?.harSammeBosted === undefined || personErDod) {
        return null;
    } else if (relasjon.harSammeBosted) {
        return <>Bor med bruker</>;
    } else {
        return <>Bor ikke med bruker</>;
    }
}

export default BorMedBruker;
