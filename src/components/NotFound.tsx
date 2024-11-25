import { BodyShort, Box, Heading, Link, List, Page } from '@navikt/ds-react';

const NotFound = () => {
    return (
        <Page>
            <Page.Block as="main" width="xl" gutters>
                <Box paddingBlock="20 16" data-aksel-template="404-v2">
                    <div>
                        <Heading level="1" size="large" spacing>
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
                    </div>
                </Box>
            </Page.Block>
        </Page>
    );
};

export default NotFound;
