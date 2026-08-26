import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { harFeilendeSystemer } from '../../utils';
import { Group } from '../components';
import BarnGammel from './BarnGammel';
import ForeldreGammel from './ForeldreGammel';
import SivilstandGammel from './SivilstandGammel';

function FamilieGammel() {
    const { data } = usePersonData();

    const person = data?.person;
    const feilendeSystemer = data?.feilendeSystemer;
    const erUnder22 = person?.alder != null && person.alder <= 21;
    const harFeilendeSystem = harFeilendeSystemer(
        feilendeSystemer ?? [],
        PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER
    );

    if (!person) {
        return <></>;
    }

    return (
        <Group title="Familie">
            <SivilstandGammel harFeilendeSystem={harFeilendeSystem} sivilstand={person.sivilstand} />
            <BarnGammel harFeilendeSystem={harFeilendeSystem} relasjoner={person.forelderBarnRelasjon} />
            {erUnder22 && (
                <ForeldreGammel
                    harFeilendeSystem={harFeilendeSystem}
                    forelderBarnRelasjon={person.forelderBarnRelasjon}
                />
            )}
        </Group>
    );
}

export default FamilieGammel;
