import * as React from 'react';

import Sivilstand from './Sivilstand';
import { Person } from '../../../../../models/person';
import { InfoGruppe } from '../styledComponents';
import Barn from './Barn';

interface Props {
    person: Person;
}

function Familie({person}: Props) {
    return (
        <InfoGruppe tittel={'Familie'}>
            <Sivilstand person={person}/>
            <Barn/>
        </InfoGruppe>
    );
}

export default Familie;