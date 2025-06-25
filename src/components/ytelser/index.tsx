import { HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { Suspense } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { ValgteYtelseDetailPage } from 'src/components/ytelser/Detail';
import { YtelserList } from 'src/components/ytelser/List';

export const YtelserPage = () => {
    return (
        <ErrorBoundary boundaryName="YtelserList">
            <Suspense
                fallback={
                    <VStack gap="2" marginInline="0 2">
                        {Array(8)
                            .keys()
                            .map((i) => (
                                <Skeleton key={i} variant="rounded" height={68} />
                            ))}
                    </VStack>
                }
            >
                <HStack gap="1" minHeight="0" wrap={false}>
                    <VStack height="100%" minWidth="14em">
                        <Heading size="xsmall">Ytelser</Heading>
                        <YtelserList />
                    </VStack>
                    <ValgteYtelseDetailPage />
                </HStack>
            </Suspense>
        </ErrorBoundary>
    );
};
