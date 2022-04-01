import { InformasjonElement } from './PersondataDomain';

export function harFeilendeSystemer(feilendeSystemer: Array<InformasjonElement>, system: InformasjonElement): boolean {
    return feilendeSystemer.includes(system);
}
