import { HStack, Heading, VStack } from '@navikt/ds-react';
import { VarselDetail } from 'src/components/varsler/Details';
import { VarslerList } from 'src/components/varsler/List';

export const VarslerPage = () => {
    return (
        <HStack gap="1" minHeight="0" wrap={false}>
            <VStack height="100%" minWidth="12em" gap="1">
                <Heading level="2" size="xsmall">
                    Varsler
                </Heading>
                <VarslerList />
            </VStack>
            <VStack flexGrow="1" minHeight="0" maxHeight="100%">
                <VStack minHeight="0" className="mt-6">
                    <VarselDetail />
                </VStack>
            </VStack>
        </HStack>
    );
};
