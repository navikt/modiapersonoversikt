import { Heading, HStack, type SortState, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { DokumenterTabell } from 'src/components/Dokumenter/DokumenterTabell';
import { DokumenterFilter } from 'src/components/Dokumenter/Filter';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';

export interface DokumenterSortState extends SortState {
    orderBy: keyof Dokumentmetadata;
}

export const DokumenterPage = () => {
    return (
        <Card padding="4" className="h-full overflow-auto">
            <VStack gap="8">
                <HStack align="center" gap="2">
                    <Heading level="2" size="medium">
                        Dokumenter
                    </Heading>
                </HStack>
                <VStack gap="2">
                    <DokumenterFilter />
                    <DokumenterTabell />
                </VStack>
            </VStack>
        </Card>
    );
};
