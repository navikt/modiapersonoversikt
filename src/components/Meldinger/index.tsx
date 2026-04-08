import { VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useTraader } from 'src/components/Meldinger/List/utils';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { TraadDetail } from './Detail';

export const MeldingerPage = () => {
    return (
        <ErrorBoundary boundaryName="traadlist" errorText="Det oppstod en feil under lasting av meldinger.">
            <MeldingerPageContent />
        </ErrorBoundary>
    );
};

const MeldingerPageContent = () => {
    const { errorMessages: traadErrorMessages } = useTraader();
    const { errorMessages: temaErrorMessages } = useGsakTema();

    return (
        <VStack height="100%">
            <AlertBanner alerts={[...traadErrorMessages, ...temaErrorMessages]} />
            <TraadDetail />
        </VStack>
    );
};
