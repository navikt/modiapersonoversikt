import { HStack, Skeleton, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import DodsdatoInfo from 'src/components/PersonLinje/Details/DodsdatoInfo';
import Flytting from 'src/components/PersonLinje/Details/Flytting';
import RettsligHandleevne from 'src/components/PersonLinje/Details/RettsligHandleevne';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
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

export const OversiktWrapper = () => {
    const { errorMessages, isLoading, isError } = usePersonData();

    return (
        <ErrorBoundary boundaryName="personlinje">
            {isLoading ? (
                <Skeleton variant="rectangle" height="100%" />
            ) : isError ? (
                <AlertBanner alerts={errorMessages} />
            ) : (
                <PersonlinjeDetails />
            )}
        </ErrorBoundary>
    );
};

const PersonlinjeDetails = () => {
    return (
        <Card className="overflow-auto">
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
                    <RettsligHandleevne />
                </VStack>
                <VStack flexBasis="30%" flexGrow="1">
                    <NavKontor />
                    <Sikkerhetstiltak />
                    <Flytting />
                    <PdlLenke />
                </VStack>
            </HStack>
        </Card>
    );
};
