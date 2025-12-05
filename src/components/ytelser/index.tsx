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
                    height="100%"
                    overflow={{ xs: 'scroll', md: 'hidden' }}
                >
                    <VStack height="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                        <Heading size="small" visuallyHidden>
                            Ytelser
                        </Heading>
                        <YtelserList />
                    </VStack>
                    <VStack className="min-h-100 md:min-h-0" overflow={{ xs: 'hidden', md: 'scroll' }}>
                        <ValgteYtelseDetailPage />
                    </VStack>
                </HGrid>
            </Suspense>
        </ErrorBoundary>
    );
};
