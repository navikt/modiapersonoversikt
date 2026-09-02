import { FigureInwardIcon, FigureOutwardIcon } from '@navikt/aksel-icons';
import { BodyShort, Detail, Heading, HGrid, HStack, Label, VStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';
import { hentNavn } from 'src/components/PersonLinje/utils';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { Kjonn } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import { Adresseinfo } from '../components';

function FlatFelt({ label, verdi }: { label: string; verdi?: string | null }) {
    if (!verdi) return null;
    return (
        <HStack gap="space-4" align="start">
            <Label size="small" className="whitespace-nowrap">
                {label}:
            </Label>
            <BodyShort size="small" className="break-words [overflow-wrap:anywhere]">
                {verdi}
            </BodyShort>
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

    const erReservert = person.kontaktInformasjon.erReservert?.value === true;
    const telefon = erReservert
        ? 'Reservert'
        : person.kontaktInformasjon.mobil?.value
          ? formaterMobiltelefonnummer(person.kontaktInformasjon.mobil.value)
          : null;
    const epost = erReservert ? 'Reservert' : (person.kontaktInformasjon.epost?.value ?? null);

    const kontonummer = person.bankkonto?.kontonummer ?? null;
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
                        <FlatFelt label="Telefon" verdi={telefon} />
                        <FlatFelt label="Telefon bruk Nav" verdi={navTelefon} />
                        <FlatFelt label="E-post" verdi={epost} />
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
                    <FlatFelt label="Kontonummer" verdi={kontonummer} />
                </VStack>
            </HGrid>
        </VStack>
    );
}

export default TopKort;
