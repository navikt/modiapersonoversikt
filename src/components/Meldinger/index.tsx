import { HStack, Heading, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { TraadDetail } from './Detail';
import { TraadList } from './List';
import { TraadListOptions } from './List/Options';

export const MeldingerPage = () => {
    return (
        <HStack gap="8" minHeight="0" flexGrow="1">
            <VStack height="100%" paddingBlock="2">
                <HStack gap="4" justify="space-between">
                    <Heading size="xsmall">Innboks</Heading>
                    <TraadListOptions />
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
