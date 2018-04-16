import * as React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import { BostatusTyper, Person } from '../../../../../models/person';

const emdash = '\u2014';
const PadLeft = styled.span`
  margin-left: 2em;
`;

const NoWrap = styled.span`
  white-space: nowrap;
`;

interface PersonProps {
    person: Person;
}

function Dødsdato({person}: PersonProps) {
    if (person.status.dødsdato) {
        const formatertDødsdato = moment(person.status.dødsdato).format('DD.MM.YYYY');
        return <>{emdash} Død {formatertDødsdato}</>;
    } else {
        return null;
    }
}

function Utvandret({person}: PersonProps) {
    if (person.status.bostatus === BostatusTyper.Utvandret) {
        return <>{emdash} Utvandret</>;
    } else {
        return null;
    }
}

function FødselsnummerLinje({person}: PersonProps) {
    return <>{person.fødselsnummer} <Dødsdato person={person}/><Utvandret person={person}/></>;
}

function Statsborgerskap({person}: PersonProps) {
    if (!person.statsborgerskap) {
        return (
            <>Ingen statsborgerskap registrert</>
        );
    }
    return (
        <>{person.statsborgerskap}</>
    );
}

function PersonStatus({person}: PersonProps) {
    return (
        <Undertekst>
            <NoWrap>
                <FødselsnummerLinje person={person}/>
                <PadLeft><Statsborgerskap person={person}/> / Gift / 2 barn (under 21)</PadLeft>
            </NoWrap>
        </Undertekst>
    );
}

export default PersonStatus;