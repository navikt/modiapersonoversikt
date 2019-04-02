import * as React from 'react';

import { Person } from '../../../../../models/person/person';
import { VisittkortGruppe } from '../VisittkortStyles';
import Adresse from './adresse/Adresse';
import EpostContainer from './epost/EpostContainer';
import MobiltelefonContainer from './telefon/MobiltelefonContainer';
import Bankkonto from './bankkonto/Bankkonto';
import NavKontaktinformasjon from './NavKontaktinformasjon';

interface Props {
    person: Person;
}

export default function Kontaktinformasjon({ person }: Props) {
    return (
        <VisittkortGruppe tittel={'Kontaktinformasjon'}>
            <Adresse person={person} />
            <EpostContainer />
            <MobiltelefonContainer />
            <NavKontaktinformasjon navKontaktinformasjon={person.kontaktinformasjon} />
            <Bankkonto person={person} />
        </VisittkortGruppe>
    );
}
