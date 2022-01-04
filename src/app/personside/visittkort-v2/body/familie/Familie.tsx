import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import Foreldre from './Foreldre';
import { Person } from '../../PersondataDomain';
import Sivilstand from './Sivilstand';
import ListeAvBarn from './ListeAvBarn';

interface Props {
    person: Person;
}

function Familie({ person }: Props) {
    const erUnder22 = person.alder !== null && person.alder <= 21;

    return (
        <VisittkortGruppe tittel={'Familie'}>
            <Sivilstand sivilstandListe={person.sivilstand} />
            <ListeAvBarn relasjoner={person.forelderBarnRelasjon} />
            {erUnder22 && <Foreldre forelderBarnRelasjon={person.forelderBarnRelasjon} />}
        </VisittkortGruppe>
    );
}

export default Familie;
