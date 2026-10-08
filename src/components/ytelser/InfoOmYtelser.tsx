import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, Link, ReadMore, Table, VStack } from '@navikt/ds-react';
import { Link as RouterLink } from '@tanstack/react-router';

const tilgjengeligeYtelser = [
    {
        navn: 'Sykepenger (Infotrygd)',
        opplysninger: 'Sykepengertilfelle, sykmelding, arbeidssituasjon, utbetalinger og utbetalinger på vent.'
    },
    { navn: 'Sykepenger (Speil)', opplysninger: 'Utbetalte perioder og grad.' },
    { navn: 'Dagpenger', opplysninger: 'Perioder, sats og gjenstående dager.' },
    { navn: 'Foreldrepenger', opplysninger: 'Saksnummer, perioder og grad.' },
    { navn: 'Svangerskapspenger', opplysninger: 'Saksnummer, perioder og grad.' },
    { navn: 'Engangsstønad', opplysninger: 'Saksnummer og dato.' },
    {
        navn: 'Arbeidsavklaringspenger',
        opplysninger: 'Vedtak, periode, rettighet, status, kilde, dagsats, barnetillegg og eventuell opphørsårsak.'
    },
    { navn: 'Tiltakspenger', opplysninger: 'Periode, kilde, rettighet, sats og barnetillegg.' },
    { navn: 'Pensjon', opplysninger: 'Sakstype, status, periode og enhet.' }
];

export const InfoOmYtelser = () => {
    return (
        <Box padding="space-16" flexGrow="0" background="info-soft">
            <Heading level="2" size="small" spacing id="ytelser-under-arbeid">
                Ytelser
            </Heading>
            <BodyShort size="small" spacing>
                Her kan du finne mer informasjon om enkeltytelser på bruker. Ytelsessiden kan i kombinasjon med{' '}
                <RouterLink className="aksel-link" to="/new/person/utbetaling">
                    utbetalingssiden
                </RouterLink>{' '}
                brukes for å få et helhetlig bilde av bruker. Vi jobber aktivt med å supplementere med mer data på
                ytelsene, samt få inn flere typer.
            </BodyShort>
            <ReadMore header="Les mer om tilgjengelige ytelser" size="small">
                <VStack gap="space-16">
                    <BodyShort size="small">
                        Tabellen viser hvilke ytelser siden støtter. Mengden og typen opplysninger varierer mellom
                        ytelsene og avhenger av hva saksbehandlingssystemene deler.
                    </BodyShort>
                    <Box className="overflow-x-auto">
                        <Table size="small" aria-label="Tilgjengelige ytelser" id="ytelser-tabell-xsmall">
                            <Table.Header className="text-ax-small">
                                <Table.Row>
                                    <Table.HeaderCell scope="col">Ytelse</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">Tilgjengelige opplysninger</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {tilgjengeligeYtelser.map((ytelse) => (
                                    <Table.Row key={ytelse.navn}>
                                        <Table.HeaderCell scope="row">{ytelse.navn}</Table.HeaderCell>
                                        <Table.DataCell>{ytelse.opplysninger}</Table.DataCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Box>
                </VStack>
            </ReadMore>
            <BodyShort size="small" className="pt-2">
                Meld gjerne fra om endringsbehov til informasjon om ytelser i{' '}
                <Link
                    href="https://jira.adeo.no/plugins/servlet/desk/portal/541"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Porten
                    <ExternalLinkIcon aria-hidden />
                </Link>
            </BodyShort>
        </Box>
    );
};
