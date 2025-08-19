import { BodyLong, Heading, List, VStack } from '@navikt/ds-react';

export const ViktigAaViteDagInnhold = () => {
    return (
        <VStack>
            <Heading size="xsmall">Hva forventer NAV av deg?</Heading>
            <BodyLong>
                Vi forventer at du selv aktivt forsøker å skaffe deg jobb. Du må derfor søke jobber. Dersom du ikke
                finner ledige stillinger innenfor det du ønsker å arbeide med, må du utvide jobbsøket ditt.
            </BodyLong>
            <BodyLong>
                Det gjør du selv på Ditt NAV.&nbsp;
                <a href="https://tjenester.nav.no/stillinger/" target="_blank" rel="noopener noreferrer">
                    Ledige stillinger
                </a>
            </BodyLong>
            <BodyLong>
                Tips fra NAV: Lag en god CV, tenk utradisjonelt, orienter deg i arbeidsmarkedet, skriv målrettede
                jobbsøknader og forbered deg godt til jobbintervju.
            </BodyLong>
            <List as="ul">
                <List.Item>
                    <a
                        href="https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips/Jobblogg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Bruk jobblogg
                    </a>
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
            <BodyLong>
                Er det andre områder du kan bruke kompetansen din på? Ikke la deg begrense av geografi eller bransje.
            </BodyLong>
            <BodyLong>
                Hvilken jobb kan passe for deg?&nbsp;
                <a
                    href="https://www.nav.no/no/Person/Arbeid/Test+deg+for+jobb+og+utdanning"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Interessetester og kartleggingstester
                </a>
            </BodyLong>
            <BodyLong>
                Som hovedregel kan du ikke motta dagpenger under utdanning.&nbsp;
                <a
                    href="https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsl%C3%B8shet+og+permittering/
                    Relatert+informasjon/Dagpenger+og+utdanning.345930.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om dagpenger og utdanning
                </a>
            </BodyLong>
            <br />
            <Heading size="xsmall">Hva NAV kan hjelpe deg med?</Heading>
            <BodyLong>
                <a
                    href="https://www.nav.no/no/Person/Arbeid/Oppfolging+av+arbeidssokere"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om oppfølging av arbeidssøkere
                </a>
            </BodyLong>
            <br />
            <Heading size="xsmall">Dine plikter mens du mottar dagpenger</Heading>
            <BodyLong>
                <strong>Meldekort</strong> - du skal sende meldekort hver 14. dag.&nbsp;
                <a
                    href="https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsl%C3%B8shet+og+permittering/
                    Informasjon+om+meldekort"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om meldekort
                </a>
                <br />
                <strong>Ferie</strong> - hvis du planlegger ferie eller fravær, må du søke om det.&nbsp;
                <a
                    href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/
                    Relatert+informasjon/Ferie+med+ytelser+fra+NAV.351695.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om ferie
                </a>
                <br />
                <strong>Annet fravær eller endringer</strong>- du er selv ansvarlig for å gi beskjed til NAV om
                endringer som har betydning for jobbsøkingen din.&nbsp;
                <a
                    href="https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+utlandet/Nyttig+a+vite/
                    Du+har+plikt+til+%C3%A5+gi+NAV+riktige+opplysninger.351762.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om endringer
                </a>
            </BodyLong>
            <BodyLong>Tips fra NAV: Merk av i kalenderen din når du skal sende neste meldekort</BodyLong>
        </VStack>
    );
};
