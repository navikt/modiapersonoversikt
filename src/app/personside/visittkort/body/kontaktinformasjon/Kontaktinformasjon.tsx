import * as React from 'react';
import { Person } from '../../../../../models/person/person';
import { VisittkortGruppe } from '../VisittkortStyles';
import Adresse from './adresse/Adresse';
import Bankkonto from './bankkonto/Bankkonto';
import NavKontaktinformasjon from './NavKontaktinformasjon';
import Epost from './epost/Epost';
import Telefon from './telefon/Telefon';
import KontaktinformasjonDoedsbo from './doedsbo/Doedsbo';

interface Props {
    person: Person;
}

export default function Kontaktinformasjon({ person }: Props) {
    return (
        <VisittkortGruppe tittel={'Kontaktinformasjon'}>
            <KontaktinformasjonDoedsbo person={person} />
            <Adresse person={person} />
            <Epost />
            <Telefon />
            <NavKontaktinformasjon navKontaktinformasjon={person.kontaktinformasjon} />
            <Bankkonto person={person} />
        </VisittkortGruppe>
    );
}
