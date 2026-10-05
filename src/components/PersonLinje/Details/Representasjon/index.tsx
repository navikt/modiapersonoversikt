import { BodyShort, VStack } from '@navikt/ds-react';
import { Fullmakt } from 'src/components/PersonLinje/Details/Representasjon/Fullmakt';
import { RettsligHandleevne } from 'src/components/PersonLinje/Details/Representasjon/RettsligHandleevne';
import Vergemal from 'src/components/PersonLinje/Details/Representasjon/Vergemal';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';

export const Representasjon = () => {
    const { data } = usePersonData();
    const person = data?.person;

    const ingenData =
        person?.vergemal?.isEmpty() &&
        person?.historiskeVergemal?.isEmpty() &&
        person?.fullmektige?.isEmpty() &&
        person.rettsligHandleevne.isEmpty();

    if (ingenData) {
        return (
            <BodyShort size="small" textColor="subtle">
                Ingen representasjonsdata
            </BodyShort>
        );
    }
    return (
        <VStack gap="space-16">
            <RettsligHandleevne />
            <Vergemal />
            <Fullmakt />
        </VStack>
    );
};
