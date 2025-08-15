import { HStack, Heading, VStack } from '@navikt/ds-react';
import { SakDetailPage } from 'src/components/saker/Detail';
import { SakerList } from 'src/components/saker/List';

export const SakerPage = () => {
    return (
        <HStack gap="1" minHeight="0" flexGrow="1" wrap={false}>
            <VStack height="100%" minWidth="12em">
                <Heading size="xsmall">Saker og dokumenter</Heading>
                <SakerList />
            </VStack>
            <SakDetailPage />
        </HStack>
    );
};
