import { Heading, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
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
    const { errorMessages } = useFilterVarsler();

    return (
        <VStack gap="1" minHeight="0" overflow="auto">
            <Heading size="small" visuallyHidden level="2">
                Varsler
            </Heading>
            <AlertBanner alerts={errorMessages} />
            <VarslerListe />
        </VStack>
    );
};
