import { BodyLong, Box, Heading, InternalHeader, Link, VStack } from '@navikt/ds-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/personvern')({
    component: PersonvernPage
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <VStack gap="space-32">
            <Heading level="2" size="small">
                {title}
            </Heading>
            {children}
        </VStack>
    );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <VStack gap="space-8">
            <Heading level="3" size="xsmall">
                {title}
            </Heading>
            <BodyLong>{children}</BodyLong>
        </VStack>
    );
}

function PersonvernPage() {
    return (
        <Box height="100svh" overflow="auto">
            <InternalHeader>
                <InternalHeader.Title>Modia personoversikt</InternalHeader.Title>
            </InternalHeader>
            <Box paddingBlock="space-48" paddingInline="space-16">
                <VStack gap="space-32" className="max-w-3xl mx-auto">
                    <Heading level="1" size="xlarge" className="text-center">
                        Personvernerklæring
                    </Heading>
                    <Box padding="space-40" borderRadius="12">
                        <VStack gap="space-32">
                            <Section title="Personvern og sikkerhet i Modia Personoversikt">
                                <BodyLong>
                                    Modia Personoversikt er en intern arbeidsflate for veiledere og saksbehandlere i
                                    NAV. Denne personvernerklæringen er knyttet til behandlingen av personopplysninger
                                    på dette nettstedet. For utfyllende informasjon om hvordan NAV behandler
                                    personopplysninger, kan du lese mer i{' '}
                                    <Link href="https://www.nav.no/personvern">NAVs generelle personvernerklæring</Link>
                                    .
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
                                    Informasjonskapsler er små tekstfiler som plasseres på din datamaskin når du laster
                                    ned en nettside. Noen av informasjonskapslene er nødvendige for at ulike tjenester
                                    på nettsiden vår skal fungere slik vi ønsker. Funksjonen kan slås av og på i de
                                    fleste nettlesere gjennom «innstillinger», «sikkerhet» eller liknende. Hvis du slår
                                    av informasjonskapsler i nettleseren din, vil ikke all funksjonalitet virke som den
                                    skal. Informasjonskapsler inneholder ikke personopplysninger og er ingen
                                    sikkerhetsrisiko for deg.
                                </BodyLong>
                                <BodyLong>
                                    Vi bruker informasjonskapsler til å forbedre brukeropplevelsen og innholdet. Når du
                                    besøker oss sender nettleseren din opplysninger til NAVs analyseverktøy. For hver
                                    side du åpner, lagres opplysninger om hvilken side du er på, hvilken side du kommer
                                    fra og går til, hvilken nettleser du bruker, om du bruker PC eller mobile løsninger
                                    m.m. Slik kan vi forbedre flyten og opplevelsen for alle som bruker nettsiden.
                                </BodyLong>
                                <BodyLong>
                                    Opplysningene brukes til å kartlegge hvordan og hvor mye Modia Personoversikt
                                    brukes, uten å identifisere IP-adresser. Vi bruker verktøyet Umami og Lumi i
                                    analysearbeidet.
                                </BodyLong>
                                <SubSection title="Lumi">
                                    Lumi benyttes for å hente inn tilbakemeldinger fra brukerne. Når du sender inn en
                                    tilbakemelding, lagres opplysningene i Lumi for å hjelpe oss med å forbedre
                                    tjenesten. Opplysningene som samles inn inkluderer tilbakemeldingen du gir,
                                    tidspunktet for tilbakemeldingen, og en anonym ID som ikke kan knyttes til deg
                                    personlig. Vi bruker denne informasjonen for å forstå brukernes behov og forbedre
                                    Modia Personoversikt basert på tilbakemeldingene vi mottar.
                                </SubSection>
                                <SubSection title="Umami">
                                    Umami brukes til statistikk og analyse av hvordan Modia Personoversikt brukes. Umami
                                    bruker ikke informasjonskapsler, men henter inn opplysninger om nettleseren din for
                                    å lage en unik ID. Denne ID-en brukes for å skille deg fra andre brukere. For å
                                    hindre identifisering, bruker vi en egenutviklet proxy som vasker bort deler av
                                    IP-adressen din før dataene sendes til verktøyet.
                                </SubSection>
                            </Section>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
        </Box>
    );
}
