import { Box } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';

export const PersonLinje = () => {
    const { data } = usePersonData();

    return (
        <Box borderWidth="1" background="bg-default" borderColor="border-subtle" borderRadius="large" padding="2">
            {data.person.navn[0].fornavn} {data.person.navn[0].etternavn}
        </Box>
    );
};
