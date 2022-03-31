import { Data as PersonData, InformasjonElement } from './PersondataDomain';

export function harFeilendeSystemer(persondata: PersonData, system: InformasjonElement): boolean {
    return persondata.feilendeSystemer.includes(system);
}
