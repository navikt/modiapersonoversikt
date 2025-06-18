import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { UtbetalingerDetailPage } from 'src/components/Utbetaling/Detail';
import { UtbetalingerList } from 'src/components/Utbetaling/List';
import { arenaURL } from 'src/components/Utbetaling/List/utils';

export const UtbetalingPage = () => {
    return (
        <HStack gap="1" minHeight="0" flexGrow="1" wrap={false}>
            <VStack height="100%" minWidth="12em">
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
            <UtbetalingerDetailPage />
        </HStack>
    );
};
