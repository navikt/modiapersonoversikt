import { BodyLong, Heading, List } from '@navikt/ds-react';

export const ViktigAaViteAapInnhold = () => {
    return (
        <div>
            <Heading size="xsmall">Dette må du vite</Heading>
            <BodyLong>
                Arbeidsavklaringspenger kan du få i en begrenset periode. Det er derfor viktig å avklare mulighetene
                dine til jobb så tidlig som mulig, slik at du får benyttet tiden din godt.
                <br />
                <a
                    href="https\://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                Arbeidsavklaringspenger+%28AAP%29.217377.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om arbeidsavklaringspenger
                </a>
            </BodyLong>

            <BodyLong>Tips fra NAV: Tenk jobbmuligheter.</BodyLong>

            <List as="ul">
                <List.Item>
                    <a
                        href="https\://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Jobbsøketips
                    </a>
                    &nbsp;gir deg en oversikt over nyttige tips og råd.
                </List.Item>

                <List.Item>
                    <a href="https\://tjenester.nav.no/akademia/startside?1" target="_blank" rel="noopener noreferrer">
                        Interessetesten Akademia
                    </a>
                    &nbsp;er et arbeidsverktøy til å finne ut mer om stillinger, arbeidsområder og arbeidslivet generelt
                </List.Item>
            </List>

            <Heading size="xsmall">Krav til aktivitet og aktivitetsplan</Heading>

            <BodyLong>
                For å få arbeidsavklaringspenger må du delta aktivt for å komme i arbeid. Aktivitetene som skal bidra
                til at du kommer i jobb, skal framgå av en plan.
            </BodyLong>
            <BodyLong>
                Aktivitetsplanen skal du og NAV utarbeide i felleskap. En plan kan inneholde både arbeidsrettede tiltak
                og medisinsk behandling.
                <br />
                <a
                    href="https\://www.nav.no/no/Person/Arbeid/Oppfolging+av+arbeidssokere/Relatert+informasjon/
                Aktivitetsplan.347229.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om aktivitetsplan
                </a>
            </BodyLong>
            <Heading size="xsmall">Trenger du arbeidsrettede tiltak eller medisinsk behandling?</Heading>

            <BodyLong>
                NAV har flere tiltak og virkemidler til deg som skal tilbake i arbeid eller hindre frafall fra
                arbeidslivet.
            </BodyLong>
            <BodyLong>
                Du og fastlegen din eller annen behandler er ansvarlig for den medisinske behandlingen din.
                <br />
                <a
                    href="https\://www.nav.no/no/Bedrift/Rekruttering/Arbeidsrettede+tiltak"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om arbeidsrettede tiltak
                </a>
            </BodyLong>

            <Heading size="xsmall">Tilleggsstønader</Heading>

            <BodyLong>
                Du kan få hel eller delvis dekning av konkrete utgifter du har i forbindelse med gjennomføring av
                aktiviteter i planen. Dette kommer i tillegg til arbeidsavklaringspengene.
                <br />
                <a
                    href="https\://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                Relatert+informasjon/Tilleggsst%C3%B8nader.346092.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om tilleggsstønader
                </a>
            </BodyLong>

            <Heading size="xsmall">Dine plikter mens du mottar arbeidsavklaringspenger</Heading>

            <BodyLong>
                <strong>Vær aktiv</strong> - følg opp aktivitetsplanen din
                <br />
                <strong>Meldekort</strong> - du skal sende meldekort hver 14. dag.&nbsp;
                <a
                    href="https\://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                Relatert+informasjon/Meldekort+-+arbeidsavklaringspenger.346078.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om meldekort
                </a>
                <br />
                <strong>Ferie</strong> - hvis du planlegger ferie eller frav ær, må du søke om det.&nbsp;
                <a
                    href="https\://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                Relatert+informasjon/Ferie+med+ytelser+fra+NAV.351695.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om ferie
                    <br />
                </a>
                <strong>Annet fravær eller endringer -</strong> du er selv ansvarlig for å gi beskjed til NAV om
                endringer som har betydning for gjennomføringen av aktivitetsplanen.&nbsp;
                <a
                    href="https\://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+utlandet/Nyttig+a+vite/
                Du+har+plikt+til+%C3%A5+gi+NAV+riktige+opplysninger.351762.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om endringer.
                </a>
            </BodyLong>

            <BodyLong>Tips fra NAV: Merk av i kalenderen din når du skal sende neste meldekort</BodyLong>
        </div>
    );
};
