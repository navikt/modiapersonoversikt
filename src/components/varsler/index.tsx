import { Heading, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { VarslerListe } from 'src/components/varsler/List';
import { useFilterVarsler } from 'src/components/varsler/List/utils';

export const VarslerPage = () => {
    return (
        <ErrorBoundary boundaryName="varslerList" errorText="Det oppstod en feil under lasting av varsler">
            <VarslerPageContent />
        </ErrorBoundary>
    );
};

const VarslerPageContent = () => {
    const { errorMessages, isError, isLoading } = useFilterVarsler();

    if (isError) {
        return <AlertBanner alerts={errorMessages} />;
    }

    return (
        <ErrorBoundary boundaryName="VarslerTabell" errorText="Det oppstod en feil undervisning av varsler">
            <Card padding="4" className="h-full overflow-auto">
                <AlertBanner alerts={errorMessages} />
                <VStack gap="1" minHeight="0" overflow="auto">
                    <HStack align="center" gap="2">
                        <Heading size="small" visuallyHidden level="2">
                            Varsler
                        </Heading>
                    </HStack>
                    <VStack gap="4">
                        {isLoading ? (
                            <VStack gap="2" marginInline="0 2">
                                {Array(12)
                                    .keys()
                                    .map((i) => (
                                        <Skeleton key={i} variant="rectangle" height={68} />
                                    ))}
                            </VStack>
                        ) : (
                            <VarslerListe />
                        )}
                    </VStack>
                </VStack>
            </Card>
        </ErrorBoundary>
    );
};
