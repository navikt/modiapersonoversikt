import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, ExpansionCard, HGrid, HStack, Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { Link } from 'src/components/Link';

const menuItems = [
    {
        title: 'Oppfølging',
        href: '/new/person/oppfolging',
        beskrivelse: 'Kort beskrivelse av hva oppfølging er'
    },
    {
        title: 'Kommunikasjon',
        href: '/new/person/meldinger',
        beskrivelse: 'Kort beskrivelse av hva kommunikasjon er'
    },
    {
        title: 'Arbeid',
        href: '/new/person/arbeid',
        beskrivelse: 'Kort beskrivelse av hva arbeid er'
    },
    {
        title: 'Utbetaling',
        href: '/new/person/utbetaling',
        beskrivelse: 'Kort beskrivelse av hva utbetaling er'
    },
    {
        title: 'Ytelser',
        href: '/new/person/ytelser',
        beskrivelse: 'Kort beskrivelse av hva ytelser er'
    },
    {
        title: 'Dokumenter',
        href: '/new/person/saker',
        beskrivelse: 'Kort beskrivelse av hva dokumenter er'
    },
    {
        title: 'Varsler',
        href: '/new/person/varsler',
        beskrivelse: 'Kort beskrivelse av hva varsler er'
    }
] as const;

const OversiktDetailCard = ({
    title,
    beskrivelse,
    to
}: { title: string; beskrivelse: string; to: (typeof menuItems)[number]['href'] }) => {
    return (
        <Card padding="4">
            <VStack justify="space-between" gap="4">
                <HStack wrap={false} gap="4" justify="space-between">
                    <Heading size="medium">{title}</Heading>
                    <Card flexGrow={0}>
                        <VStack align="center" className="p-2">
                            <Link key={title} className="no-underline" to={to} aria-label={title} variant="action">
                                <ExternalLinkIcon aria-hidden fontSize="1.5rem" />
                            </Link>
                        </VStack>
                    </Card>
                </HStack>
                <BodyShort>{beskrivelse}</BodyShort>
            </VStack>
        </Card>
    );
};

function OversiktNy() {
    return (
        <VStack gap="4" paddingBlock="2">
            <Card padding="4">
                <VStack align="center">
                    <Heading size="large">Modia personoversikt</Heading>
                    <BodyLong spacing>Kort beskrivelse av hva modia er</BodyLong>
                </VStack>
            </Card>
            <HGrid gap="4" columns={3}>
                {menuItems.map((item) => {
                    return (
                        <OversiktDetailCard
                            key={item.title}
                            title={item.title}
                            beskrivelse={item.beskrivelse}
                            to={item.href}
                        />
                    );
                })}
            </HGrid>

            <ExpansionCard aria-label="Hvor henter vi informasjon fra?">
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Hvor henter vi informasjon fra?</ExpansionCard.Title>
                    <ExpansionCard.Description>Hvilke data henter vi ut, og fra hvor?</ExpansionCard.Description>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <BodyLong spacing>Hvis du er helt eller delvis</BodyLong>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
}

export default OversiktNy;
