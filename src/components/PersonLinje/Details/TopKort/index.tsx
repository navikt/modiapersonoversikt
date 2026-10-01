import { FigureInwardIcon, FigureOutwardIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, HGrid, HStack, InlineMessage, Label, VStack } from '@navikt/ds-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { harFeilendeSystemer, hentNavn } from 'src/components/PersonLinje/utils';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { Kjonn, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { formatertKontonummerString } from 'src/utils/FormatertKontonummer';
import { formaterDato } from 'src/utils/string-utils';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import { Adresseinfo, LastChanged } from '../components';
import KRRInfo from '../KontaktInfo/KRRInfo';
import { tilrettelagtKommunikasjonTekst } from '../TilrettelagtKommunikasjon';

const RESERVERT = 'Reservert';
const IKKE_REGISTRERT = 'Ikke registrert';
const KRR_FEILET = 'Feilet ved uthenting fra KRR';
const KONTONUMMER_FEILET = 'Feilet ved uthenting av kontonummer';
const NAV_KONTAKTINFO_FEILET = 'Feilet ved uthenting av kontaktinformasjon';

function FlatFelt({ label, verdi, feilmelding }: { label: string; verdi?: ReactNode; feilmelding?: string }) {
    if (!feilmelding && !verdi) return null;
    return (
        <VStack gap="space-2">
            <Label size="small" className="whitespace-nowrap">
                {label}
            </Label>
            {feilmelding ? (
                <InlineMessage status="warning" size="small">
                    {feilmelding}
                </InlineMessage>
            ) : (
                <VStack gap="space-2" className="wrap-break-word">
                    {verdi}
                </VStack>
            )}
        </VStack>
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
    const mobil = person.kontaktInformasjon.mobil;
    const epost = person.kontaktInformasjon.epost;
    const reservasjonOppdatert = person.kontaktInformasjon.erReservert?.sistOppdatert;
    const telefon = erReservert ? RESERVERT : mobil?.value ? formaterMobiltelefonnummer(mobil.value) : IKKE_REGISTRERT;
    const epostVerdi = erReservert ? RESERVERT : epost?.value || IKKE_REGISTRERT;

    const kontonummer = person.bankkonto?.kontonummer ?? IKKE_REGISTRERT;
    const navTelefon = [...person.telefonnummer].sort((a, b) => a.prioritet - b.prioritet).at(0);

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
                    <FlatFelt
                        label="Telefon"
                        verdi={
                            erReservert && reservasjonOppdatert ? (
                                <KRRInfo
                                    erReservert
                                    reservasjonOppdatert={formaterDato(reservasjonOppdatert)}
                                    kontaktinformasjonVerdi={null}
                                    sistOppdatert={null}
                                />
                            ) : !erReservert && mobil?.sistOppdatert && mobil.value ? (
                                <KRRInfo
                                    kontaktinformasjonVerdi={telefon}
                                    sistOppdatert={formaterDato(mobil.sistOppdatert)}
                                />
                            ) : (
                                <BodyShort size="small">{telefon}</BodyShort>
                            )
                        }
                        feilmelding={krrFeiler ? KRR_FEILET : undefined}
                    />
                    <FlatFelt
                        label="Telefon til bruk for Nav"
                        verdi={
                            navTelefon && (
                                <>
                                    <BodyShort size="small">
                                        {formaterMobiltelefonnummer(navTelefon.identifikator)}
                                    </BodyShort>
                                    <LastChanged sistEndret={navTelefon.sistEndret} />
                                </>
                            )
                        }
                        feilmelding={navKontaktinfoFeiler ? NAV_KONTAKTINFO_FEILET : undefined}
                    />
                    <FlatFelt
                        label="E-post"
                        verdi={
                            erReservert && reservasjonOppdatert ? (
                                <KRRInfo
                                    erReservert
                                    reservasjonOppdatert={formaterDato(reservasjonOppdatert)}
                                    kontaktinformasjonVerdi={null}
                                    sistOppdatert={null}
                                />
                            ) : !erReservert && epost?.sistOppdatert && epost.value ? (
                                <KRRInfo
                                    kontaktinformasjonVerdi={epostVerdi}
                                    sistOppdatert={formaterDato(epost.sistOppdatert)}
                                />
                            ) : (
                                <BodyShort size="small">{epostVerdi}</BodyShort>
                            )
                        }
                        feilmelding={krrFeiler ? KRR_FEILET : undefined}
                    />
                    <FlatFelt
                        label="Kontonummer"
                        verdi={
                            <>
                                <BodyShort size="small">{formatertKontonummerString(kontonummer)}</BodyShort>
                                <LastChanged sistEndret={person.bankkonto?.sistEndret} />
                            </>
                        }
                        feilmelding={bankkontoFeiler ? KONTONUMMER_FEILET : undefined}
                    />
                </VStack>

                <VStack gap="space-16">
                    {bostedAdresse && (
                        <Seksjon tittel="Bostedsadresse">
                            <Adresseinfo adresse={bostedAdresse} />
                            <LastChanged sistEndret={bostedAdresse.sistEndret} />
                        </Seksjon>
                    )}
                </VStack>

                <VStack gap="space-16">
                    {harTolkebehov && (
                        <Seksjon tittel="Tolkebehov">
                            {tilrettelagtKommunikasjonTekst('Tegnspråk', person.tilrettelagtKommunikasjon.tegnsprak)}
                            {tilrettelagtKommunikasjonTekst('Talespråk', person.tilrettelagtKommunikasjon.talesprak)}
                        </Seksjon>
                    )}
                </VStack>
            </HGrid>
        </VStack>
    );
}

export default TopKort;
