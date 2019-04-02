import * as React from 'react';

import Sivilstand from './Sivilstand';
import { Person } from '../../../../../models/person/person';
import { VisittkortGruppe } from '../VisittkortStyles';
import ListeAvBarn from './ListeAvBarn';
import Foreldre from './Foreldre';

interface Props {
    person: Person;
}

function Familie({ person }: Props) {
    const foreldre = person.alder <= 21 ? <Foreldre familierelasjoner={person.familierelasjoner} /> : <></>;

    return (
        <VisittkortGruppe tittel={'Familie'}>
            <Sivilstand person={person} />
            <ListeAvBarn relasjoner={person.familierelasjoner} />
            {foreldre}
        </VisittkortGruppe>
    );
}

export default Familie;
