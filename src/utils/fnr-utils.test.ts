import { erDnummer } from './fnr-utils';
import { aremark } from '../mock/person/aremark';

it('Sjekker at aremark har vanlig fødselsnummer', () => {
    expect(erDnummer(aremark.fødselsnummer)).toBe(false);
});

it('Sjekker at dnummer blir tolket som dnummer', () => {
    const daremarkDnummer = '50108000398';
    expect(erDnummer(daremarkDnummer)).toBe(true);
});
