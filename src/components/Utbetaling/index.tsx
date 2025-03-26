import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { HStack, Heading, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { UtbetalingerDetail } from 'src/components/Utbetaling/Detail';
import { UtbetalingerList } from 'src/components/Utbetaling/List';
import { arenaURL } from 'src/components/Utbetaling/List/utils';

export const UtbetalingPage = () => {
    return (
        <HStack gap="1" minHeight="0" flexGrow="1" wrap={false}>
            <VStack height="100%" minWidth="12em" gap="4">
                <Heading size="xsmall">Utbetalinger</Heading>
                <Link className="no-underline" to={arenaURL()} aria-label={'Se meldekort i Arena'}>
                    Se meldekort i Arena <ExternalLinkIcon aria-hidden fontSize="1.2rem" />
                </Link>
                <UtbetalingerList />
            </VStack>
            <UtbetalingerDetail />
        </HStack>
    );
};
