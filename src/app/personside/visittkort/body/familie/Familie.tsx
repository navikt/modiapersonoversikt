import * as React from 'react';

import Sivilstand from './Sivilstand';
import { Person } from '../../../../../models/person';
import { InfoGruppe } from '../styledComponents';
import ListeAvBarn from './ListeAvBarn';

interface Props {
    person: Person;
}

function Familie({person}: Props) {
    return (
        <InfoGruppe tittel={'Familie'}>
            <Sivilstand person={person}/>
            <ListeAvBarn relasjoner={person.familierelasjoner}/>
        </InfoGruppe>
    );
}

export default Familie;