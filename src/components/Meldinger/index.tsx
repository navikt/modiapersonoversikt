import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useGsakTemaer, useTraader } from 'src/components/Meldinger/List/utils';
import { TraadDetail } from './Detail';
import { TraadList } from './List';

export const MeldingerPage = () => {
    return (
        <ErrorBoundary boundaryName="traadlist" errorText="Det oppstod en feil under lasting av meldinger.">
            <MeldingerPageContent />
        </ErrorBoundary>
    );
};

const MeldingerPageContent = () => {
    const { errorMessages: traadErrorMessages } = useTraader();
    const { errorMessages: temaErrorMessages } = useGsakTemaer();

    return (
        <HGrid
            gap="1"
            columns={{ xs: 1, md: 'max-content 1fr' }}
            overflow={{ xs: 'scroll', md: 'hidden' }}
            height="100%"
        >
            <VStack height="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading level="2" size="small" visuallyHidden>
                    Dialoger
                </Heading>
                <TraadList />
            </VStack>
            <VStack flexGrow="1" overflowX={{ md: 'hidden' }}>
                <AlertBanner alerts={[...traadErrorMessages, ...temaErrorMessages]} />
                <TraadDetail />
            </VStack>
        </HGrid>
    );
};
