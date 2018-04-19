import * as React from 'react';
import styled from 'styled-components';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import { BostatusTyper, Person } from '../../../../../models/person';
import { formaterDato } from '../../../../../utils/dateUtils';
import { Statsborgerskap } from './Statsborgerskap';
import { Sivilstand } from './Sivilstand';
import { AntallBarn } from './Antallbarn';

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
    if (person.personstatus.dødsdato) {
        const formatertDødsdato = formaterDato(person.personstatus.dødsdato);
        return <>{emdash} Død {formatertDødsdato}</>;
    } else {
        return null;
    }
}

function Utvandret({person}: PersonProps) {
    if (person.personstatus.bostatus === BostatusTyper.Utvandret) {
        return <>{emdash} Utvandret</>;
    } else {
        return null;
    }
}

function FødselsnummerLinje({person}: PersonProps) {
    return <>{person.fødselsnummer} <Dødsdato person={person}/><Utvandret person={person}/></>;
}

function PersonStatus({person}: PersonProps) {
    const Separator = () => (<> / </>);
    return (
        <Undertekst>
            <NoWrap>
                <FødselsnummerLinje person={person}/>
                <PadLeft>
                    <Statsborgerskap statsborgerskap={person.statsborgerskap}/>
                    <Separator/>
                    <Sivilstand sivilstand={person.sivilstand}/>
                    <Separator/>
                    <AntallBarn familierelasjoner={person.familierelasjoner}/>
                </PadLeft>
            </NoWrap>
        </Undertekst>
    );
}

export default PersonStatus;