import * as React from 'react';
import { Person } from '../../models/person';
import Innholdstittel from 'nav-frontend-typografi';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

interface VisittkortProps {
    person: Person;
}

function Tittel({person}: VisittkortProps) {
    return (
        <div>
            <Innholdstittel type={'innholdstittel'}>{person.fornavn} {person.etternavn}</Innholdstittel>
            <p>{person.fodselsnummer}</p>
        </div>
    );
}

function Visittkort({person}: VisittkortProps) {
    return (
        <div className="visittkort">
            <EkspanderbartpanelBase apen={true} heading={<Tittel person={person}/>} ariaTittel="Visittkort">
                <p>Mer personinformasjon her..</p>
            </EkspanderbartpanelBase>
        </div>
    );
}

export default Visittkort;