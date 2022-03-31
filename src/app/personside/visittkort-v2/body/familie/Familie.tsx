import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import Foreldre from './Foreldre';
import { Person } from '../../PersondataDomain';
import Sivilstand from './Sivilstand';
import ListeAvBarn from './ListeAvBarn';

interface Props {
    harFeilendeSystem: boolean;
    person: Person;
}

function Familie({ harFeilendeSystem, person }: Props) {
    const erUnder22 = person.alder !== null && person.alder <= 21;

    return (
        <VisittkortGruppe tittel={'Familie'}>
            <Sivilstand harFeilendeSystem={harFeilendeSystem} sivilstandListe={person.sivilstand} />
            <ListeAvBarn harFeilendeSystem={harFeilendeSystem} relasjoner={person.forelderBarnRelasjon} />
            {erUnder22 && (
                <Foreldre harFeilendeSystem={harFeilendeSystem} forelderBarnRelasjon={person.forelderBarnRelasjon} />
            )}
        </VisittkortGruppe>
    );
}

export default Familie;
