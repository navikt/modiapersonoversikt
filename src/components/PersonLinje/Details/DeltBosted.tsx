import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import ValidPeriod from '../common/ValidPeriod';
import { Adresseinfo, Group, InfoElement } from './components';

type DeltBosted = PersonData['deltBosted'][0];

function DeltBostedElement({ deltBosted }: { deltBosted: DeltBosted }) {
    if (!deltBosted.adresse) {
        return null;
    }

    return (
        <InfoElement>
            <ValidPeriod
                from={deltBosted.gyldighetsPeriode?.gyldigFraOgMed}
                to={deltBosted.gyldighetsPeriode?.gyldigTilOgMed}
            />
            <Adresseinfo adresse={deltBosted.adresse} />
        </InfoElement>
    );
}

function DeltBosted() {
    const { data } = usePersonData();
    const person = data?.person;
    const deltBosted = person?.deltBosted;

    if (!deltBosted || deltBosted.isEmpty()) {
        return null;
    }

    return (
        <Group title="Delt Bosted">
            {deltBosted.map((deltBosted, index) => (
                <DeltBostedElement key={`${deltBosted.adresse?.linje1}-${index}`} deltBosted={deltBosted} />
            ))}
        </Group>
    );
}

export default DeltBosted;
