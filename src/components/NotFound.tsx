import { BodyShort, Box, Heading, Link, List, Page, VStack } from '@navikt/ds-react';
import { useEffect } from 'react';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';

const NotFound = () => {
    useEffect(() => {
        trackGenereltUmamiEvent(trackingEvents.notfoundRoute);
    }, []);

    return (
        <Page>
            <Page.Block as="main" width="xl" gutters>
                <Box paddingBlock="space-80 space-64" data-aksel-template="404-v3">
                    <VStack gap="space-16">
                        <Heading level="1" size="large">
                            Beklager, vi fant ikke siden
                        </Heading>
                        <BodyShort>
                            Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                        </BodyShort>
                        <List>
                            <List.Item>Bruk gjerne søket eller menyen</List.Item>
                            <List.Item>
                                <Link href="/">Gå til forsiden</Link>
                            </List.Item>
                        </List>
                    </VStack>
                </Box>
            </Page.Block>
        </Page>
    );
};

export default NotFound;
