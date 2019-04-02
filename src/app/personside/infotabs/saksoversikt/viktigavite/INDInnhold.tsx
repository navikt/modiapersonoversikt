import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';

export function ViktigÅViteINDInnhold(): JSX.Element {
    return (
        <div>
            <Undertittel>Informasjon om meldekort</Undertittel>
            <Normaltekst>
                Hvis du mottar tiltakspenger må du regelmessig holde NAV orientert om situasjonen din. Det gjør du ved å
                fylle ut og sende inn meldekort hver 14. dag.&nbsp;
                <a
                    href="https://www-q1.nav.no/no/Person/Arbeid/Dagpenger+og+stonader+ved+arbeidsloshet/
                Informasjon+om+meldekort"
                    target="_blank"
                >
                    Les mer om meldekort
                </a>
            </Normaltekst>
            <br />
            <Undertittel>Meld fra om endringer</Undertittel>
            <Normaltekst>
                Hvis du får endringer i inntekt, familiesituasjon og/eller jobbsituasjon, eller planlegger opphold i
                utlandet, kan det ha betydning for beløpet du får utbetalt fra NAV. I slike tilfeller må du derfor&nbsp;
                <a
                    href="https://www-q1.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+utlandet/Nyttig+a+vite/
                Du+har+plikt+til+%C3%A5+gi+NAV+riktige+opplysninger.351762.cms"
                    target="_blank"
                >
                    straks melde fra til NAV.
                </a>
            </Normaltekst>
            <br />
            <Undertittel>Jobbsøkertips</Undertittel>
            <Normaltekst>
                Her finner du en oversikt med nyttige tips og råd til deg som skal søke jobb. Målet er å hjelpe deg til
                å bli en god jobbsøker slik at du har større sjanser til å få en jobb du trives med.&nbsp;
                <a
                    href="https://www-q1.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips"
                    target="_blank"
                >
                    Les mer om jobbsøkertips
                </a>
            </Normaltekst>
            <br />
            <Undertittel>Om stønader ved tiltak</Undertittel>
            <Normaltekst>
                Arbeidsrettede tiltak er et virkemiddel for å styrke tiltaksdeltakerens muligheter til å få eller
                beholde arbeid. Deltar du på et arbeidsrettet tiltak har du rett til enkelte økonomiske ytelser.&nbsp;
                <a
                    href="https://www-q1.nav.no/no/Person/Arbeid/Dagpenger+og+stonader+ved+arbeidsloshet/
                St%C3%B8nader+ved+tiltak.1073747255.cms"
                    target="_blank"
                >
                    Les mer om stønader ved tiltak
                </a>
            </Normaltekst>
        </div>
    );
}
