import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { ValgteYtelseDetailPage } from 'src/components/ytelser/Detail';
import { YtelserList } from 'src/components/ytelser/List';
import { useFilterYtelser } from 'src/components/ytelser/utils';

export const YtelserPage = () => {
    return (
        <ErrorBoundary boundaryName="YtelserList" errorText="Det oppstod en feil under lasting av ytelser">
            <YtelserPageContent />
        </ErrorBoundary>
    );
};

const YtelserPageContent = () => {
    const { errorMessages } = useFilterYtelser();

    return (
        <HGrid gap="1" columns={{ xs: 1, md: 'max-content 1fr' }} height="100%" overflow={{ xs: 'auto', md: 'hidden' }}>
            <VStack height="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading size="small" visuallyHidden level="2">
                    Ytelser
                </Heading>
                <ErrorBoundary
                    boundaryName="YtelserList"
                    errorText="Det oppstod en feil under visning av ytelser liste"
                >
                    <YtelserList />
                </ErrorBoundary>
            </VStack>
            <VStack className="min-h-100 md:min-h-0">
                <AlertBanner alerts={errorMessages} />
                <ValgteYtelseDetailPage />
            </VStack>
        </HGrid>
    );
};
