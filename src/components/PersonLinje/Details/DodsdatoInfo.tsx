import { BodyShort, Box } from '@navikt/ds-react';
import { Group, LastChanged } from 'src/components/PersonLinje/Details/components';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

function DodsdatoInfo() {
    const { data } = usePersonData();
    const { person } = data;
    const dato = person.dodsdato.firstOrNull();
    if (dato?.dodsdato) {
        const formatertDodsdato = formaterDato(dato.dodsdato);

        return (
            <Group title="Død">
                <Box marginBlock="2">
                    <BodyShort size="small">Død {formatertDodsdato}</BodyShort>
                    <LastChanged sistEndret={dato.sistEndret} />
                </Box>
            </Group>
        );
    }

    return null;
}

export default DodsdatoInfo;
