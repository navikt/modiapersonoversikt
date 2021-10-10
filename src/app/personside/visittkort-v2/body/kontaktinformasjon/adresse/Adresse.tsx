import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import LocationPin from '../../../../../../svg/LocationPin';
import { Normaltekst } from 'nav-frontend-typografi';
import { Adresse as PersonAdresse, Person } from '../../../PersondataDomain';
import { Adresseinfo } from '../../AdresseInfo';
import Endringstekst from '../../Endringstekst';

interface Props {
    person: Person;
}

function Adresse({ person }: Props) {
    return (
        <>
            {hentBostedAdresse(person.bostedAdresse[0])}
            {hentKontaktAdresse(person.kontaktAdresse[0])}
        </>
    );
}

function formaterAdresse(personAdresse: PersonAdresse) {
    const adresse =
        personAdresse != null ? (
            <>
                <Adresseinfo adresse={personAdresse} />
                <Endringstekst sistEndret={personAdresse.sistEndret} />
            </>
        ) : (
            <Normaltekst>Ikke registrert</Normaltekst>
        );

    return adresse;
}

function hentBostedAdresse(adresse: PersonAdresse) {
    return (
        <VisittkortElement beskrivelse="Bostedsadresse" ikon={<LocationPin />}>
            {formaterAdresse(adresse)}
        </VisittkortElement>
    );
}

function hentKontaktAdresse(adresse: PersonAdresse) {
    return (
        <VisittkortElement beskrivelse="Kontaktadresse" ikon={<LocationPin />}>
            {formaterAdresse(adresse)}
        </VisittkortElement>
    );
}

export default Adresse;
