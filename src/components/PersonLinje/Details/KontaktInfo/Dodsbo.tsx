import { LocationPinFillIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box } from '@navikt/ds-react';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import { hentNavn } from '../../utils';
import { Adresseinfo, InfoElement, LastChanged } from '../components';

type Dodsbo = PersonData['dodsbo'][number];
type Adressat = Dodsbo['adressat'];

function Adressatinfo({ harFeilendeSystem, adressat }: { harFeilendeSystem: boolean; adressat: Adressat }) {
    if (adressat.advokatSomAdressat) {
        return <AdvokatSomAdressatInfo adressat={adressat.advokatSomAdressat} />;
    }
    if (adressat.organisasjonSomAdressat) {
        return <OrganisasjonSomAdressatInfo adressat={adressat.organisasjonSomAdressat} />;
    }
    if (adressat.personSomAdressat) {
        return <PersonSomAdressatInfo harFeilendeSystem={harFeilendeSystem} adressat={adressat.personSomAdressat} />;
    }
    return <Alert variant="warning">Ingen adressat funnet</Alert>;
}

function AdvokatSomAdressatInfo({ adressat }: { adressat: NonNullable<Adressat['advokatSomAdressat']> }) {
    const firma = adressat.organisasjonsnavn ? (
        <BodyShort size="small">Advokatfirma {adressat.organisasjonsnavn}</BodyShort>
    ) : null;
    const orgnr = adressat.organisasjonsnummer ? (
        <BodyShort size="small">Org. nr: {adressat.organisasjonsnummer}</BodyShort>
    ) : null;

    return (
        <>
            <BodyShort size="small">{hentNavn(adressat.kontaktperson)}</BodyShort>
            {firma}
            {orgnr}
        </>
    );
}

function OrganisasjonSomAdressatInfo({ adressat }: { adressat: NonNullable<Adressat['organisasjonSomAdressat']> }) {
    const orgnr = adressat.organisasjonsnummer ? (
        <BodyShort size="small">Org. nr: {adressat.organisasjonsnummer}</BodyShort>
    ) : null;
    const kontakt = adressat.kontaktperson ? (
        <BodyShort size="small">{hentNavn(adressat.kontaktperson)}</BodyShort>
    ) : null;

    return (
        <>
            <BodyShort size="small">{adressat.organisasjonsnavn}</BodyShort>
            {orgnr}
            {kontakt}
        </>
    );
}

function PersonSomAdressatInfo({
    harFeilendeSystem,
    adressat
}: {
    harFeilendeSystem: boolean;
    adressat: NonNullable<Adressat['personSomAdressat']>;
}) {
    const manglerData = harFeilendeSystem ? <Alert variant="warning">Feilet ved uthenting av navn</Alert> : null;
    const fnr = adressat.fnr ? <BodyShort size="small">{adressat.fnr}</BodyShort> : null;
    const fodselsdato = adressat.fodselsdato ? (
        <BodyShort size="small">{formaterDato(adressat.fodselsdato)}</BodyShort>
    ) : null;
    const navn = adressat.navn ? (
        <BodyShort size="small">{hentNavn(adressat.navn.firstOrNull() ?? undefined)}</BodyShort>
    ) : null;

    return (
        <>
            {manglerData}
            {navn}
            {fnr}
            {fodselsdato}
        </>
    );
}

function KontaktinformasjonDodsbo({ harFeilendeSystem, dodsbo }: { dodsbo: Dodsbo[]; harFeilendeSystem: boolean }) {
    return (
        <>
            {dodsbo.map((dodsbo, index) => {
                return (
                    <InfoElement
                        key={`${dodsbo.adresse}-${index}`}
                        title="Kontaktinformasjon for dødsbo"
                        icon={<LocationPinFillIcon fontSize="1.2rem" color="var(--a-gray-400)" />}
                    >
                        <Adressatinfo harFeilendeSystem={harFeilendeSystem} adressat={dodsbo.adressat} />
                        <Box marginBlock="2">
                            <Adresseinfo adresse={dodsbo.adresse} />
                            {/* TODO: Her ble det tidligere brukt dodsbo.registrert. Hva ønsker vi å bruke? */}
                            <LastChanged sistEndret={dodsbo.sistEndret} />
                        </Box>
                    </InfoElement>
                );
            })}
        </>
    );
}

export default KontaktinformasjonDodsbo;
