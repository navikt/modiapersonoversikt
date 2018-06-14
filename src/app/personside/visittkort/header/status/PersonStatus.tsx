import * as React from 'react';
import styled from 'styled-components';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import { BostatusTyper, Person } from '../../../../../models/person/person';
import { formaterDato } from '../../../../../utils/dateUtils';
import Statsborgerskap from './Statsborgerskap';
import { Sivilstand } from './Sivilstand';
import { AntallBarn } from './Antallbarn';
import { EMDASH } from '../../../../../utils/string-utils';

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
    margin: 0 0.2em;
  }
`;

const Luft = styled.span`
  margin-right: 1em;
`;

interface PersonProps {
    person: Person;
}

function Dødsdato({ person }: PersonProps) {
    if (person.personstatus.dødsdato) {
        const formatertDødsdato = formaterDato(person.personstatus.dødsdato);
        return <>{EMDASH} Død {formatertDødsdato}</>;
    } else {
        return null;
    }
}

function Utvandret({ person }: PersonProps) {
    if (person.personstatus.bostatus === BostatusTyper.Utvandret) {
        return <>{EMDASH} Utvandret</>;
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
            <Luft>
                <FødselsnummerLinje person={person}/>
            </Luft>
            <PersonStatusListe>
                <Statsborgerskap statsborgerskap={person.statsborgerskap}/>
                <Sivilstand sivilstand={person.sivilstand} kjønn={person.kjønn}/>
                <AntallBarn familierelasjoner={person.familierelasjoner}/>
            </PersonStatusListe>
        </Undertekst>
    );
}

export default PersonStatus;
