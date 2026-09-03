import { Detail, Heading, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import { AntallTreff } from 'src/components/AntallTreff';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { VarslerListe } from 'src/components/varsler/List';
import { useFilterVarsler } from 'src/components/varsler/List/utils';

export const VarslerPage = () => {
    return (
        <ErrorBoundary errorText="Det oppstod en feil under lasting av varsler">
            <VarslerPageContent />
        </ErrorBoundary>
    );
};

const VarslerPageContent = () => {
    const { errorMessages, isError, isLoading, varsler } = useFilterVarsler();

    if (isError) {
        return <AlertBanner alerts={errorMessages} />;
    }

    return (
        <ErrorBoundary errorText="Det oppstod en feil undervisning av varsler">
            <Card padding="space-16" className="h-full overflow-auto">
                <AlertBanner alerts={errorMessages} />
                <VStack gap="space-16" minHeight="0" overflow="auto">
                    <VStack gap="space-8">
                        <Heading level="2" size="small">
                            Varsler
                        </Heading>
                        <Detail className="text-ax-text-neutral-subtle" spacing={false}>
                            Varsler vises kun ett år tilbake i tid. For eldre varsler, opprett sak i porten for manuell
                            uthenting.
                        </Detail>
                    </VStack>
                    <VStack gap="space-8">
                        <HStack>
                            <AntallTreff
                                antall={varsler.length}
                                entall="varsel"
                                flertall="varsler"
                                isLoading={isLoading}
                            />
                        </HStack>
                        {isLoading ? (
                            <VStack gap="space-8" marginInline="space-0 space-8">
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
