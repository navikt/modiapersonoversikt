import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HGrid, HStack, Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { Link } from 'src/components/Link';

const menuItems = [] as const;

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
