import { Kodeverk } from '../models/kodeverk';

export function alfabetiskKodeverkComparator(a: Kodeverk, b: Kodeverk) {
    return a.beskrivelse > b.beskrivelse ? 1 : a.beskrivelse === b.beskrivelse ? 0 : -1;
}
