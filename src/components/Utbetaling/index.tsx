import { Heading, Skeleton, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { UtbetalingListFilter } from 'src/components/Utbetaling/Filter';
import { Utbetalinger } from 'src/components/Utbetaling/Utbetalinger';
import { useFilterUtbetalinger } from 'src/components/Utbetaling/utils';

export const UtbetalingPage = () => {
    return (
        <ErrorBoundary boundaryName="UtbetalingPage" errorText="Det oppstod en feil under lasting av utbetalinger.">
            <UtbetalingPageContent />
        </ErrorBoundary>
    );
};

const UtbetalingPageContent = () => {
    const { errorMessages, isError, isLoading } = useFilterUtbetalinger();

    if (isError) {
        return <AlertBanner alerts={errorMessages} />;
    }

    return (
        <ErrorBoundary boundaryName="Dokumentertabell" errorText="Det oppstod en feil under visning av utbetalinger">
            <Card padding="4" className="h-full overflow-auto">
                <AlertBanner alerts={errorMessages} />
                <VStack gap="8">
                    <Heading level="2" size="medium">
                        Utbetalinger
                    </Heading>
                    <UtbetalingListFilter />
                    {isLoading ? (
                        <VStack gap="2" marginInline="0 2">
                            {Array(12)
                                .keys()
                                .map((i) => (
                                    <Skeleton key={i} variant="rectangle" height={68} />
                                ))}
                        </VStack>
                    ) : (
                        <Utbetalinger />
                    )}
                </VStack>
            </Card>
        </ErrorBoundary>
    );
};
