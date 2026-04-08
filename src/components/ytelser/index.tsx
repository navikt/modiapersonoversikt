import { VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { ValgteYtelseDetailPage } from 'src/components/ytelser/Detail';
import { useFilterYtelser } from 'src/components/ytelser/utils';

export const YtelserPage = () => {
    return (
        <ErrorBoundary boundaryName="YtelserList" errorText="Det oppstod en feil under visning av ytelser">
            <YtelserPageContent />
        </ErrorBoundary>
    );
};

const YtelserPageContent = () => {
    const { errorMessages } = useFilterYtelser();

    return (
        <VStack height="100%">
            <AlertBanner alerts={errorMessages} />
            <ValgteYtelseDetailPage />
        </VStack>
    );
};
