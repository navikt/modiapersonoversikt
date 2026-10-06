import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { hentPeriodeTekst } from 'src/components/PersonLinje/utils';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';

export const RettsligHandleevne = () => {
    const { data } = usePersonData();
    const person = data?.person;
    const rettsligHandleevne = person?.rettsligHandleevne ?? [];
    if (!person || person.rettsligHandleevne.isEmpty()) {
        return null;
    }
    return (
        <VStack>
            <Heading size="xsmall" as="h3">
                Rettslig handleevne
            </Heading>
            {rettsligHandleevne?.map((rettsligHandleevne, index) => {
                return (
                    <Box key={`${rettsligHandleevne.omfang}-${index}`} marginBlock="space-8">
                        <BodyShort size="small">Omfang: {rettsligHandleevne.omfang} </BodyShort>
                        <BodyShort size="small">
                            Gyldig:{' '}
                            {hentPeriodeTekst(
                                rettsligHandleevne.gyldighetsPeriode?.gyldigFraOgMed,
                                rettsligHandleevne.gyldighetsPeriode?.gyldigTilOgMed
                            )}
                        </BodyShort>
                    </Box>
                );
            })}
        </VStack>
    );
};
