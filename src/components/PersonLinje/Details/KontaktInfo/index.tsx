import { InformasjonElement } from 'src/app/personside/visittkort-v2/PersondataDomain';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
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
                    InformasjonElement.PDL_TREDJEPARTSPERSONER
                )}
                dodsbo={person.dodsbo}
            />
            <Adresse person={person} />
            <Epost
                harFeilendeSystem={harFeilendeSystemer(data.feilendeSystemer, InformasjonElement.DKIF)}
                kontaktinformasjon={person.kontaktInformasjon}
            />
            <Telefon
                harFeilendeSystem={harFeilendeSystemer(data.feilendeSystemer, InformasjonElement.DKIF)}
                kontaktinformasjon={person.kontaktInformasjon}
            />
            <NavKontaktinfo
                harFeilendeSystem={harFeilendeSystemer(
                    data.feilendeSystemer,
                    InformasjonElement.NORG_KONTAKTINFORMASJON
                )}
                telefonnummer={person.telefonnummer}
            />
            <Bankkonto
                harFeilendeSystem={harFeilendeSystemer(data.feilendeSystemer, InformasjonElement.BANKKONTO)}
                bankkonto={person.bankkonto}
            />
        </Group>
    );
}
