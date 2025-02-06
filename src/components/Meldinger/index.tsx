import { HStack, Heading, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { TraadDetail } from './Detail';
import { TraadList } from './List';
import { TraadListOptions } from './List/Options';

export const MeldingerPage = () => {
    return (
        <HStack gap="8" className="min-h-0">
            <VStack height="100%">
                <HStack gap="4" justify="space-between">
                    <Heading size="xsmall">Innboks</Heading>
                    <TraadListOptions />
                </HStack>
                <TraadList />
            </VStack>
            <VStack height="100%" className="flex-grow">
                <Heading size="xsmall">Dialog</Heading>
                <TraadDetailSection />
            </VStack>
        </HStack>
    );
};

const routeApi = getRouteApi('/new/person/meldinger');

const TraadDetailSection = () => {
    const { traadId } = routeApi.useSearch();

    return traadId ? <TraadDetail traadId={traadId} /> : <span>Ingen melding valgt</span>;
};
