import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { formaterDato } from '../../../../../utils/string-utils';
import { type Person, PersonStatus as Status } from '../../PersondataDomain';
import { AntallBarn } from './AntallBarn';
import CopyToClipboard from './CopyToClipboard';
import { Sivilstand } from './Sivilstand';
import Statsborgerskap from './Statsborgerskap';

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

interface Props {
    person: Person;
}

function Fodselsnummer({ person }: Props) {
    return (
        <span title="Fødselsnummer">
            <span data-test-id="person-fnr">{person.personIdent}</span>
            <CopyToClipboard ariaLabel="Kopier fødselsnummer" stringToCopy={person.personIdent} />
        </span>
    );
}

function Dodsdato({ person }: Props) {
    const dodsdato = person.dodsdato.firstOrNull();
    if (dodsdato) {
        const formatertDodsdato = formaterDato(dodsdato.dodsdato);
        return <span>Død {formatertDodsdato}</span>;
    }
    return null;
}

function Utvandret({ person }: Props) {
    if (person.personstatus.firstOrNull()?.kode === Status.UTFLYTTET) {
        return <span>Utvandret</span>;
    }
    return null;
}

function PersonStatus({ person }: Props) {
    return (
        <Normaltekst tag="span">
            <Fodselsnummerlinje>
                <Fodselsnummer person={person} />
                <Dodsdato person={person} />
                <Utvandret person={person} />
            </Fodselsnummerlinje>
            <PersonStatusListe>
                <Statsborgerskap person={person} />
                <Sivilstand person={person} />
                <AntallBarn forelderBarnRelasjon={person.forelderBarnRelasjon} />
            </PersonStatusListe>
        </Normaltekst>
    );
}

export default PersonStatus;
