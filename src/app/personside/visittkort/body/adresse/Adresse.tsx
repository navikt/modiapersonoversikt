import * as React from 'react';
import { Person } from '../../../../../models/person';
import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import * as personadresse from '../../../../../models/personadresse';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { Personadresse } from '../../../../../models/personadresse';
import { formaterDato } from '../../../../../utils/dateUtils';

const locationPath = require('../../../../../resources/svg/location-pin.svg');

interface AdresseProps {
    person: Person;
}

function Adresse({person}: AdresseProps) {
    return (
        <>
            <VisittkortElement beskrivelse="Postadresse Folkeregistrert" ikonPath={locationPath}>
                {formatterRiktigAdresse(person.folkeregistrertAdresse)}
            </VisittkortElement>
            <VisittkortElement beskrivelse="Postadresse Alternativ" ikonPath={locationPath}>
                {formatterRiktigAdresse(person.alternativAdresse)}
            </VisittkortElement>
        </>
    );
}

function formatterRiktigAdresse(adresse?: personadresse.Personadresse) {
    let adressetekst = (
        <Undertekst>
            Ingen registrert adresse
        </Undertekst>
    );
    if (adresse != null) {
        if (adresse.gateadresse != null) {
            adressetekst = formatterGateadresse(adresse.gateadresse);
        } else if (adresse.matrikkeladresse != null) {
            adressetekst = formatterMatrikkeladresse(adresse.matrikkeladresse);
        } else if (adresse.utlandsadresse != null) {
            adressetekst = formatterUtenlandsadresse(adresse.utlandsadresse);
        } else if (adresse.ustrukturert != null) {
            adressetekst = formatterUstrukturertAdresse(adresse.ustrukturert);
        }
    }
    const endringstekst = hentEndringstekst(adresse);
    return (
        <>
            {adressetekst}
            {endringstekst}
        </>
    );
}

function hentEndringstekst(adresse?: Personadresse) {
    if (adresse != null && adresse.endringsinfo != null) {
        const formattertdato = formaterDato(adresse.endringsinfo.sistEndret);
        return (
            <Undertekst>
                Endret {formattertdato} av {adresse.endringsinfo.sistEndretAv}
            </Undertekst>
        );
    } else {
        return null;
    }
}

function formatterGateadresse(adresse: personadresse.Gateadresse) {
    const gateadresse = `${adresse.gatenavn} ${adresse.husnummer || '' }${adresse.husbokstav || ''}`;
    const poststed = `${adresse.postnummer} ${adresse.poststed}`;

    return (
        <div key={gateadresse}>
            <EtikettLiten>{gateadresse}</EtikettLiten>
            <EtikettLiten>{poststed}</EtikettLiten>
        </div>
    );
}

function formatterMatrikkeladresse(adresse: personadresse.Matrikkeladresse) {
    const eiendom = `${adresse.eiendomsnavn || 'Ukjent'}`;
    const poststed = `${adresse.postnummer} ${adresse.poststed}`;

    return (
        <div key={eiendom}>
            <EtikettLiten>{eiendom}</EtikettLiten>
            <EtikettLiten>{poststed}</EtikettLiten>
        </div>
    );
}

function formatterUtenlandsadresse(adresse: personadresse.Utlandsadresse) {
    const landkode = `${adresse.landkode || 'Ukjent'}`;

    return (
        <EtikettLiten>{adresse.adresselinje}, {landkode}</EtikettLiten>
    );
}

function formatterUstrukturertAdresse(adresse: personadresse.UstrukturertAdresse) {
    return (
        <EtikettLiten>{adresse.adresselinje}</EtikettLiten>
    );
}

export default Adresse;