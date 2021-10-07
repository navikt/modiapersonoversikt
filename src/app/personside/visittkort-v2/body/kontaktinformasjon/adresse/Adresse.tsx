import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import { formaterDato } from '../../../../../../utils/string-utils';
import { endretAvTekst } from '../../../../../../utils/endretAvUtil';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import LocationPin from '../../../../../../svg/LocationPin';
import { Normaltekst } from 'nav-frontend-typografi';
import { Adresse as PersonAdresse, Person } from '../../../PersondataDomain';
import { Adresseinfo } from '../../AdresseInfo';

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
                {hentEndringstekst(personAdresse)}
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

function hentEndringstekst(personAdresse: PersonAdresse) {
    const formatertdato = personAdresse.registrert ? formaterDato(new Date(personAdresse.registrert)) : null;
    const endretAv = personAdresse.registrertAv ? endretAvTekst(personAdresse.registrertAv) : null;

    if (formatertdato != null) {
        return (
            <EtikettGraa>
                Endret {formatertdato} {endretAv}
            </EtikettGraa>
        );
    } else {
        return null;
    }
}

export default Adresse;
