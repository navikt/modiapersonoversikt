import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { OppgaveDetail } from 'src/components/Oppgave/Details';
import { OppgaverList } from 'src/components/Oppgave/List';
import { useFilterOppgave } from 'src/components/Oppgave/List/utils';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';

export const OppgaverPage = () => {
    return (
        <ErrorBoundary boundaryName="OppgaverPage" errorText="Det oppstod en feil under lasting av oppgaver.">
            <OppgaverPageContent />
        </ErrorBoundary>
    );
};

const OppgaverPageContent = () => {
    const { errorMessages: oppgaveErrorMessages } = useFilterOppgave();
    const { errorMessages: temaErrorMessages } = useGsakTema();
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
                    Oppgaver
                </Heading>
                <OppgaverList />
            </VStack>
            <VStack className="min-h-100 md:min-h-0">
                <AlertBanner alerts={[...oppgaveErrorMessages, ...temaErrorMessages]} />
                <VStack minHeight="0">
                    <OppgaveDetail />
                </VStack>
            </VStack>
        </HGrid>
    );
};
