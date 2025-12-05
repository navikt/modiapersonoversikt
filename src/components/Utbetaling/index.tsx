import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, HGrid, HStack, Heading, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { UtbetalingerDetailPage } from 'src/components/Utbetaling/Detail';
import { UtbetalingerList } from 'src/components/Utbetaling/List';
import { arenaURL } from 'src/components/Utbetaling/List/utils';

export const UtbetalingPage = () => {
    return (
        <HGrid
            gap="1"
            columns={{ xs: 1, md: 'max-content 1fr' }}
            height="100%"
            overflow={{ xs: 'scroll', md: 'hidden' }}
        >
            <VStack height="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <HStack>
                    <Button
                        size="small"
                        variant="tertiary"
                        as={Link}
                        to={arenaURL()}
                        iconPosition="right"
                        aria-label="Se meldekort i Arena"
                        icon={<ExternalLinkIcon aria-hidden fontSize="1rem" />}
                    >
                        Se meldekort i Arena
                    </Button>
                </HStack>
                <Heading size="small" visuallyHidden>
                    Utbetalinger
                </Heading>
                <UtbetalingerList />
            </VStack>
            <VStack overflow={{ xs: 'hidden', md: 'scroll' }} className="min-h-100 md:min-h-0">
                <UtbetalingerDetailPage />
            </VStack>
        </HGrid>
    );
};
