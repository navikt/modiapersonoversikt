import * as React from 'react';
import { Person } from '../../../../../../models/person/person';
import VisittkortElement from '../../VisittkortElement';
import * as personadresse from '../../../../../../models/personadresse';
import { Personadresse } from '../../../../../../models/personadresse';
import { formaterDato } from '../../../../../../utils/dateUtils';
import { endretAvTekst } from '../../../../../../utils/endretAvUtil';
import EtikettGrå from '../../../../../../components/EtikettGrå';
import { Periode } from '../../../../../../models/periode';
import VisPeriode from '../../../../../../components/person/VisPeriode';
import LocationPin from '../../../../../../svg/LocationPin';
import { Normaltekst } from 'nav-frontend-typografi';

interface AdresseProps {
    person: Person;
}

function Adresse({ person }: AdresseProps) {
    return (
        <>
            {hentFolkeregistrertAdresse(person)}
            {hentMidlertidigAdresse(person)}
            {hentPostadresse(person)}
        </>
    );
}

function hentFolkeregistrertAdresse(person: Person) {
    const adresse =
        person.folkeregistrertAdresse != null ? (
            formatterRiktigAdresse(person.folkeregistrertAdresse)
        ) : (
            <Normaltekst>Ikke registrert</Normaltekst>
        );

    return (
        <VisittkortElement beskrivelse="Bostedsadresse" ikon={<LocationPin />}>
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
            <VisittkortElement beskrivelse="Postadresse" ikon={<LocationPin />}>
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
        return 'Midlertidig adresse';
    }
}

export function formatterRiktigAdresse(adresse: personadresse.Personadresse) {
    let adressetekst = <Normaltekst>Ingen registrert adresse</Normaltekst>;

    if (adresse.gateadresse != null) {
        adressetekst = formatterGateadresse(adresse.gateadresse);
    } else if (adresse.matrikkeladresse != null) {
        adressetekst = formatterMatrikkeladresse(adresse.matrikkeladresse);
    } else if (adresse.postboksadresse != null) {
        adressetekst = formatterPostboksadresse(adresse.postboksadresse);
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
            <EtikettGrå>
                Endret {formattertdato} {endretAv}
            </EtikettGrå>
        );
    } else {
        return null;
    }
}

function formatterGateadresse(adresse: personadresse.Gateadresse) {
    const gateadresse = `${adresse.gatenavn} ${adresse.husnummer || ''}${adresse.husbokstav || ''}`;
    const poststed = `${adresse.postnummer} ${adresse.poststed}`;

    return (
        <div key={gateadresse}>
            {hentPeriode(adresse.periode)}
            {hentTilleggsadresse(adresse.tilleggsadresse)}
            <Normaltekst>{gateadresse}</Normaltekst>
            {hentBolignummer(adresse)}
            <Normaltekst>{poststed}</Normaltekst>
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
            <Normaltekst>{eiendom}</Normaltekst>
            <Normaltekst>{poststed}</Normaltekst>
        </div>
    );
}

function formatterPostboksadresse(adresse: personadresse.Postboksadresse) {
    const postboksnummer = `${adresse.postboksnummer || 'Ukjent'}`;
    const poststed = `${adresse.postnummer} ${adresse.poststed}`;

    return (
        <div key={postboksnummer}>
            {hentPeriode(adresse.periode)}
            {hentTilleggsadresse(adresse.tilleggsadresse)}
            {hentPostboksTekst(adresse.postboksanlegg, adresse.postboksnummer)}
            <Normaltekst>{poststed}</Normaltekst>
        </div>
    );
}

function formatterUtenlandsadresse(adresse: personadresse.Utlandsadresse) {
    const landkode = `${(adresse.landkode && adresse.landkode.beskrivelse) || 'Ukjent'}`;

    return (
        <div key={landkode}>
            {hentPeriode(adresse.periode)}
            {adresse.adresselinjer.map((linje, i) => (
                <Normaltekst key={i}>{linje}</Normaltekst>
            ))}
            <Normaltekst>{adresse.landkode && adresse.landkode.beskrivelse}</Normaltekst>
        </div>
    );
}

function formatterUstrukturertAdresse(adresse: personadresse.UstrukturertAdresse) {
    return <Normaltekst>{adresse.adresselinje}</Normaltekst>;
}

function hentPeriode(periode?: Periode) {
    if (periode != null) {
        return <VisPeriode periode={periode} />;
    }
    return null;
}

function hentTilleggsadresse(tilleggsadresse?: string) {
    if (tilleggsadresse != null) {
        return <Normaltekst>{tilleggsadresse}</Normaltekst>;
    }
    return null;
}

function hentPostboksTekst(postboksanlegg: string | undefined, postboksnummer: string) {
    if (postboksanlegg) {
        return <Normaltekst>{postboksanlegg + ', postboksnummer  ' + postboksnummer}</Normaltekst>;
    } else {
        return <Normaltekst>{'Postboksnummer ' + postboksnummer}</Normaltekst>;
    }
}

function hentBolignummer(adresse: personadresse.Gateadresse) {
    if (adresse.bolignummer) {
        return <Normaltekst>{adresse.bolignummer}</Normaltekst>;
    }
    return null;
}

export default Adresse;
