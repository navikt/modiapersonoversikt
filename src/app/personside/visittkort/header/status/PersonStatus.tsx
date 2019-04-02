import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';

import { BostatusTyper, Person } from '../../../../../models/person/person';
import { formaterDato } from '../../../../../utils/stringFormatting';
import Statsborgerskap from './Statsborgerskap';
import { Sivilstand } from './Sivilstand';
import { AntallBarn } from './Antallbarn';

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

const Fødselsnummerlinje = styled.span`
    margin-right: 1em;
    > *:not(:first-child) {
        &::before {
            content: '\u2013';
            margin: 0 0.5rem;
        }
    }
`;

interface PersonProps {
    person: Person;
}

function Dødsdato({ person }: PersonProps) {
    if (person.personstatus.dødsdato) {
        const formatertDødsdato = formaterDato(person.personstatus.dødsdato);
        return <span>Død {formatertDødsdato}</span>;
    } else {
        return null;
    }
}

function Utvandret({ person }: PersonProps) {
    if (person.personstatus.bostatus && person.personstatus.bostatus.kodeRef === BostatusTyper.Utvandret) {
        return <span>Utvandret</span>;
    } else {
        return null;
    }
}

function Fødselsnummer({ person }: PersonProps) {
    return <span title="Fødselsnummer">{person.fødselsnummer}</span>;
}

function PersonStatus({ person }: PersonProps) {
    return (
        <Normaltekst tag="span">
            <Fødselsnummerlinje>
                <Fødselsnummer person={person} />
                <Dødsdato person={person} />
                <Utvandret person={person} />
            </Fødselsnummerlinje>
            <PersonStatusListe>
                <Statsborgerskap statsborgerskap={person.statsborgerskap && person.statsborgerskap.beskrivelse} />
                <Sivilstand sivilstand={person.sivilstand} kjønn={person.kjønn} />
                <AntallBarn familierelasjoner={person.familierelasjoner} />
            </PersonStatusListe>
        </Normaltekst>
    );
}

export default PersonStatus;
