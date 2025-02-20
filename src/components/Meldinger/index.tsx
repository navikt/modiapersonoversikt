import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { TraadDetail } from './Detail';
import { TraadList } from './List';

export const MeldingerPage = () => {
    return (
        <HStack gap="4" minHeight="0" flexGrow="1" paddingBlock="0 2">
            <VStack height="100%" minWidth="16em">
                <HStack justify="space-between">
                    <Heading size="xsmall">Innboks</Heading>
                    <Button variant="tertiary" size="xsmall" icon={<PrinterSmallIcon />}>
                        Skriv ut alle
                    </Button>
                </HStack>
                <TraadList />
            </VStack>
            <VStack flexGrow="1" minHeight="0" maxHeight="100%">
                <Heading size="xsmall">Dialog</Heading>
                <VStack minHeight="0">
                    <TraadDetailSection />
                </VStack>
            </VStack>
        </HStack>
    );
};

const routeApi = getRouteApi('/new/person/meldinger');

const TraadDetailSection = () => {
    const { traadId } = routeApi.useSearch();

    return traadId ? <TraadDetail traadId={traadId} /> : <span>Ingen melding valgt</span>;
};
