import { FigureInwardIcon, FigureOutwardIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, HGrid, HStack, InlineMessage, Label, VStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';
import { harFeilendeSystemer, hentNavn } from 'src/components/PersonLinje/utils';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { Kjonn, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { formatertKontonummerString } from 'src/utils/FormatertKontonummer';
import { formaterDato } from 'src/utils/string-utils';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import { Adresseinfo, LastChanged } from '../components';
import KRRInfo from '../KontaktInfo/KRRInfo';
import { tilrettelagtKommunikasjonTekst } from '../TilrettelagtKommunikasjon';

const IKKE_REGISTRERT = 'Ikke registrert';
const KRR_FEILET = 'Feilet ved uthenting fra KRR';
const KONTONUMMER_FEILET = 'Feilet ved uthenting av kontonummer';
const NAV_KONTAKTINFO_FEILET = 'Feilet ved uthenting av kontaktinformasjon';

function Seksjon({ tittel, feilmelding, children }: PropsWithChildren<{ tittel: string; feilmelding?: string }>) {
    if (!feilmelding && !children) return null;
    return (
        <VStack gap="space-2" className="wrap-break-word">
            <Label size="small">{tittel}</Label>
            {feilmelding ? (
                <InlineMessage status="warning" size="small">
                    {feilmelding}
                </InlineMessage>
            ) : (
                children
            )}
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
    const kontonummer = person.bankkonto?.kontonummer;
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
                    <Seksjon tittel="Telefon" feilmelding={krrFeiler ? KRR_FEILET : undefined}>
                        <KRRInfo
                            erReservert={erReservert}
                            reservasjonOppdatert={reservasjonOppdatert ? formaterDato(reservasjonOppdatert) : null}
                            kontaktinformasjonVerdi={mobil?.value ? formaterMobiltelefonnummer(mobil.value) : null}
                            sistOppdatert={mobil?.sistOppdatert ? formaterDato(mobil.sistOppdatert) : null}
                            visVedReservasjon
                        />
                    </Seksjon>
                    <Seksjon
                        tittel="Telefon til bruk for Nav"
                        feilmelding={navKontaktinfoFeiler ? NAV_KONTAKTINFO_FEILET : undefined}
                    >
                        {navTelefon && (
                            <>
                                <BodyShort size="small">
                                    {[
                                        navTelefon.retningsnummer?.kode,
                                        formaterMobiltelefonnummer(navTelefon.identifikator)
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                </BodyShort>
                                <LastChanged sistEndret={navTelefon.sistEndret} />
                            </>
                        )}
                    </Seksjon>
                    <Seksjon tittel="E-post" feilmelding={krrFeiler ? KRR_FEILET : undefined}>
                        <KRRInfo
                            erReservert={erReservert}
                            reservasjonOppdatert={reservasjonOppdatert ? formaterDato(reservasjonOppdatert) : null}
                            kontaktinformasjonVerdi={epost?.value ?? null}
                            sistOppdatert={epost?.sistOppdatert ? formaterDato(epost.sistOppdatert) : null}
                            visVedReservasjon
                        />
                    </Seksjon>
                    <Seksjon tittel="Kontonummer" feilmelding={bankkontoFeiler ? KONTONUMMER_FEILET : undefined}>
                        <BodyShort size="small">
                            {kontonummer ? formatertKontonummerString(kontonummer) : IKKE_REGISTRERT}
                        </BodyShort>
                        <LastChanged sistEndret={person.bankkonto?.sistEndret} />
                    </Seksjon>
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
