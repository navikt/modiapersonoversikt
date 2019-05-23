import * as React from 'react';
import { Person } from '../../../../../../models/person/person';
import {
    Adressat,
    AdvokatSomAdressat,
    Doedsbo,
    KontaktpersonMedId,
    KontaktpersonUtenId,
    OrganisasjonSomAdressat,
    Personnavn
} from '../../../../../../models/person/doedsbo';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { formaterDato } from '../../../../../../utils/stringFormatting';
import EtikettGrå from '../../../../../../components/EtikettGrå';
import VisittkortElement from '../../VisittkortElement';
import AlertStripeFeil from 'nav-frontend-alertstriper/lib/feil-alertstripe';
import LocationPin from '../../../../../../svg/LocationPin';

interface Props {
    person: Person;
}

function KontaktinformasjonDoedsbo(props: Props) {
    const doedsboListe = props.person.kontaktinformasjonForDoedsbo;

    if (!doedsboListe || doedsboListe.length === 0) {
        return null;
    }

    const doedsboElementer = doedsboListe.map(doedsbo => (
        <VisittkortElement beskrivelse={'Kontaktinformasjon for dødsbo'} ikon={<LocationPin />}>
            <Adressatinfo adressat={doedsbo.adressat} />
            <br />
            <Adresseinfo doedsbo={doedsbo} />
            <Endretinfo doedsbo={doedsbo} />
        </VisittkortElement>
    ));

    return <>{doedsboElementer}</>;
}

function Adresseinfo(props: { doedsbo: Doedsbo }) {
    const doedsbo = props.doedsbo;
    const adresselinje2 = doedsbo.adresselinje2 ? <Normaltekst>{doedsbo.adresselinje2}</Normaltekst> : null;
    const landkode = doedsbo.landkode ? <Normaltekst>{doedsbo.landkode}</Normaltekst> : null;

    return (
        <>
            <Normaltekst>{doedsbo.adresselinje1}</Normaltekst>
            {adresselinje2}
            <Normaltekst>
                {doedsbo.postnummer} {doedsbo.poststed}
            </Normaltekst>
            {landkode}
        </>
    );
}

function Endretinfo(props: { doedsbo: Doedsbo }) {
    const doedsbo = props.doedsbo;

    return (
        <EtikettGrå>
            Endret {formaterDato(doedsbo.registrert)} i {doedsbo.master}
        </EtikettGrå>
    );
}

function Adressatinfo(props: { adressat: Adressat }) {
    const adressat = props.adressat;
    if (adressat.advokatSomAdressat) {
        return <AdvokatSomAdressatInfo adressat={adressat.advokatSomAdressat} />;
    } else if (adressat.organisasjonSomAdressat) {
        return <OrganisasjonSomAdressatInfo adressat={adressat.organisasjonSomAdressat} />;
    } else if (adressat.kontaktpersonUtenIdNummerSomAdressat) {
        return <KontaktpersonUtenIdInfo adressat={adressat.kontaktpersonUtenIdNummerSomAdressat} />;
    } else if (adressat.kontaktpersonMedIdNummerSomAdressat) {
        return <KontaktpersonMedIdInfo adressat={adressat.kontaktpersonMedIdNummerSomAdressat} />;
    } else {
        return <AlertStripeFeil>Ingen adressat funnet</AlertStripeFeil>;
    }
}

function AdvokatSomAdressatInfo(props: { adressat: AdvokatSomAdressat }) {
    const adressat = props.adressat;
    const firma = adressat.organisasjonsnavn ? (
        <Normaltekst>Advokatfirma {adressat.organisasjonsnavn}</Normaltekst>
    ) : null;
    const orgnr = adressat.organisasjonsnummer ? (
        <Normaltekst>Org. nr: {adressat.organisasjonsnummer}</Normaltekst>
    ) : null;

    return (
        <>
            <Normaltekst>{formatterNavn(adressat.kontaktperson)}</Normaltekst>
            {firma}
            {orgnr}
        </>
    );
}

function OrganisasjonSomAdressatInfo(props: { adressat: OrganisasjonSomAdressat }) {
    const adressat = props.adressat;
    const orgnr = adressat.organisasjonsnummer ? (
        <Normaltekst>Org. nr: {adressat.organisasjonsnummer}</Normaltekst>
    ) : null;
    const kontakt = adressat.kontaktperson ? <Normaltekst>{formatterNavn(adressat.kontaktperson)}</Normaltekst> : null;

    return (
        <>
            <Normaltekst>{adressat.organisasjonsnavn}</Normaltekst>
            {orgnr}
            {kontakt}
        </>
    );
}

function KontaktpersonUtenIdInfo(props: { adressat: KontaktpersonUtenId }) {
    const adressat = props.adressat;
    const foedselsdato = adressat.foedselsdato ? (
        <Normaltekst>{formaterDato(adressat.foedselsdato)}</Normaltekst>
    ) : null;

    return (
        <>
            <Normaltekst>{formatterNavn(adressat.navn)}</Normaltekst>
            {foedselsdato}
        </>
    );
}

function KontaktpersonMedIdInfo(props: { adressat: KontaktpersonMedId }) {
    const adressat = props.adressat;
    const navn = adressat.navn ? <Normaltekst>{formatterNavn(adressat.navn)}</Normaltekst> : null;

    return (
        <>
            {navn}
            <Normaltekst>{adressat.idNummer}</Normaltekst>
        </>
    );
}

function formatterNavn(navn: Personnavn): string {
    return `${navn.fornavn} ${navn.mellomnavn ? navn.mellomnavn : ''} ${navn.etternavn}`;
}

export default KontaktinformasjonDoedsbo;
