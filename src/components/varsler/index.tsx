import { HGrid, Heading, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { VarselDetail } from 'src/components/varsler/Details';
import { VarslerList } from 'src/components/varsler/List';
import { useFilterVarsler } from 'src/components/varsler/List/utils';

export const VarslerPage = () => {
    return (
        <ErrorBoundary boundaryName="varslerList" errorText="Det oppstod en feil under lasting av varsler">
            <VarslerPageContent />
        </ErrorBoundary>
    );
};

const VarslerPageContent = () => {
    const { errorMessages } = useFilterVarsler();

    return (
        <HGrid
            gap="1"
            columns={{ xs: 1, md: 'max-content 1fr' }}
            height="100%"
            width="100%"
            overflow={{ xs: 'auto', md: 'hidden' }}
        >
            <VStack height="100%" gap="1" width="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading size="small" visuallyHidden level="2">
                    Varsler
                </Heading>
                <ErrorBoundary
                    boundaryName="VarslerList"
                    errorText="Det oppstod en feil under visning av varsler liste"
                >
                    <VarslerList />
                </ErrorBoundary>
            </VStack>
            <VStack className="min-h-100 md:min-h-0">
                <AlertBanner alerts={errorMessages} />
                <VarselDetail />
            </VStack>
        </HGrid>
    );
};
