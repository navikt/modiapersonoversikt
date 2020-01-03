import * as React from 'react';
import { Person } from '../../../../../../models/person/person';
import {
    Adressat,
    AdvokatSomAdressat,
    Doedsbo,
    KontaktpersonMedId,
    KontaktpersonUtenId,
    OrganisasjonSomAdressat
} from '../../../../../../models/person/doedsbo';
import { Normaltekst } from 'nav-frontend-typografi';
import { formaterDato } from '../../../../../../utils/stringFormatting';
import EtikettGrå from '../../../../../../components/EtikettGrå';
import VisittkortElement from '../../VisittkortElement';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import LocationPin from '../../../../../../svg/LocationPin';
import styled from 'styled-components/macro';
import { hentNavn } from '../../../utils';

interface Props {
    person: Person;
}

const AdresseStyle = styled.div`
    margin-top: 0.5rem;
`;

function KontaktinformasjonDoedsbo(props: Props) {
    const doedsboListe = props.person.kontaktinformasjonForDoedsbo;

    if (!doedsboListe || doedsboListe.length === 0) {
        return null;
    }

    return (
        <>
            {doedsboListe.map((doedsbo, index) => (
                <VisittkortElement key={index} beskrivelse={'Kontaktinformasjon for dødsbo'} ikon={<LocationPin />}>
                    <Adressatinfo adressat={doedsbo.adressat} />
                    <AdresseStyle>
                        <Adresseinfo doedsbo={doedsbo} />
                    </AdresseStyle>
                    <Endretinfo doedsbo={doedsbo} />
                </VisittkortElement>
            ))}
        </>
    );
}

function Adresseinfo({ doedsbo }: { doedsbo: Doedsbo }) {
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

function Endretinfo({ doedsbo }: { doedsbo: Doedsbo }) {
    return (
        <EtikettGrå>
            Endret {formaterDato(doedsbo.registrert)} i {doedsbo.master}
        </EtikettGrå>
    );
}

function Adressatinfo({ adressat }: { adressat: Adressat }) {
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

function AdvokatSomAdressatInfo({ adressat }: { adressat: AdvokatSomAdressat }) {
    const firma = adressat.organisasjonsnavn ? (
        <Normaltekst>Advokatfirma {adressat.organisasjonsnavn}</Normaltekst>
    ) : null;
    const orgnr = adressat.organisasjonsnummer ? (
        <Normaltekst>Org. nr: {adressat.organisasjonsnummer}</Normaltekst>
    ) : null;

    return (
        <>
            <Normaltekst>{hentNavn(adressat.kontaktperson)}</Normaltekst>
            {firma}
            {orgnr}
        </>
    );
}

function OrganisasjonSomAdressatInfo({ adressat }: { adressat: OrganisasjonSomAdressat }) {
    const orgnr = adressat.organisasjonsnummer ? (
        <Normaltekst>Org. nr: {adressat.organisasjonsnummer}</Normaltekst>
    ) : null;
    const kontakt = adressat.kontaktperson ? <Normaltekst>{hentNavn(adressat.kontaktperson)}</Normaltekst> : null;

    return (
        <>
            <Normaltekst>{adressat.organisasjonsnavn}</Normaltekst>
            {orgnr}
            {kontakt}
        </>
    );
}

function KontaktpersonUtenIdInfo({ adressat }: { adressat: KontaktpersonUtenId }) {
    const foedselsdato = adressat.foedselsdato ? (
        <Normaltekst>{formaterDato(adressat.foedselsdato)}</Normaltekst>
    ) : null;

    return (
        <>
            <Normaltekst>{hentNavn(adressat.navn)}</Normaltekst>
            {foedselsdato}
        </>
    );
}

function KontaktpersonMedIdInfo({ adressat }: { adressat: KontaktpersonMedId }) {
    const navn = adressat.navn ? <Normaltekst>{hentNavn(adressat.navn)}</Normaltekst> : null;

    return (
        <>
            {navn}
            <Normaltekst>{adressat.idNummer}</Normaltekst>
        </>
    );
}

export default KontaktinformasjonDoedsbo;
