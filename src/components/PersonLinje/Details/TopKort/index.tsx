import { FigureInwardIcon, FigureOutwardIcon } from '@navikt/aksel-icons';
import { BodyShort, Detail, Heading, HGrid, HStack, InlineMessage, Label, VStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';
import { harFeilendeSystemer, hentNavn } from 'src/components/PersonLinje/utils';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { Kjonn, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import { Adresseinfo } from '../components';

const RESERVERT = 'Reservert';
const IKKE_REGISTRERT = 'Ikke registrert';
const KRR_FEILET = 'Feilet ved uthenting fra KRR';
const KONTONUMMER_FEILET = 'Feilet ved uthenting av kontonummer';
const NAV_KONTAKTINFO_FEILET = 'Feilet ved uthenting av kontaktinformasjon';

function FlatFelt({ label, verdi, feilmelding }: { label: string; verdi?: string | null; feilmelding?: string }) {
    if (!feilmelding && !verdi) return null;
    return (
        <HStack gap="space-4" align="start">
            <Label size="small" className="whitespace-nowrap">
                {label}:
            </Label>
            {feilmelding ? (
                <InlineMessage status="warning" size="small">
                    {feilmelding}
                </InlineMessage>
            ) : (
                <BodyShort size="small" className="break-words [overflow-wrap:anywhere]">
                    {verdi}
                </BodyShort>
            )}
        </HStack>
    );
}

function Seksjon({ tittel, children }: PropsWithChildren<{ tittel: string }>) {
    return (
        <VStack gap="space-2">
            <Label size="small">{tittel}</Label>
            {children}
        </VStack>
    );
}

function TopKort() {
    const { data } = usePersonData();
    const person = data?.person;
    if (!person) return null;

    const navn = hentNavn(person.navn.firstOrNull() ?? undefined);
    const kjonn = person.kjonn.firstOrNull()?.kode;

    const feilendeSystemer = data?.feilendeSystemer ?? [];
    const krrFeiler = harFeilendeSystemer(feilendeSystemer, PersonDataFeilendeSystemer.DKIF);
    const bankkontoFeiler = harFeilendeSystemer(feilendeSystemer, PersonDataFeilendeSystemer.BANKKONTO);
    const navKontaktinfoFeiler = harFeilendeSystemer(
        feilendeSystemer,
        PersonDataFeilendeSystemer.NORG_KONTAKTINFORMASJON
    );

    const erReservert = person.kontaktInformasjon.erReservert?.value === true;
    const mobil = person.kontaktInformasjon.mobil?.value;
    const telefon = erReservert ? RESERVERT : mobil ? formaterMobiltelefonnummer(mobil) : IKKE_REGISTRERT;
    const epost = erReservert ? RESERVERT : person.kontaktInformasjon.epost?.value || IKKE_REGISTRERT;

    const kontonummer = person.bankkonto?.kontonummer ?? IKKE_REGISTRERT;
    const navTelefon = [...person.telefonnummer].sort((a, b) => a.prioritet - b.prioritet).at(0)?.identifikator ?? null;

    const harTolkebehov =
        person.tilrettelagtKommunikasjon.tegnsprak.isNotEmpty() ||
        person.tilrettelagtKommunikasjon.talesprak.isNotEmpty();

    const bostedAdresse = person.bostedAdresse.firstOrNull();

    return (
        <VStack gap="space-28">
            <HStack gap="space-2" align="center">
                {kjonn === Kjonn.K && <FigureOutwardIcon fontSize="2.2rem" aria-hidden />}
                {kjonn === Kjonn.M && <FigureInwardIcon fontSize="2.2rem" aria-hidden />}
                <Heading size="large">{navn}</Heading>
            </HStack>

            <HGrid columns={{ xs: 1, md: 2, xl: 3 }} gap={{ xs: 'space-16', xl: 'space-8' }} align="start">
                <VStack gap="space-16">
                    <VStack gap="space-2">
                        <FlatFelt label="Telefon" verdi={telefon} feilmelding={krrFeiler ? KRR_FEILET : undefined} />
                        <FlatFelt
                            label="Telefon bruk Nav"
                            verdi={navTelefon}
                            feilmelding={navKontaktinfoFeiler ? NAV_KONTAKTINFO_FEILET : undefined}
                        />
                        <FlatFelt label="E-post" verdi={epost} feilmelding={krrFeiler ? KRR_FEILET : undefined} />
                    </VStack>
                    {harTolkebehov && (
                        <Seksjon tittel="Tolkebehov">
                            <BodyShort size="small">Ja</BodyShort>
                        </Seksjon>
                    )}
                </VStack>

                <VStack gap="space-16">
                    {bostedAdresse && (
                        <Seksjon tittel="Bostedsadresse">
                            <Adresseinfo adresse={bostedAdresse} />
                            {bostedAdresse.sistEndret && (
                                <Detail>
                                    Endret {formaterDato(bostedAdresse.sistEndret.tidspunkt)} av{' '}
                                    {bostedAdresse.sistEndret.ident}
                                </Detail>
                            )}
                        </Seksjon>
                    )}
                </VStack>

                <VStack gap="space-8">
                    <FlatFelt
                        label="Kontonummer"
                        verdi={kontonummer}
                        feilmelding={bankkontoFeiler ? KONTONUMMER_FEILET : undefined}
                    />
                </VStack>
            </HGrid>
        </VStack>
    );
}

export default TopKort;
