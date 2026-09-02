import { Detail, Heading, Skeleton, type SortState, VStack } from '@navikt/ds-react';
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
            <Card padding="space-16" className="h-full overflow-auto">
                <AlertBanner alerts={errorMessages} />
                <VStack gap="space-32">
                    <VStack gap="space-8">
                        <Heading level="2" size="medium">
                            Dokumenter
                        </Heading>
                        <Detail className="text-ax-text-neutral-subtle" spacing={false}>
                            Modia viser elektroniske dokumenter brukeren har sendt inn via nav.no etter 9. desember
                            2014.
                            <br /> Dokumenter som er journalført vises fra og med 4.juni 2016
                        </Detail>
                    </VStack>
                    <VStack gap="space-16">
                        <DokumenterFilter />
                        {isLoading ? (
                            <VStack gap="space-8" marginInline="space-0 space-8">
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
