import { Heading, HStack, Skeleton, type SortState, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import Card from 'src/components/Card';
import { DokumenterTabell } from 'src/components/Dokumenter/DokumenterTabell';
import { DokumenterFilter } from 'src/components/Dokumenter/Filter';
import { useFilterDokumenter } from 'src/components/Dokumenter/utils';
import ErrorBoundary from 'src/components/ErrorBoundary';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';

export interface DokumenterSortState extends SortState {
    orderBy: keyof Dokumentmetadata;
}

export const DokumenterPage = () => {
    const { errorMessages, isError, isLoading } = useFilterDokumenter();

    if (isError) {
        return <AlertBanner alerts={errorMessages} />;
    }

    return (
        <ErrorBoundary boundaryName="Dokumentertabell" errorText="Det oppstod en feil under visning av dokumenter">
            <Card padding="4" className="h-full overflow-auto">
                <AlertBanner alerts={errorMessages} />
                <VStack gap="8">
                    <HStack align="center" gap="2">
                        <Heading level="2" size="medium">
                            Dokumenter
                        </Heading>
                    </HStack>
                    <VStack gap="4">
                        <DokumenterFilter />
                        {isLoading ? (
                            <VStack gap="2" marginInline="0 2">
                                {Array(12)
                                    .keys()
                                    .map((i) => (
                                        <Skeleton key={i} variant="rectangle" height={68} />
                                    ))}
                            </VStack>
                        ) : (
                            <DokumenterTabell />
                        )}
                    </VStack>
                </VStack>
            </Card>
        </ErrorBoundary>
    );
};
