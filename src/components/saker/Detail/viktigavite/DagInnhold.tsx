import { BodyLong, Heading, Link, List, VStack } from '@navikt/ds-react';

export const ViktigAaViteDagInnhold = () => {
    return (
        <VStack gap="space-8">
            <Heading size="xsmall">Hva forventer NAV av deg?</Heading>
            <BodyLong size="small">
                Vi forventer at du selv aktivt forsøker å skaffe deg jobb. Du må derfor søke jobber. Dersom du ikke
                finner ledige stillinger innenfor det du ønsker å arbeide med, må du utvide jobbsøket ditt.
            </BodyLong>
            <BodyLong size="small">
                Det gjør du selv på Ditt NAV.&nbsp;
                <Link href="https://tjenester.nav.no/stillinger/" target="_blank" rel="noopener noreferrer">
                    Ledige stillinger
                </Link>
            </BodyLong>
            <BodyLong size="small">
                Tips fra NAV: Lag en god CV, tenk utradisjonelt, orienter deg i arbeidsmarkedet, skriv målrettede
                jobbsøknader og forbered deg godt til jobbintervju.
            </BodyLong>
            <List as="ul" size="small">
                <List.Item>
                    <Link
                        href="https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips/Jobblogg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Bruk jobblogg
                    </Link>
                </List.Item>
                <List.Item>
                    <a
                        href="https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Les mer om jobbsøkertips
                    </a>
                </List.Item>
            </List>
            <br />
            <Heading size="xsmall">Kjenner du dine muligheter?</Heading>
            <BodyLong size="small">
                Er det andre områder du kan bruke kompetansen din på? Ikke la deg begrense av geografi eller bransje.
            </BodyLong>
            <BodyLong size="small">
                Hvilken jobb kan passe for deg?&nbsp;
                <Link
                    href="https://www.nav.no/no/Person/Arbeid/Test+deg+for+jobb+og+utdanning"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Interessetester og kartleggingstester
                </Link>
            </BodyLong>
            <BodyLong size="small">
                Som hovedregel kan du ikke motta dagpenger under utdanning.&nbsp;
                <Link
                    href="https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsl%C3%B8shet+og+permittering/
                    Relatert+informasjon/Dagpenger+og+utdanning.345930.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om dagpenger og utdanning
                </Link>
            </BodyLong>
            <br />
            <Heading size="xsmall">Hva NAV kan hjelpe deg med?</Heading>
            <BodyLong size="small">
                <Link
                    href="https://www.nav.no/no/Person/Arbeid/Oppfolging+av+arbeidssokere"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om oppfølging av arbeidssøkere
                </Link>
            </BodyLong>
            <br />
            <Heading size="xsmall">Dine plikter mens du mottar dagpenger</Heading>
            <BodyLong size="small">
                <strong>Meldekort</strong> - du skal sende meldekort hver 14. dag.&nbsp;
                <Link
                    href="https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsl%C3%B8shet+og+permittering/
                    Informasjon+om+meldekort"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om meldekort
                </Link>
                <br />
                <strong>Ferie</strong> - hvis du planlegger ferie eller fravær, må du søke om det.&nbsp;
                <Link
                    href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                    Relatert+informasjon/Ferie+med+ytelser+fra+NAV.351695.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om ferie
                </Link>
                <br />
                <strong>Annet fravær eller endringer</strong>- du er selv ansvarlig for å gi beskjed til NAV om
                endringer som har betydning for jobbsøkingen din.&nbsp;
                <Link
                    href="https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+utlandet/Nyttig+a+vite/
                    Du+har+plikt+til+%C3%A5+gi+NAV+riktige+opplysninger.351762.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om endringer
                </Link>
            </BodyLong>
            <BodyLong size="small">Tips fra NAV: Merk av i kalenderen din når du skal sende neste meldekort</BodyLong>
        </VStack>
    );
};
