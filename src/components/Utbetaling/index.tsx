import { HGrid, Heading, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { UtbetalingerDetailPage } from 'src/components/Utbetaling/Detail';
import { UtbetalingList } from 'src/components/Utbetaling/List';
import { useFilterUtbetalinger } from 'src/components/Utbetaling/List/utils';

export const UtbetalingPage = () => {
    return (
        <ErrorBoundary boundaryName="UtbetalingPage" errorText="Det oppstod en feil under lasting av utbetalinger.">
            <UtbetalingPageContent />
        </ErrorBoundary>
    );
};

const UtbetalingPageContent = () => {
    const { errorMessages } = useFilterUtbetalinger();

    return (
        <HGrid gap="1" columns={{ xs: 1, md: 'max-content 1fr' }} height="100%" overflow={{ xs: 'auto', md: 'hidden' }}>
            <VStack height="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading size="small" visuallyHidden level="2">
                    Utbetalinger
                </Heading>
                <ErrorBoundary
                    boundaryName="UtbetalingerList"
                    errorText="Det oppstod en feil under visning av utbetalinger liste"
                >
                    <UtbetalingList />
                </ErrorBoundary>
            </VStack>
            <VStack className="min-h-100 md:min-h-0">
                <AlertBanner alerts={errorMessages} />
                <UtbetalingerDetailPage />
            </VStack>
        </HGrid>
    );
};
