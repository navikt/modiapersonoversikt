import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { harFeilendeSystemer } from '../../utils';
import { Group } from '../components';
import Barn from './Barn';
import Foreldre from './Foreldre';
import Sivilstand from './Sivilstand';

function Familie() {
    const {
        data: { person, feilendeSystemer }
    } = usePersonData();

    const erUnder22 = person.alder && person.alder <= 21;
    const harFeilendeSystem = harFeilendeSystemer(feilendeSystemer, 'PDL_TREDJEPARTSPERSONER');

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
