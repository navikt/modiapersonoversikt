import { harFeilendeSystemer } from '../../harFeilendeSystemer';
import { InformasjonElement, type Data as PersonData } from '../../PersondataDomain';
import { VisittkortGruppe } from '../VisittkortStyles';
import Adresse from './adresse/Adresse';
import Bankkonto from './bankkonto/Bankkonto';
import KontaktinformasjonDodsbo from './dodsbo/Dodsbo';
import Epost from './epost/Epost';
import NavKontaktinformasjon from './NavKontaktinformasjon';
import Telefon from './telefon/Telefon';

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
