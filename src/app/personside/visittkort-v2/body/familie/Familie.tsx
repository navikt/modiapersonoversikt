import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import Foreldre from './Foreldre';
import { Person } from '../../PersondataDomain';
import Sivilstand from './Sivilstand';
import ListeAvBarn from './ListeAvBarn';

interface Props {
    feilendeSystem: boolean;
    person: Person;
}

function Familie({ feilendeSystem, person }: Props) {
    const erUnder22 = person.alder !== null && person.alder <= 21;

    return (
        <VisittkortGruppe tittel={'Familie'}>
            <Sivilstand feilendeSystem={feilendeSystem} sivilstandListe={person.sivilstand} />
            <ListeAvBarn feilendeSystem={feilendeSystem} relasjoner={person.forelderBarnRelasjon} />
            {erUnder22 && (
                <Foreldre feilendeSystem={feilendeSystem} forelderBarnRelasjon={person.forelderBarnRelasjon} />
            )}
        </VisittkortGruppe>
    );
}

export default Familie;
