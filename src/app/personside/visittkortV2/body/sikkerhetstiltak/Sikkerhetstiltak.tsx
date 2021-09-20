import * as React from 'react';
import { Person } from '../../../../../models/personPdl/person';
import { Sikkerhetstiltak } from '../../../../../models/personPdl/sikkerhetstiltak';
import { VisittkortGruppe } from '../VisittkortStyles';
import SikkerhetsTiltakIkon from '../../../../../svg/Sikkerhetstiltak';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';

interface SikkerhetstiltakProps {
    person: Person;
}

function Sikkerhetstiltak({ person }: SikkerhetstiltakProps) {
    if (person.sikkerhetstiltak.length === 0) {
        return null;
    }

    const sikkerhetstiltakListe = person.sikkerhetstiltak.map(sikkerhetstiltak => {
        Tiltaksinfo(sikkerhetstiltak);
    });

    return (
        <VisittkortGruppe tittel="Sikkerhetstiltak" ikon={<SikkerhetsTiltakIkon />}>
            {sikkerhetstiltakListe}
        </VisittkortGruppe>
    );
}

function Tiltaksinfo(sikkerhetstiltak: Sikkerhetstiltak) {
    return (
        <VisittkortElement>
            `${sikkerhetstiltak.gyldigFraOgMed} ${sikkerhetstiltak.gyldigTilOgMed}`
            <Normaltekst>{sikkerhetstiltak.type}</Normaltekst>
        </VisittkortElement>
    );
}

export default Sikkerhetstiltak;
