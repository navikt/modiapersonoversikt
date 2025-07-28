import { HGrid, Heading, Skeleton, VStack } from '@navikt/ds-react';
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
                <HGrid
                    gap="1"
                    columns={{ xs: 1, md: 'max-content 1fr' }}
                    className="h-full overflow-scroll md:overflow-hidden"
                >
                    <VStack height="100%" className="md:overflow-hidden md:max-w-[16em]">
                        <Heading size="xsmall">Ytelser</Heading>
                        <YtelserList />
                    </VStack>
                    <VStack className="min-h-100 md:min-h-0 overflow-hidden md:overflow-scroll">
                        <ValgteYtelseDetailPage />
                    </VStack>
                </HGrid>
            </Suspense>
        </ErrorBoundary>
    );
};
