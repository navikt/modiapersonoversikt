import * as React from 'react';
import { Person } from '../../../../../../models/person/person';
import VisittkortElement from '../../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import * as personadresse from '../../../../../../models/personadresse';
import { Personadresse } from '../../../../../../models/personadresse';
import { formaterDato } from '../../../../../../utils/dateUtils';
import { endretAvTekst } from '../../../../../../utils/endretAvUtil';
import EtikettMini from '../../../../../../components/EtikettMini';
import { Periode } from '../../../../../../models/periode';
import VisPeriode from '../../../../../../components/person/VisPeriode';
import LocationPin from '../../../../../../svg/LocationPin';

interface AdresseProps {
    person: Person;
}

function Adresse({person}: AdresseProps) {
    return (
        <>
            {hentFolkeregistrertAdresse(person)}
            {hentMidlertidigAdresse(person)}
            {hentPostadresse(person)}
        </>
    );
}

function hentFolkeregistrertAdresse(person: Person) {
    const adresse = person.folkeregistrertAdresse != null ?
        formatterRiktigAdresse(person.folkeregistrertAdresse) : 'Ikke registrert';

    return (
        <VisittkortElement beskrivelse="Bostedsadresse fra Folkeregisteret" ikon={<LocationPin />}>
            {adresse}
        </VisittkortElement>
    );

}

function hentMidlertidigAdresse(person: Person) {
    if (person.alternativAdresse != null) {
        return (
            <VisittkortElement beskrivelse={adressebeskrivelse(person.alternativAdresse)} ikon={<LocationPin />}>
                {formatterRiktigAdresse(person.alternativAdresse)}
            </VisittkortElement>
        );
    }
    return null;
}

function hentPostadresse(person: Person) {
    if (person.postadresse != null) {
        return (
            <VisittkortElement beskrivelse="Postadresse fra Folkeregistreret" ikon={<LocationPin />}>
                {formatterRiktigAdresse(person.postadresse)}
            </VisittkortElement>
        );
    }
    return null;
}

function adressebeskrivelse(adresse: personadresse.Personadresse) {
    if (adresse.utlandsadresse != null) {
        return 'Midlertidig adresse, Utland';
    } else {
        return 'Midlertidig adresse, Norge';
    }
}

function formatterRiktigAdresse(adresse: personadresse.Personadresse) {
    let adressetekst = (
        <Undertekst>
            Ingen registrert adresse
        </Undertekst>
    );

    if (adresse.gateadresse != null) {
        adressetekst = formatterGateadresse(adresse.gateadresse);
    } else if (adresse.matrikkeladresse != null) {
        adressetekst = formatterMatrikkeladresse(adresse.matrikkeladresse);
    } else if (adresse.utlandsadresse != null) {
        adressetekst = formatterUtenlandsadresse(adresse.utlandsadresse);
    } else if (adresse.ustrukturert != null) {
        adressetekst = formatterUstrukturertAdresse(adresse.ustrukturert);
    }

    const endringstekst = hentEndringstekst(adresse);
    return (
        <>
            {adressetekst}
            {endringstekst}
        </>
    );
}

function hentEndringstekst(adresse: Personadresse) {
    if (adresse.endringsinfo != null) {
        const formattertdato = formaterDato(adresse.endringsinfo.sistEndret);
        const endretAv = endretAvTekst(adresse.endringsinfo.sistEndretAv);
        return (
            <EtikettMini>
                Endret {formattertdato} {endretAv}
            </EtikettMini>
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
            {hentPeriode(adresse.periode)}
            {hentTilleggsadresse(adresse.tilleggsadresse)}
            <Undertekst>{gateadresse}</Undertekst>
            {hentBolignummer(adresse)}
            <Undertekst>{poststed}</Undertekst>
        </div>
    );
}

function formatterMatrikkeladresse(adresse: personadresse.Matrikkeladresse) {
    const eiendom = `${adresse.eiendomsnavn || 'Ukjent'}`;
    const poststed = `${adresse.postnummer} ${adresse.poststed}`;

    return (
        <div key={eiendom}>
            {hentPeriode(adresse.periode)}
            {hentTilleggsadresse(adresse.tilleggsadresse)}
            <Undertekst>{eiendom}</Undertekst>
            <Undertekst>{poststed}</Undertekst>
        </div>
    );
}

function formatterUtenlandsadresse(adresse: personadresse.Utlandsadresse) {
    const landkode = `${adresse.landkode || 'Ukjent'}`;

    return (
        <div key={landkode}>
            {hentPeriode(adresse.periode)}
            <Undertekst>{adresse.adresselinje}, {landkode}</Undertekst>
        </div>
    );
}

function formatterUstrukturertAdresse(adresse: personadresse.UstrukturertAdresse) {
    return (
        <Undertekst>{adresse.adresselinje}</Undertekst>
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

function hentTilleggsadresse(tilleggsadresse?: string) {
    if (tilleggsadresse != null) {
        return (
            <Undertekst>{tilleggsadresse}</Undertekst>
        );
    }
    return null;
}

function hentBolignummer(adresse: personadresse.Gateadresse) {
    if (adresse.bolignummer) {
        return (
            <Undertekst>{adresse.bolignummer}</Undertekst>
        );
    }
    return null;
}

export default Adresse;