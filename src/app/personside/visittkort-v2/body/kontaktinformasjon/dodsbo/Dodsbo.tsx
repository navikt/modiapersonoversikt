import * as React from 'react';
import styled from 'styled-components/macro';
import VisittkortElement from '../../VisittkortElement';
import LocationPin from '../../../../../../svg/LocationPin';
import { Normaltekst } from 'nav-frontend-typografi';
import { hentNavn } from '../../../visittkort-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { formaterDato } from '../../../../../../utils/string-utils';
import {
    Adressat,
    AdvokatSomAdressat,
    Dodsbo,
    OrganisasjonSomAdressat,
    PersonSomAdressat
} from '../../../PersondataDomain';
import Adresseinfo from '../../AdresseInfo';
import Endringstekst from '../../Endringstekst';
import FeilendeSystemAdvarsel from '../../../FeilendeSystemAdvarsel';

interface Props {
    feilendeSystem: boolean;
    dodsbo: Dodsbo[];
}

const AdresseStyle = styled.div`
    margin-top: 0.5rem;
`;

function Adressatinfo({ feilendeSystem, adressat }: { feilendeSystem: boolean; adressat: Adressat }) {
    if (adressat.advokatSomAdressat) {
        return <AdvokatSomAdressatInfo adressat={adressat.advokatSomAdressat} />;
    } else if (adressat.organisasjonSomAdressat) {
        return <OrganisasjonSomAdressatInfo adressat={adressat.organisasjonSomAdressat} />;
    } else if (adressat.personSomAdressat) {
        return <PersonSomAdressatInfo feilendeSystem={feilendeSystem} adressat={adressat.personSomAdressat} />;
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

function PersonSomAdressatInfo({ feilendeSystem, adressat }: { feilendeSystem: boolean; adressat: PersonSomAdressat }) {
    const harFeilendeSystem = feilendeSystem ? (
        <FeilendeSystemAdvarsel>Feilet ved uthenting av navn</FeilendeSystemAdvarsel>
    ) : null;
    const fnr = adressat.fnr ? <Normaltekst>{adressat.fnr}</Normaltekst> : null;
    const fodselsdato = adressat.fodselsdato ? <Normaltekst>{formaterDato(adressat.fodselsdato)}</Normaltekst> : null;
    const navn = adressat.navn ? <Normaltekst>{hentNavn(adressat.navn.firstOrNull())}</Normaltekst> : null;

    return (
        <>
            {harFeilendeSystem}
            {navn}
            {fnr}
            {fodselsdato}
        </>
    );
}

function KontaktinformasjonDodsbo({ feilendeSystem, dodsbo }: Props) {
    if (dodsbo.isEmpty()) {
        return null;
    }

    return (
        <>
            {dodsbo.map((dodsbo, index) => {
                return (
                    <VisittkortElement key={index} beskrivelse={'Kontaktinformasjon for dødsbo'} ikon={<LocationPin />}>
                        <Adressatinfo feilendeSystem={feilendeSystem} adressat={dodsbo.adressat} />
                        <AdresseStyle>
                            <Adresseinfo adresse={dodsbo.adresse} />
                        </AdresseStyle>
                        {/* TODO: Her ble det tidligere brukt dodsbo.registrert. Hva ønsker vi å bruke? */}
                        <Endringstekst sistEndret={dodsbo.sistEndret} />
                    </VisittkortElement>
                );
            })}
        </>
    );
}

export default KontaktinformasjonDodsbo;
