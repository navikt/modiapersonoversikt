import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import ValidPeriod from '../common/ValidPeriod';
import { Group, InfoElement } from './components';

function Sikkerhetstiltak() {
    const { data } = usePersonData();
    const { sikkerhetstiltak } = data.person;

    if (sikkerhetstiltak.isEmpty()) {
        return null;
    }

    return (
        <Group title="Sikkerhetstiltak" icon={<ExclamationmarkTriangleFillIcon color="var(--a-icon-warning)" />}>
            <InfoElement>
                {sikkerhetstiltak.map((sikkerhetstiltak) => {
                    return (
                        <div key={sikkerhetstiltak.beskrivelse}>
                            <ValidPeriod
                                from={sikkerhetstiltak.gyldighetsPeriode?.gyldigFraOgMed}
                                to={sikkerhetstiltak.gyldighetsPeriode?.gyldigTilOgMed}
                            />
                            <BodyShort>{sikkerhetstiltak.beskrivelse}</BodyShort>
                        </div>
                    );
                })}
            </InfoElement>
        </Group>
    );
}

export default Sikkerhetstiltak;
