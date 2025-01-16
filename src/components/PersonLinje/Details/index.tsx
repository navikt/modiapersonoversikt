import { VStack } from '@navikt/ds-react';
import Fullmakter from './Fullmakt';
import KontaktInfo from './KontaktInfo';

export const PersonlinjeDetails = () => {
    return (
        <VStack>
            <KontaktInfo />
            <Fullmakter />
        </VStack>
    );
};
