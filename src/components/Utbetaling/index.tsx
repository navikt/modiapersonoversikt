import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, HGrid, HStack, Heading, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { UtbetalingerDetailPage } from 'src/components/Utbetaling/Detail';
import { UtbetalingerList } from 'src/components/Utbetaling/List';
import { arenaURL } from 'src/components/Utbetaling/List/utils';

export const UtbetalingPage = () => {
    return (
        <HGrid gap="1" columns={{ xs: 1, md: 2 }} className="h-full overflow-scroll md:overflow-hidden">
            <VStack height="100%" minWidth="12em" className="md:overflow-hidden">
                <Heading size="xsmall">Utbetalinger</Heading>
                <HStack>
                    <Button
                        size="small"
                        variant="tertiary"
                        as={Link}
                        to={arenaURL()}
                        iconPosition="right"
                        aria-label={'Se meldekort i Arena'}
                        icon={<ExternalLinkIcon aria-hidden fontSize="1rem" />}
                    >
                        Se meldekort i Arena
                    </Button>
                </HStack>
                <UtbetalingerList />
            </VStack>
            <VStack className="min-h-100 md:min-h-0 overflow-hidden md:overflow-scroll">
                <UtbetalingerDetailPage />
            </VStack>
        </HGrid>
    );
};
