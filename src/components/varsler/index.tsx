import { HGrid, Heading, VStack } from '@navikt/ds-react';
import { VarselDetail } from 'src/components/varsler/Details';
import { VarslerList } from 'src/components/varsler/List';

export const VarslerPage = () => {
    return (
        <HGrid
            gap="1"
            columns={{ xs: 1, md: 'max-content 1fr' }}
            className="h-full w-full overflow-scroll md:overflow-hidden"
        >
            <VStack height="100%" gap="1" width="100%" className="md:overflow-hidden md:max-w-[16em]">
                <Heading level="2" size="xsmall">
                    Varsler
                </Heading>
                <VarslerList />
            </VStack>
            <VStack maxHeight="100%" className="min-h-100 md:min-h-0 overflow-hidden md:overflow-scroll">
                <VStack minHeight="0" className="mt-6">
                    <VarselDetail />
                </VStack>
            </VStack>
        </HGrid>
    );
};
