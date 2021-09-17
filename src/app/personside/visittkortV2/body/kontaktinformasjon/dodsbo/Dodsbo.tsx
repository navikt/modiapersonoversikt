import * as React from 'react';
import { Person } from '../../../../../../models/personPdl/person';
import styled from 'styled-components/macro';
import VisittkortElement from '../../VisittkortElement';
import LocationPin from '../../../../../../svg/LocationPin';
import { Normaltekst } from 'nav-frontend-typografi';
import {
    Adressat,
    AdvokatSomAdressat,
    Dodsbo,
    OrganisasjonSomAdressat,
    PersonSomAdressat
} from '../../../../../../models/personPdl/dodsbo';
import { hentNavn } from '../../../utils-visittkort';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { formaterDato } from '../../../../../../utils/string-utils';
import EtikettGraa from '../../../../../../components/EtikettGraa';

interface Props {
    person: Person;
}

const AdresseStyle = styled.div`
    margin-top: 0.5rem;
`;

function KontaktinformasjonDodsbo(props: Props) {
    const dodsboListe = props.person.dodsbo;

    if (!dodsboListe || dodsboListe.length === 0) {
        return null;
    }

    return (
        <>
            {dodsboListe.map((dodsbo, index) => (
                <VisittkortElement key={index} beskrivelse={'Kontaktinformasjon for dødsbo'} ikon={<LocationPin />}>
                    <Adressatinfo adressat={dodsbo.adressat} />
                    <AdresseStyle>{dodsbo.adresse}</AdresseStyle>
                    <Endretinfo dodsbo={dodsbo} />
                </VisittkortElement>
            ))}
        </>
    );
}

function Adressatinfo({ adressat }: { adressat: Adressat }) {
    if (adressat.advokatSomAdressat) {
        return <AdvokatSomAdressatInfo adressat={adressat.advokatSomAdressat} />;
    } else if (adressat.organisasjonSomAdressat) {
        return <OrganisasjonSomAdressatInfo adressat={adressat.organisasjonSomAdressat} />;
    } else if (adressat.personSomAdressat) {
        return <PersonSomAdressatInfo adressat={adressat.personSomAdressat} />;
    } else {
        return <AlertStripeFeil>Ingen adressat funnet</AlertStripeFeil>;
    }
}

function Endretinfo({ dodsbo }: { dodsbo: Dodsbo }) {
    return <EtikettGraa>Endret {formaterDato(dodsbo.registrert)}</EtikettGraa>;
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

function PersonSomAdressatInfo({ adressat }: { adressat: PersonSomAdressat }) {
    const fnr = adressat.fnr ? <Normaltekst>{adressat.fnr}</Normaltekst> : null;
    const fodselsdato = adressat.fodselsdato ? <Normaltekst>{formaterDato(adressat.fodselsdato)}</Normaltekst> : null;
    const navn = adressat.navn ? <Normaltekst>{hentNavn(adressat.navn)}</Normaltekst> : null;

    return (
        <>
            {navn}
            {fnr}
            {fodselsdato}
        </>
    );
}

export default KontaktinformasjonDodsbo;
