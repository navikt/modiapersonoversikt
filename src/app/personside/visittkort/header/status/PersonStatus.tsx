import * as React from 'react';
import styled from 'styled-components';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import { BostatusTyper, Person } from '../../../../../models/person/person';
import { formaterDato } from '../../../../../utils/dateUtils';
import Statsborgerskap from './Statsborgerskap';
import { Sivilstand } from './Sivilstand';
import { AntallBarn } from './Antallbarn';

const emdash = '\u2014';

const PersonStatusListe = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-flex;
  li {
    white-space: nowrap;
  }
  li:not(:last-child):after {
    content: '/';
    margin: 0 0.5em;
  }
`;

const Luft = styled.span`
  margin: 0 1em;
`;

interface PersonProps {
    person: Person;
}

function Dødsdato({ person }: PersonProps) {
    if (person.personstatus.dødsdato) {
        const formatertDødsdato = formaterDato(person.personstatus.dødsdato);
        return <>{emdash} Død {formatertDødsdato}</>;
    } else {
        return null;
    }
}

function Utvandret({ person }: PersonProps) {
    if (person.personstatus.bostatus === BostatusTyper.Utvandret) {
        return <>{emdash} Utvandret</>;
    } else {
        return null;
    }
}

function FødselsnummerLinje({ person }: PersonProps) {
    return (
        <span title="Fødselsnummer">
            {person.fødselsnummer} <Dødsdato person={person}/><Utvandret person={person}/>
        </span>
    );
}

function PersonStatus({ person }: PersonProps) {
    return (
        <Undertekst tag="span">
            <FødselsnummerLinje person={person}/>
            <Luft/>
            <PersonStatusListe>
                <Statsborgerskap statsborgerskap={person.statsborgerskap}/>
                <Sivilstand sivilstand={person.sivilstand} kjønn={person.kjønn}/>
                <AntallBarn familierelasjoner={person.familierelasjoner}/>
            </PersonStatusListe>
        </Undertekst>
    );
}

export default PersonStatus;
