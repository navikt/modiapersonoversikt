import * as React from 'react';
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
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                dodsbo={persondata.person.dodsbo}
            />
            <Adresse person={persondata.person} />
            <Epost
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.DKIF)}
                kontaktinformasjon={persondata.person.kontaktOgReservasjon}
            />
            <Telefon
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.DKIF)}
                kontaktinformasjon={persondata.person.kontaktOgReservasjon}
            />
            <NavKontaktinformasjon
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.NORG_KONTAKTINFORMASJON)}
                telefonnummer={persondata.person.telefonnummer}
            />
            <Bankkonto
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.BANKKONTO)}
                bankkonto={persondata.person.bankkonto}
            />
        </VisittkortGruppe>
    );
}
