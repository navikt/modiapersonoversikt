import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';
import ValidPeriod from 'src/components/PersonLinje/common/ValidPeriod';
import { Group } from 'src/components/PersonLinje/Details/components';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';

export default function RettsligHandleevne() {
    const { data } = usePersonData();
    const person = data?.person;

    if (!person || person.rettsligHandleevne.isEmpty()) {
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
