import VisittkortElement from '../../VisittkortElement';
import LocationPin from '../../../../../../svg/LocationPin';
import * as React from 'react';
import { Adresse as PersonAdresse, Person } from '../../../PersondataDomain';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    person: Person;
}

function Adresse({ person }: Props) {
    return (
        <>
            {hentBostedAdresse(person)}
            {hentKontakAdresse(person)}
        </>
    );
}

function hentBostedAdresse(person: Person) {
    return (
        <VisittkortElement beskrivelse="Bostedsadresse" ikon={<LocationPin />}>
            {formaterAdresse(person.bostedAdresse[0])}
        </VisittkortElement>
    );
}

function hentKontakAdresse(person: Person) {
    return (
        <VisittkortElement beskrivelse="Kontaktadresse" ikon={<LocationPin />}>
            {formaterAdresse(person.kontaktAdresse[0])}
        </VisittkortElement>
    );
}

function formaterAdresse(adresse: PersonAdresse) {
    const adresselinje2 = adresse.linje2 ? <Normaltekst>{adresse.linje2}</Normaltekst> : null;
    const adresselinje3 = adresse.linje3 ? <Normaltekst>{adresse.linje3}</Normaltekst> : null;

    return (
        <div>
            <Normaltekst>{adresse.linje1}</Normaltekst>
            {adresselinje2}
            {adresselinje3}
        </div>
    );
}

export default Adresse;
