import type { InformasjonElement } from 'src/models/person/persondata';

export function harFeilendeSystemer(feilendeSystemer: Array<InformasjonElement>, system: InformasjonElement): boolean {
    return feilendeSystemer.includes(system);
}
