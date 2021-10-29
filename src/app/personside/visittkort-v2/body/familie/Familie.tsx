import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import Foreldre from './Foreldre';
import { Person } from '../../PersondataDomain';
import Sivilstand from './Sivilstand';
import ListeAvBarn from './ListeAvBarn';
import { hentBarn, hentForeldre } from '../../visittkort-utils';

interface Props {
    person: Person;
}

function Familie({ person }: Props) {
    const erUnder22 = !!person.alder && person.alder <= 21;
    const skalViseForeldre = erUnder22 && hentForeldre(person.forelderBarnRelasjon).isNotEmpty();
    const harSivilstand = person.sivilstand.firstOrNull()?.sivilstandRelasjon;
    const harBarn = hentBarn(person.forelderBarnRelasjon).isNotEmpty();

    if (!skalViseForeldre && !harSivilstand && !harBarn) {
        return null;
    }

    return (
        <VisittkortGruppe tittel={'Familie'}>
            <Sivilstand sivilstandListe={person.sivilstand} />
            <ListeAvBarn relasjoner={person.forelderBarnRelasjon} />
            {erUnder22 && <Foreldre forelderBarnRelasjon={person.forelderBarnRelasjon} />}
        </VisittkortGruppe>
    );
}

export default Familie;
