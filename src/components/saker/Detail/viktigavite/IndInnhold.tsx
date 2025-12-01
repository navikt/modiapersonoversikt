import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';

export const ViktigAaViteIndInnhold = () => {
    return (
        <VStack gap="space-8">
            <Heading size="xsmall">Informasjon om meldekort</Heading>
            <BodyLong size="small">
                Hvis du mottar tiltakspenger må du regelmessig holde NAV orientert om situasjonen din. Det gjør du ved å
                fylle ut og sende inn meldekort hver 14. dag.&nbsp;
                <Link
                    href="https://www-q1.nav.no/no/Person/Arbeid/Dagpenger+og+stonader+ved+arbeidsloshet/
                Informasjon+om+meldekort"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om meldekort
                </Link>
            </BodyLong>
            <br />
            <Heading size="xsmall">Meld fra om endringer</Heading>
            <BodyLong size="small">
                Hvis du får endringer i inntekt, familiesituasjon og/eller jobbsituasjon, eller planlegger opphold i
                utlandet, kan det ha betydning for beløpet du får utbetalt fra NAV.
            </BodyLong>
            <BodyLong size="small">
                I slike tilfeller må du derfor&nbsp;
                <Link
                    href="https://www-q1.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+utlandet/Nyttig+a+vite/Du+har+plikt+til+%C3%A5+gi+NAV+riktige+opplysninger.351762.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    straks melde fra til NAV.
                </Link>
            </BodyLong>
            <br />
            <Heading size="xsmall">Jobbsøkertips</Heading>
            <BodyLong size="small">
                Her finner du en oversikt med nyttige tips og råd til deg som skal søke jobb. Målet er å hjelpe deg til
                å bli en god jobbsøker slik at du har større sjanser til å få en jobb du trives med.&nbsp;
                <Link
                    href="https://www-q1.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om jobbsøkertips
                </Link>
            </BodyLong>
            <BodyLong size="small">
                Her finner du en oversikt med nyttige tips og råd til deg som skal søke jobb. Målet er å hjelpe deg til
                å bli en god jobbsøker slik at du har større sjanser til å få en jobb du trives med.&nbsp;
                <Link
                    href="https://www-q1.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om jobbsøkertips
                </Link>
            </BodyLong>
            <br />
            <Heading size="xsmall">Om stønader ved tiltak</Heading>
            <BodyLong size="small">
                Arbeidsrettede tiltak er et virkemiddel for å styrke tiltaksdeltakerens muligheter til å få eller
                beholde arbeid. Deltar du på et arbeidsrettet tiltak har du rett til enkelte økonomiske ytelser.&nbsp;
                <Link
                    href="https://www-q1.nav.no/no/Person/Arbeid/Dagpenger+og+stonader+ved+arbeidsloshet/
                St%C3%B8nader+ved+tiltak.1073747255.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Les mer om stønader ved tiltak
                </Link>
            </BodyLong>
        </VStack>
    );
};
