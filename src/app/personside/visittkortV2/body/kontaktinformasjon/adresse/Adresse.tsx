import { Person } from '../../../../../../models/personPdl/person';
import VisittkortElement from '../../VisittkortElement';
import LocationPin from '../../../../../../svg/LocationPin';
import * as React from 'react';

interface AdresseProps {
    person: Person;
}

function Adresse({ person }: AdresseProps) {
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
            {person.bostedAdresse}
        </VisittkortElement>
    );
}

function hentKontakAdresse(person: Person) {
    return (
        <VisittkortElement beskrivelse="Kontaktadresse" ikon={<LocationPin />}>
            {person.kontaktAdresse}
        </VisittkortElement>
    );
}

export default Adresse;
