import * as React from 'react';
import { Person } from '../../PersondataDomain';
import { VisittkortGruppe } from '../VisittkortStyles';
// import Bankkonto from './bankkonto/Bankkonto';
import KontaktinformasjonDodsbo from './dodsbo/Dodsbo';
import Adresse from './adresse/Adresse';
// import Epost from './epost/Epost';
// import Telefon from './telefon/Telefon';

interface Props {
    person: Person;
}

export default function Kontaktinformasjon({ person }: Props) {
    return (
        <VisittkortGruppe tittel={'Kontaktinformasjon'}>
            <KontaktinformasjonDodsbo person={person} />
            <Adresse person={person} />
            {/* <Epost person={person} />
            <Telefon person={person} />
            <Bankkonto person={person} /> */}
        </VisittkortGruppe>
    );
}
