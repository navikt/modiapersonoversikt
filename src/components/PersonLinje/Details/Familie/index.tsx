import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { harFeilendeSystemer } from '../../utils';
import { Group } from '../components';
import Barn from './Barn';
import Foreldre from './Foreldre';
import Sivilstand from './Sivilstand';

function Familie() {
    const { data } = usePersonData();

    const person = data?.person;
    const feilendeSystemer = data?.feilendeSystemer;
    const erUnder22 = person?.alder && person.alder <= 21;
    const harFeilendeSystem = harFeilendeSystemer(
        feilendeSystemer ?? [],
        PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER
    );

    if (!person) {
        return <></>;
    }

    return (
        <Group title="Familie">
            <Sivilstand harFeilendeSystem={harFeilendeSystem} sivilstand={person.sivilstand} />
            <Barn harFeilendeSystem={harFeilendeSystem} relasjoner={person.forelderBarnRelasjon} />
            {erUnder22 && (
                <Foreldre harFeilendeSystem={harFeilendeSystem} forelderBarnRelasjon={person.forelderBarnRelasjon} />
            )}
        </Group>
    );
}

export default Familie;
