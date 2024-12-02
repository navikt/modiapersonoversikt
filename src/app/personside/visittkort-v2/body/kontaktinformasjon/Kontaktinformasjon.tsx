import { Data as PersonData, InformasjonElement } from '../../PersondataDomain';
import { VisittkortGruppe } from '../VisittkortStyles';
import Bankkonto from './bankkonto/Bankkonto';
import KontaktinformasjonDodsbo from './dodsbo/Dodsbo';
import Adresse from './adresse/Adresse';
import Epost from './epost/Epost';
import Telefon from './telefon/Telefon';
import NavKontaktinformasjon from './NavKontaktinformasjon';
import { harFeilendeSystemer } from '../../harFeilendeSystemer';

interface Props {
    persondata: PersonData;
}

export default function Kontaktinformasjon({ persondata }: Props) {
    return (
        <VisittkortGruppe tittel={'Kontaktinformasjon'}>
            <KontaktinformasjonDodsbo
                harFeilendeSystem={harFeilendeSystemer(
                    persondata.feilendeSystemer,
                    InformasjonElement.PDL_TREDJEPARTSPERSONER
                )}
                dodsbo={persondata.person.dodsbo}
            />
            <Adresse person={persondata.person} />
            <Epost
                harFeilendeSystem={harFeilendeSystemer(persondata.feilendeSystemer, InformasjonElement.DKIF)}
                kontaktinformasjon={persondata.person.kontaktInformasjon}
            />
            <Telefon
                harFeilendeSystem={harFeilendeSystemer(persondata.feilendeSystemer, InformasjonElement.DKIF)}
                kontaktinformasjon={persondata.person.kontaktInformasjon}
            />
            <NavKontaktinformasjon
                harFeilendeSystem={harFeilendeSystemer(
                    persondata.feilendeSystemer,
                    InformasjonElement.NORG_KONTAKTINFORMASJON
                )}
                telefonnummer={persondata.person.telefonnummer}
            />
            <Bankkonto
                harFeilendeSystem={harFeilendeSystemer(persondata.feilendeSystemer, InformasjonElement.BANKKONTO)}
                bankkonto={persondata.person.bankkonto}
            />
        </VisittkortGruppe>
    );
}
