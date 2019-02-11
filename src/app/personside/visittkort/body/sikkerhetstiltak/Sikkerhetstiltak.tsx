import * as React from 'react';
import { Sikkerhetstiltak as SikkerhetstiltakInterface } from '../../../../../models/sikkerhetstiltak';
import { Person } from '../../../../../models/person/person';
import { Normaltekst } from 'nav-frontend-typografi';
import { Periode } from '../../../../../models/periode';
import VisPeriode from '../../../../../components/person/VisPeriode';
import SikkerhetsTiltakIkon from '../../../../../svg/Sikkerhetstiltak';
import { VisittkortGruppe } from '../VisittkortStyles';
import VisittkortElement from '../VisittkortElement';

interface SikkerhetstiltakProps {
    person: Person;
}

function Sikkerhetstiltak({ person }: SikkerhetstiltakProps) {
    if (person.sikkerhetstiltak == null) {
        return null;
    }
    return (
        <VisittkortGruppe
            tittel="Sikkerhetstiltak"
            ikon={<SikkerhetsTiltakIkon/>}
        >
            {tiltaksinfo(person.sikkerhetstiltak)}
        </VisittkortGruppe>
    );
}

function tiltaksinfo(sikkerhetstiltak: SikkerhetstiltakInterface) {
    return (
        <VisittkortElement>
            {hentPeriode(sikkerhetstiltak.periode)}
            <Normaltekst>{sikkerhetstiltak.sikkerhetstiltaksbeskrivelse}</Normaltekst>
        </VisittkortElement>
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
