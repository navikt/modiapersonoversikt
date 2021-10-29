import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import LocationPin from '../../../../../../svg/LocationPin';
import { Normaltekst } from 'nav-frontend-typografi';
import { Adresse as PersonAdresse, Person } from '../../../PersondataDomain';
import Adresseinfo from '../../AdresseInfo';
import Endringstekst from '../../Endringstekst';

interface Props {
    person: Person;
}

function AdresseElement(props: { adresse: PersonAdresse | null; beskrivelse: string }) {
    if (!props.adresse) {
        return (
            <VisittkortElement beskrivelse={props.beskrivelse} ikon={<LocationPin />}>
                <Normaltekst>Ikke registrert</Normaltekst>
            </VisittkortElement>
        );
    }

    return (
        <VisittkortElement beskrivelse={props.beskrivelse} ikon={<LocationPin />}>
            <Adresseinfo adresse={props.adresse} />
            <Endringstekst sistEndret={props.adresse.sistEndret} />
        </VisittkortElement>
    );
}

function Adresse({ person }: Props) {
    return (
        <>
            <AdresseElement adresse={person.bostedAdresse.firstOrNull()} beskrivelse={'Bostedsadresse'} />
            <AdresseElement adresse={person.kontaktAdresse.firstOrNull()} beskrivelse={'Kontaktadresse'} />
        </>
    );
}

export default Adresse;
