import { BodyShort } from '@navikt/ds-react';
import { Group, InfoElement, LastChanged } from 'src/components/PersonLinje/Details/components';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

function DodsdatoInfo() {
    const { data } = usePersonData();
    const dato = data?.person?.dodsdato?.firstOrNull();
    if (dato?.dodsdato) {
        const formatertDodsdato = formaterDato(dato.dodsdato);

        return (
            <Group title="Død">
                <InfoElement>
                    <BodyShort size="small">Død {formatertDodsdato}</BodyShort>
                    <LastChanged sistEndret={dato.sistEndret} />
                </InfoElement>
            </Group>
        );
    }

    return null;
}

export default DodsdatoInfo;
