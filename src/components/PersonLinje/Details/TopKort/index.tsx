import { FigureInwardIcon, FigureOutwardIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, HGrid, HStack, InlineMessage, Label, ReadMore, VStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';
import { harFeilendeSystemer, hentNavn } from 'src/components/PersonLinje/utils';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import {
    type Adresse,
    Kjonn,
    type PersonData,
    PersonDataFeilendeSystemer
} from 'src/lib/types/modiapersonoversikt-api';
import { formatertKontonummerString } from 'src/utils/FormatertKontonummer';
import { capitalizeFirstCharacterAndLowercaseRest, formaterDato } from 'src/utils/string-utils';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import ValidPeriod from '../../common/ValidPeriod';
import { Adresseinfo, LastChanged } from '../components';
import { Adressatinfo } from '../KontaktInfo/Dodsbo';
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

type AdresseOppforing = {
    tittel: string;
    adresse: Adresse;
    gyldighetsPeriode?: Adresse['gyldighetsPeriode'];
};

function AdresseFelt({ oppforing }: { oppforing: AdresseOppforing }) {
    const { tittel, adresse, gyldighetsPeriode = adresse.gyldighetsPeriode } = oppforing;
    return (
        <Seksjon tittel={tittel}>
            <ValidPeriod from={gyldighetsPeriode?.gyldigFraOgMed} to={gyldighetsPeriode?.gyldigTilOgMed} />
            <Adresseinfo adresse={adresse} />
            <LastChanged sistEndret={adresse.sistEndret} />
        </Seksjon>
    );
}

function DodsboFelt({
    dodsbo,
    harFeilendeSystem
}: {
    dodsbo: PersonData['dodsbo'][number];
    harFeilendeSystem: boolean;
}) {
    return (
        <Seksjon tittel="Kontaktinformasjon for dødsbo">
            <BodyShort size="small">
                Skifteform: {capitalizeFirstCharacterAndLowercaseRest(dodsbo.skifteform)}
            </BodyShort>
            <Adressatinfo harFeilendeSystem={harFeilendeSystem} adressat={dodsbo.adressat} />
            <ValidPeriod
                from={dodsbo.adresse.gyldighetsPeriode?.gyldigFraOgMed}
                to={dodsbo.adresse.gyldighetsPeriode?.gyldigTilOgMed}
            />
            <Adresseinfo adresse={dodsbo.adresse} />
            <LastChanged sistEndret={dodsbo.sistEndret} />
        </Seksjon>
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

    const adresser: AdresseOppforing[] = [
        ...person.bostedAdresse.map((adresse) => ({ tittel: 'Bostedsadresse', adresse })),
        ...person.kontaktAdresse.map((adresse) => ({ tittel: 'Kontaktadresse', adresse })),
        ...person.oppholdsAdresse.map((adresse) => ({ tittel: 'Oppholdsadresse', adresse }))
    ];
    const deltBosted: AdresseOppforing[] = person.deltBosted.flatMap(({ adresse, gyldighetsPeriode }) =>
        adresse ? [{ tittel: 'Delt bosted', adresse, gyldighetsPeriode }] : []
    );
    const harDodsbo = person.dodsdato.length > 0 && person.dodsbo.length > 0;
    const hovedadresse = harDodsbo ? undefined : adresser[0];
    const flereAdresser = [...deltBosted, ...(harDodsbo ? adresser : adresser.slice(1))];

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
                    {harDodsbo &&
                        person.dodsbo.map((dodsbo) => (
                            <DodsboFelt
                                key={`${dodsbo.registrert}-${dodsbo.adresse.linje1}`}
                                dodsbo={dodsbo}
                                harFeilendeSystem={harFeilendeSystemer(
                                    feilendeSystemer,
                                    PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER
                                )}
                            />
                        ))}
                    {hovedadresse && <AdresseFelt oppforing={hovedadresse} />}
                    {flereAdresser.length > 0 && (
                        <ReadMore header="Personen har flere adresser" size="small">
                            <VStack gap="space-16">
                                {flereAdresser.map((oppforing, index) => (
                                    <AdresseFelt key={`${oppforing.tittel}-${index}`} oppforing={oppforing} />
                                ))}
                            </VStack>
                        </ReadMore>
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
