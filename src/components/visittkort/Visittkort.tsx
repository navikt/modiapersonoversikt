import * as React from 'react';
import {Person} from "../../models/person";

interface VisittkortProps {
    person: Person
}

function Visittkort({person} : VisittkortProps) {
    return (
        <div>
            <h1>{person.fornavn} {person.etternavn}</h1>
            <p>{person.fodselsnummer}</p>
        </div>
    )
}

export default Visittkort;