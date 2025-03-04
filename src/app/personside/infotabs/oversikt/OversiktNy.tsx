import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyLong, ExpansionCard, HGrid, HStack, Heading, Link, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';

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
];

const OversiktDetailCard = ({ title, beskrivelse, href }: { title: string; beskrivelse: string; href: string }) => {
    return (
        <Card padding="4">
            <VStack justify="space-between">
                <HStack wrap={false} gap="4" align="top" justify="space-between">
                    <Heading size="medium">{title}</Heading>
                    <div className="border border-gray-400 rounded-md px-2 pt-1">
                        <Link key={title} className="no-underline" href={`${href}`} aria-label={title} variant="action">
                            <ExternalLinkIcon title={`link_til_${title}`} fontSize="1.5rem" />
                        </Link>
                    </div>
                </HStack>
                <p className="mt-4">{beskrivelse}</p>
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
                            href={item.href}
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
