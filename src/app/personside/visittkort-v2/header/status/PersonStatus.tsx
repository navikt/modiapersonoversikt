import * as React from 'react';
import styled from 'styled-components/macro';
import { Person, PersonStatus as Status } from '../../PersondataDomain';
import { Normaltekst } from 'nav-frontend-typografi';
import CopyToClipboard from './CopyToClipboard';
import { formaterDato } from '../../../../../utils/string-utils';
import Statsborgerskap from './Statsborgerskap';
import { Sivilstand } from './Sivilstand';
import { AntallBarn } from './AntallBarn';

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

const Fodselsnummerlinje = styled.span`
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

function Fodselsnummer({ person }: PersonProps) {
    return (
        <span title="Fødselsnummer">
            <span>{person.fnr}</span>
            <CopyToClipboard ariaLabel="Kopier fødselsnummer" stringToCopy={person.fnr} />
        </span>
    );
}

function Dodsdato({ person }: PersonProps) {
    if (person.dodsdato.length > 0 && person.personstatus[0].kode === Status.DOD) {
        const formatertDodsdato = formaterDato(person.dodsdato[0]);
        return <span>Død {formatertDodsdato}</span>;
    } else {
        return null;
    }
}

function Utvandret({ person }: PersonProps) {
    if (person.personstatus[0] && person.personstatus[0].kode === Status.UTFLYTTET) {
        return <span>Utvandret</span>;
    } else {
        return null;
    }
}

function PersonStatus({ person }: PersonProps) {
    return (
        <Normaltekst tag="span">
            <Fodselsnummerlinje>
                <Fodselsnummer person={person} />
                <Dodsdato person={person} />
                <Utvandret person={person} />
            </Fodselsnummerlinje>
            <PersonStatusListe>
                <Statsborgerskap statsborgerskap={person.statsborgerskap[0]} />
                <Sivilstand sivilstand={person.sivilstand[0]} kjonn={person.kjonn[0].kode} />
                <AntallBarn forelderBarnRelasjon={person.forelderBarnRelasjon} />
            </PersonStatusListe>
        </Normaltekst>
    );
}

export default PersonStatus;
