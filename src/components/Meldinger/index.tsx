import { Box, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useTraader } from 'src/components/Meldinger/List/utils';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { TraadDetail } from './Detail';

export const MeldingerPage = () => {
    return (
        <ErrorBoundary errorText="Det oppstod en feil under lasting av meldinger.">
            <MeldingerPageContent />
        </ErrorBoundary>
    );
};

const MeldingerPageContent = () => {
    const { errorMessages: traadErrorMessages } = useTraader();
    const { errorMessages: temaErrorMessages } = useGsakTema();
    const alerts = [...traadErrorMessages, ...temaErrorMessages];

    return (
        <VStack height="100%" minHeight={{ xs: '0', sm: 'auto' }}>
            {alerts.length > 0 && (
                <Box
                    flexShrink={{ xs: '0', sm: '1' }}
                    maxHeight={{ xs: '30%', sm: 'none' }}
                    overflowY={{ xs: 'auto', sm: 'visible' }}
                >
                    <AlertBanner alerts={alerts} />
                </Box>
            )}
            <TraadDetail />
        </VStack>
    );
};
