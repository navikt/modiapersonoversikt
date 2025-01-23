import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { harFeilendeSystemer } from '../../utils';
import { Group } from '../components';
import Adresse from './Adresse';
import Bankkonto from './Bankkonto';
import KontaktinformasjonDodsbo from './Dodsbo';
import Epost from './Epost';
import NavKontaktinfo from './NavKontaktinfo';
import Telefon from './Telefon';

export default function KontaktInfo() {
    const { data } = usePersonData();
    const { person } = data;

    return (
        <Group title="Kontaktinformasjon">
            <KontaktinformasjonDodsbo
                harFeilendeSystem={harFeilendeSystemer(
                    data.feilendeSystemer,
                    PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER
                )}
                dodsbo={person.dodsbo}
            />
            <Adresse person={person} />
            <Epost
                harFeilendeSystem={harFeilendeSystemer(data.feilendeSystemer, PersonDataFeilendeSystemer.DKIF)}
                kontaktinformasjon={person.kontaktInformasjon}
            />
            <Telefon
                harFeilendeSystem={harFeilendeSystemer(data.feilendeSystemer, PersonDataFeilendeSystemer.DKIF)}
                kontaktinformasjon={person.kontaktInformasjon}
            />
            <NavKontaktinfo
                harFeilendeSystem={harFeilendeSystemer(
                    data.feilendeSystemer,
                    PersonDataFeilendeSystemer.NORG_KONTAKTINFORMASJON
                )}
                telefonnummer={person.telefonnummer}
            />
            <Bankkonto
                harFeilendeSystem={harFeilendeSystemer(data.feilendeSystemer, PersonDataFeilendeSystemer.BANKKONTO)}
                bankkonto={person.bankkonto}
            />
        </Group>
    );
}
