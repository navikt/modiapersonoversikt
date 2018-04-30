import * as React from 'react';
import { Sikkerhetstiltak } from '../../../../../models/sikkerhetstiltak';
import { Person } from '../../../../../models/person';
import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import { Periode } from '../../../../../models/periode';
import VisPeriode from '../../../../../components/person/VisPeriode';

const sikkerhetsTiltakIkon = require('./sikkerhetstiltak.svg');

interface SikkerhetstiltakProps {
    person: Person;
}

function Sikkerhetstiltak({person}: SikkerhetstiltakProps) {
    if (person.sikkerhetstiltak == null) {
        return null;
    }
    return (
        <VisittkortElement beskrivelse="Sikkerhetstiltak" ikonPath={sikkerhetsTiltakIkon}>
            {tiltaksinfo(person.sikkerhetstiltak)}
        </VisittkortElement>
    );
}

function tiltaksinfo(sikkerhetstiltak: Sikkerhetstiltak) {
    return (
        <>
            {hentPeriode(sikkerhetstiltak.periode)}
            <Undertekst>{sikkerhetstiltak.sikkerhetstiltaksbeskrivelse}</Undertekst>
        </>
    );
}

function hentPeriode(periode?: Periode) {
    if (periode != null) {
        return (
            <VisPeriode periode={periode}/>
        );
    }
    return null;
}

export default Sikkerhetstiltak;
