import navfaker from 'nav-faker';

import { Diskresjonskoder } from '../../konstanter';

export function getDiskresjonskode() {
    if (navfaker.random.vektetSjanse(.5)) {
        return {
            kodeRef: Diskresjonskoder.FORTROLIG_ADRESSE,
            beskrivelse: 'Fortrolig adresse'
        };
    } else {
        return {
            kodeRef: Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE,
            beskrivelse: 'Strengt fortrolig adresse'
        };
    }
}
