import { HStack, VStack } from '@navikt/ds-react';
import Familie from './Familie';
import Fullmakter from './Fullmakt';
import KontaktInfo from './KontaktInfo';

export const PersonlinjeDetails = () => {
    return (
        <HStack gap="4">
            <VStack>
                <KontaktInfo />
                <Fullmakter />
            </VStack>
            <VStack>
                <Familie />
            </VStack>
        </HStack>
    );
};
