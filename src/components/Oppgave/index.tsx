import { HGrid, Heading, VStack } from '@navikt/ds-react';
import { OppgaveDetail } from 'src/components/Oppgave/Details';
import { OppgaverList } from 'src/components/Oppgave/List';

export const OppgaverPage = () => {
    return (
        <HGrid
            gap="1"
            columns={{ xs: 1, md: 'max-content 1fr' }}
            height="100%"
            width="100%"
            overflow={{ xs: 'scroll', md: 'hidden' }}
        >
            <VStack height="100%" gap="1" width="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading size="small">Oppgaver</Heading>
                <OppgaverList />
            </VStack>
            <VStack className="min-h-100 md:min-h-0" overflow={{ xs: 'hidden', md: 'scroll' }}>
                <VStack minHeight="0" className="mt-6">
                    <OppgaveDetail />
                </VStack>
            </VStack>
        </HGrid>
    );
};
