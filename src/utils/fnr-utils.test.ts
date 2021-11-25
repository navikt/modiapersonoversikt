import { aremark } from '../mock/persondata/aremark';
import { erDnummer } from './fnr-utils';

it('Sjekker at aremark har vanlig fødselsnummer', () => {
    expect(erDnummer(aremark.fnr)).toBe(false);
});

it('Sjekker at dnummer blir tolket som dnummer', () => {
    const daremarkDnummer = '50108000398';
    expect(erDnummer(daremarkDnummer)).toBe(true);
});
