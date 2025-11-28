import {BodyLong, Heading, Link, List, VStack} from '@navikt/ds-react';

export const ViktigAaViteAapInnhold = () => {
    return (
        <VStack gap="space-8">
            <Heading size="xsmall">Dette må du vite</Heading>
            <BodyLong size="small">
                Arbeidsavklaringspenger kan du få i en begrenset periode. Det er derfor viktig å avklare mulighetene
                dine til jobb så tidlig som mulig, slik at du får benyttet tiden din godt.
                <br />
                <Link
                    href="https\://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                Arbeidsavklaringspenger+%28AAP%29.217377.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om arbeidsavklaringspenger
                </Link>
            </BodyLong>

            <BodyLong size="small">Tips fra NAV: Tenk jobbmuligheter.</BodyLong>

            <List as="ul" size="small">
                <List.Item>
                    <Link
                        href="https\://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Jobbsøketips
                    </Link>
                    &nbsp;gir deg en oversikt over nyttige tips og råd.
                </List.Item>

                <List.Item>
                    <Link href="https\://tjenester.nav.no/akademia/startside?1" target="_blank" rel="noopener noreferrer">
                        Interessetesten Akademia
                    </Link>
                    &nbsp;er et arbeidsverktøy til å finne ut mer om stillinger, arbeidsområder og arbeidslivet generelt
                </List.Item>
            </List>

            <Heading size="xsmall">Krav til aktivitet og aktivitetsplan</Heading>

            <BodyLong size="small">
                For å få arbeidsavklaringspenger må du delta aktivt for å komme i arbeid. Aktivitetene som skal bidra
                til at du kommer i jobb, skal framgå av en plan.
            </BodyLong>
            <BodyLong size="small">
                Aktivitetsplanen skal du og NAV utarbeide i felleskap. En plan kan inneholde både arbeidsrettede tiltak
                og medisinsk behandling.
                <br />
                <Link
                    href="https\://www.nav.no/no/Person/Arbeid/Oppfolging+av+arbeidssokere/Relatert+informasjon/
                Aktivitetsplan.347229.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om aktivitetsplan
                </Link>
            </BodyLong>
            <Heading size="xsmall">Trenger du arbeidsrettede tiltak eller medisinsk behandling?</Heading>

            <BodyLong size="small">
                NAV har flere tiltak og virkemidler til deg som skal tilbake i arbeid eller hindre frafall fra
                arbeidslivet.
            </BodyLong>
            <BodyLong size="small">
                Du og fastlegen din eller annen behandler er ansvarlig for den medisinske behandlingen din.
                <br />
                <Link
                    href="https\://www.nav.no/no/Bedrift/Rekruttering/Arbeidsrettede+tiltak"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om arbeidsrettede tiltak
                </Link>
            </BodyLong>

            <Heading size="xsmall">Tilleggsstønader</Heading>

            <BodyLong size="small">
                Du kan få hel eller delvis dekning av konkrete utgifter du har i forbindelse med gjennomføring av
                aktiviteter i planen. Dette kommer i tillegg til arbeidsavklaringspengene.
                <br />
                <Link
                    href="https\://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                Relatert+informasjon/Tilleggsst%C3%B8nader.346092.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om tilleggsstønader
                </Link>
            </BodyLong>

            <Heading size="xsmall">Dine plikter mens du mottar arbeidsavklaringspenger</Heading>

            <BodyLong size="small">
                <strong>Vær aktiv</strong> - følg opp aktivitetsplanen din
                <br />
                <strong>Meldekort</strong> - du skal sende meldekort hver 14. dag.&nbsp;
                <Link
                    href="https\://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                Relatert+informasjon/Meldekort+-+arbeidsavklaringspenger.346078.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om meldekort
                </Link>
                <br />
                <strong>Ferie</strong> - hvis du planlegger ferie eller frav ær, må du søke om det.&nbsp;
                <Link
                    href="https\://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                Relatert+informasjon/Ferie+med+ytelser+fra+NAV.351695.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om ferie
                    <br />
                </Link>
                <strong>Annet fravær eller endringer -</strong> du er selv ansvarlig for å gi beskjed til NAV om
                endringer som har betydning for gjennomføringen av aktivitetsplanen.&nbsp;
                <Link
                    href="https\://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+utlandet/Nyttig+a+vite/
                Du+har+plikt+til+%C3%A5+gi+NAV+riktige+opplysninger.351762.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om endringer.
                </Link>
            </BodyLong>

            <BodyLong size="small">Tips fra NAV: Merk av i kalenderen din når du skal sende neste meldekort</BodyLong>
        </VStack>
    );
};
