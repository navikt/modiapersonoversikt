import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import LocationPin from '../../../../../../svg/LocationPin';
import { Normaltekst } from 'nav-frontend-typografi';
import { Adresse as PersonAdresse, Person } from '../../../PersondataDomain';
import Adresseinfo from '../../AdresseInfo';
import Endringstekst from '../../Endringstekst';
import GyldighetsPeriode from '../../GyldighetsPeriode';

interface Props {
    person: Person;
}

interface AdresseElementProps {
    adresse: PersonAdresse | null;
    beskrivelse: string;
    erOppholdsadresse?: boolean;
}

function AdresseElement({ adresse, beskrivelse, erOppholdsadresse }: AdresseElementProps) {
    if (!adresse) {
        return (
            <VisittkortElement beskrivelse={beskrivelse} ikon={<LocationPin />}>
                <Normaltekst>Ikke registrert</Normaltekst>
            </VisittkortElement>
        );
    }

    const skalViseGyldighetsPeriode =
        erOppholdsadresse || (!erOppholdsadresse && adresse.gyldighetsPeriode?.gyldigTilOgMed);

    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={<LocationPin />}>
            {skalViseGyldighetsPeriode && <GyldighetsPeriode gyldighetsPeriode={adresse.gyldighetsPeriode} />}
            <Adresseinfo adresse={adresse} />
            <Endringstekst sistEndret={adresse.sistEndret} />
        </VisittkortElement>
    );
}

function Adresse({ person }: Props) {
    const oppholdsAdresse = person.oppholdsAdresse.firstOrNull();
    return (
        <>
            <AdresseElement adresse={person.bostedAdresse.firstOrNull()} beskrivelse={'Bostedsadresse'} />
            <AdresseElement adresse={person.kontaktAdresse.firstOrNull()} beskrivelse={'Kontaktadresse'} />
            {oppholdsAdresse && (
                <AdresseElement adresse={oppholdsAdresse} beskrivelse={'Oppholdsadresse'} erOppholdsadresse={true} />
            )}
        </>
    );
}

export default Adresse;
