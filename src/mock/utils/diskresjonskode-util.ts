import navfaker from 'nav-faker';
import { Diskresjonskoder } from '../../app/personside/visittkort/body/familie/common/Diskresjonskode';

export function getDiskresjonskode() {
    if (navfaker.random.vektetSjanse(0.5)) {
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
