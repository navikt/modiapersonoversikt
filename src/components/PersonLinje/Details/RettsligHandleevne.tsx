import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';
import { Group } from 'src/components/PersonLinje/Details/components';
import ValidPeriod from 'src/components/PersonLinje/common/ValidPeriod';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';

export default function RettsligHandleevne() {
    const { data } = usePersonData();
    const { person } = data;

    if (person.rettsligHandleevne.isEmpty()) {
        return <></>;
    }

    return (
        <Group title="Rettslig handleevne" icon={<ExclamationmarkTriangleFillIcon color="var(--a-icon-warning)" />}>
            {person.rettsligHandleevne.map((handleevne, index) => {
                return (
                    <Box key={`${handleevne.omfang}-${index}`} marginBlock="2">
                        <BodyShort>Omfang: {handleevne.omfang} </BodyShort>
                        <ValidPeriod
                            from={handleevne.gyldighetsPeriode?.gyldigFraOgMed}
                            to={handleevne.gyldighetsPeriode?.gyldigTilOgMed}
                        />
                    </Box>
                );
            })}
        </Group>
    );
}
