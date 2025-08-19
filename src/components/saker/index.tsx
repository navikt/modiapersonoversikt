import { HGrid, Heading, VStack } from '@navikt/ds-react';
import { SakDetailPage } from 'src/components/saker/Detail';
import { SakerList } from 'src/components/saker/List';

export const SakerPage = () => {
    return (
        <HGrid
            gap="1"
            columns={{ xs: 1, md: 'max-content 1fr' }}
            height="100%"
            overflow={{ xs: 'scroll', md: 'hidden' }}
        >
            <VStack height="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading size="xsmall">Saker og dokumenter</Heading>
                <SakerList />
            </VStack>
            <VStack overflow={{ xs: 'hidden', md: 'scroll' }} className="min-h-100 md:min-h-0">
                <SakDetailPage />
            </VStack>
        </HGrid>
    );
};
