import { HGrid, Heading, VStack } from '@navikt/ds-react';
import { VarselDetail } from 'src/components/varsler/Details';
import { VarslerList } from 'src/components/varsler/List';

export const VarslerPage = () => {
    return (
        <HGrid
            gap="1"
            columns={{ xs: 1, md: 'max-content 1fr' }}
            height="100%"
            width="100%"
            overflow={{ xs: 'scroll', md: 'hidden' }}
        >
            <VStack height="100%" gap="1" width="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading size="small">Varsler</Heading>
                <VarslerList />
            </VStack>
            <VStack className="min-h-100 md:min-h-0" overflow={{ xs: 'hidden', md: 'scroll' }}>
                <VStack minHeight="0" className="mt-6">
                    <VarselDetail />
                </VStack>
            </VStack>
        </HGrid>
    );
};
