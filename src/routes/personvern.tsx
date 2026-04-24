import { BodyLong, Heading, InternalHeader, Link } from '@navikt/ds-react';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/personvern')({
    component: PersonvernPage
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <Heading level="2" size="small" spacing>
                {title}
            </Heading>
            <div className="flex flex-col gap-4">{children}</div>
        </section>
    );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <Heading level="3" size="xsmall" spacing>
                {title}
            </Heading>
            <BodyLong>{children}</BodyLong>
        </div>
    );
}

function PersonvernPage() {
    useEffect(() => {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="min-h-screen bg-[var(--ax-bg-sunken,#f2f3f5)]">
            <InternalHeader>
                <InternalHeader.Title>Modia personoversikt</InternalHeader.Title>
            </InternalHeader>
            <div className="py-12 px-4">
                <Heading level="1" size="xlarge" className="text-center mb-8">
                    Personvernerklæring
                </Heading>
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-10">
                    <div className="flex flex-col gap-8">
                        <Section title="Personvern og sikkerhet i Modia Personoversikt">
                            <BodyLong>
                                Modia Personoversikt er en intern arbeidsflate for veiledere og saksbehandlere i NAV.
                                Denne personvernerklæringen er knyttet til behandlingen av personopplysninger på dette
                                nettstedet. For utfyllende informasjon om hvordan NAV behandler personopplysninger, kan
                                du lese mer i{' '}
                                <Link href="https://www.nav.no/personvern">NAVs generelle personvernerklæring</Link>.
                            </BodyLong>
                            <BodyLong>
                                <Link href="https://etterlevelse.intern.nav.no/">
                                    For detaljer se Modia Personoversikts oppføring i Etterlevelse i NAV.
                                </Link>
                            </BodyLong>
                        </Section>

                        <Section title="Bruk av informasjonskapsler (cookies)">
                            <BodyLong>Når du besøker nettsiden bruker vi informasjonskapsler (cookies).</BodyLong>
                            <BodyLong>
                                Informasjonskapsler er små tekstfiler som plasseres på din datamaskin når du laster ned
                                en nettside. Noen av informasjonskapslene er nødvendige for at ulike tjenester på
                                nettsiden vår skal fungere slik vi ønsker. Funksjonen kan slås av og på i de fleste
                                nettlesere gjennom «innstillinger», «sikkerhet» eller liknende. Hvis du slår av
                                informasjonskapsler i nettleseren din, vil ikke all funksjonalitet virke som den skal.
                                Informasjonskapsler inneholder ikke personopplysninger og er ingen sikkerhetsrisiko for
                                deg.
                            </BodyLong>
                            <BodyLong>
                                Vi bruker informasjonskapsler til å forbedre brukeropplevelsen og innholdet. Når du
                                besøker oss sender nettleseren din opplysninger til Nav sitt analyseverktøy. For hver
                                side du åpner, lagres opplysninger om hvilken side du er på, hvilken side du kommer fra
                                og går til, hvilken nettleser du bruker, om du bruker PC eller mobile løsninger m.m.
                                Slik kan vi forbedre flyten og opplevelsen for alle som bruker nettsiden.
                            </BodyLong>
                            <BodyLong>
                                Opplysningene brukes til å kartlegge hvordan og hvor mye Modia Personoversikt brukes,
                                uten å identifisere IP-adresser. Vi bruker verktøyet Umami og Lumi i analysearbeidet.
                            </BodyLong>
                            <SubSection title="Lumi">
                                Lumi benyttes for å hente inn tilbakemeldinger fra brukerne. Når du sender inn en
                                tilbakemelding, lagres opplysningene i Lumi for å hjelpe oss med å forbedre tjenesten.
                                Opplysningene som samles inn inkluderer tilbakemeldingen du gir, tidspunktet for
                                tilbakemeldingen, og en anonym ID som ikke kan knyttes til deg personlig. Vi bruker
                                denne informasjonen for å forstå brukernes behov og forbedre Modia Personoversikt basert
                                på tilbakemeldingene vi mottar.
                            </SubSection>
                            <SubSection title="Umami">
                                Umami brukes til statistikk og analyse av hvordan Modia Personoversikt brukes. Umami
                                bruker ikke informasjonskapsler, men henter inn opplysninger om nettleseren din for å
                                lage en unik ID. Denne ID-en brukes for å skille deg fra andre brukere. For å hindre
                                identifisering, bruker vi en egenutviklet proxy som vasker bort deler av IP-adressen din
                                før dataene sendes til verktøyet.
                            </SubSection>
                        </Section>

                        <Section title="Feil, mangler og forbedringsforslag">
                            <BodyLong>
                                Hvis du opplever problemer eller har forslag til forbedringer hører vi veldig gjerne fra
                                deg! Feil og mangler kan rapporteres til{' '}
                                <Link href="https://nav-it.slack.com/archives/CF9RDMLDB">
                                    {' '}
                                    #team-personoversikt på Slack
                                </Link>
                                .
                            </BodyLong>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}
