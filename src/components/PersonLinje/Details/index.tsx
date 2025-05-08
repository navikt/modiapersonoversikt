import { HStack, VStack } from '@navikt/ds-react';
import DodsdatoInfo from 'src/components/PersonLinje/Details/DodsdatoInfo';
import DeltBosted from './DeltBosted';
import Familie from './Familie';
import Foreldreansvar from './ForeldreAnsvar';
import Fullmakter from './Fullmakt';
import KontaktInfo from './KontaktInfo';
import NavKontor from './NavKontor';
import PdlLenke from './PdlLenke';
import Sikkerhetstiltak from './Sikkerhetstiltak';
import TilrettelagtKommunikasjon from './TilrettelagtKommunikasjon';
import Vergemal from './Vergemal';

export const PersonlinjeDetails = () => {
    return (
        <HStack gap="4" justify="space-between" padding="4">
            <VStack flexBasis="30%" flexGrow="1">
                <DodsdatoInfo />
                <KontaktInfo />
                <Fullmakter />
            </VStack>
            <VStack flexBasis="30%" flexGrow="1">
                <Familie />
                <Foreldreansvar />
                <DeltBosted />
                <TilrettelagtKommunikasjon />
                <Vergemal />
            </VStack>
            <VStack flexBasis="30%" flexGrow="1">
                <NavKontor />
                <Sikkerhetstiltak />
                <PdlLenke />
            </VStack>
        </HStack>
    );
};
