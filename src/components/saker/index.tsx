import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { SakDetailPage } from 'src/components/saker/Detail';
import { SakerList } from 'src/components/saker/List';
import { useFilterSaker } from 'src/components/saker/utils';

export const SakerPage = () => {
    return (
        <ErrorBoundary boundaryName="SakerPage" errorText="Det oppstod en feil under lasting av saker og dokumenter.">
            <SakerPageContent />
        </ErrorBoundary>
    );
};

const SakerPageContent = () => {
    const { errorMessages } = useFilterSaker();

    return (
        <HGrid
            gap="1"
            columns={{ xs: 1, md: 'max-content 1fr' }}
            height="100%"
            overflow={{ xs: 'scroll', md: 'hidden' }}
        >
            <VStack height="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading size="small" visuallyHidden level="2">
                    Saker og dokumenter
                </Heading>
                <SakerList />
            </VStack>
            <VStack className="min-h-100 md:min-h-0">
                <AlertBanner alerts={errorMessages} />
                <SakDetailPage />
            </VStack>
        </HGrid>
    );
};
