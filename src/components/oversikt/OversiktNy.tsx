import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Button, HGrid, HStack, Heading, VStack } from '@navikt/ds-react';
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
}: {
    title: string;
    beskrivelse: string;
    to: (typeof menuItems)[number]['href'];
}) => {
    return (
        <Card padding="4">
            <VStack justify="space-between" gap="4">
                <HStack wrap={false} gap="4" justify="space-between">
                    <Heading as="h3" size="small">
                        {title}
                    </Heading>
                </HStack>
                <VStack justify="space-between" gap="4" align="start">
                    <BodyShort>{beskrivelse}</BodyShort>
                    <Button
                        size="small"
                        variant="secondary"
                        as={Link}
                        to={to}
                        className="no-underline"
                        iconPosition="right"
                        icon={<ExternalLinkIcon aria-hidden fontSize="1rem" />}
                    >
                        {title}
                    </Button>
                </VStack>
            </VStack>
        </Card>
    );
};

function OversiktNy() {
    return (
        <VStack gap="4" paddingBlock="2" overflow="auto">
            <Card padding="4">
                <VStack align="center">
                    <Heading as="h2" size="medium">
                        Modia personoversikt
                    </Heading>
                    <BodyLong spacing>Kort beskrivelse av hva modia er</BodyLong>
                </VStack>
            </Card>
            <HGrid gap="4" columns={{ sm: 1, md: 2, lg: 3 }}>
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
        </VStack>
    );
}

export default OversiktNy;
