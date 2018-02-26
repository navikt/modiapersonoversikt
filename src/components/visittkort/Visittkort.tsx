import * as React from 'react';
import { Person } from "../../models/person";
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';

interface VisittkortProps {
    person: Person;
}

function Visittkort({person}: VisittkortProps) {
    return (
        <div>
            <Innholdstittel>{person.fornavn} {person.etternavn}</Innholdstittel>
            <p>{person.fodselsnummer}</p>
        </div>
    );
}

export default Visittkort;