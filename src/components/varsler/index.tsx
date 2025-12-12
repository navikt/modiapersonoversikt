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
            overflow={{ xs: 'auto', md: 'hidden' }}
        >
            <VStack height="100%" gap="1" width="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading size="small" visuallyHidden level="2">
                    Varsler
                </Heading>
                <VarslerList />
            </VStack>
            <VStack className="min-h-100 md:min-h-0">
                <VStack minHeight="0">
                    <VarselDetail />
                </VStack>
            </VStack>
        </HGrid>
    );
};
