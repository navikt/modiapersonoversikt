import { harFeilendeSystemer } from '../../harFeilendeSystemer';
import { InformasjonElement, type Person } from '../../PersondataDomain';
import { VisittkortGruppe } from '../VisittkortStyles';
import Foreldre from './Foreldre';
import ListeAvBarn from './ListeAvBarn';
import Sivilstand from './Sivilstand';

interface Props {
    feilendeSystemer: Array<InformasjonElement>;
    person: Person;
}

function Familie({ feilendeSystemer, person }: Props) {
    const erUnder22 = person.alder !== null && person.alder <= 21;
    const harFeilendeSystem = harFeilendeSystemer(feilendeSystemer, InformasjonElement.PDL_TREDJEPARTSPERSONER);

    return (
        <VisittkortGruppe tittel={'Familie'}>
            <Sivilstand harFeilendeSystem={harFeilendeSystem} sivilstandListe={person.sivilstand} />
            <ListeAvBarn harFeilendeSystem={harFeilendeSystem} relasjoner={person.forelderBarnRelasjon} />
            {erUnder22 && (
                <Foreldre harFeilendeSystem={harFeilendeSystem} forelderBarnRelasjon={person.forelderBarnRelasjon} />
            )}
        </VisittkortGruppe>
    );
}

export default Familie;
