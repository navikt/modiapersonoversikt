import { formaterMobiltelefonnummer, sorterRetningsnummerMedNorgeFørst } from './telefon-utils';
import { mockRetningsnummereKodeverk } from '../mock/kodeverk/retningsnummer-mock';

it('returnerer formatert mobiltelefon', () => {
    const telefonnummer = '90000000';

    const formatertTelefonnummer = formaterMobiltelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('900 00 000');
});

it('returnerer formatert mobiltelefon med retningskode', () => {
    const telefonnummer = '+4790000000';

    const formatertTelefonnummer = formaterMobiltelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('+47 900 00 000');
});

test('sorterer retningsnummer med norge først', () => {
    var kodeverkRepsonse = mockRetningsnummereKodeverk();

    const sorterteRetningsnummer = sorterRetningsnummerMedNorgeFørst(kodeverkRepsonse);

    expect(sorterteRetningsnummer.kodeverk[0].kodeRef).toBe('+47');
    expect(sorterteRetningsnummer.kodeverk[1].kodeRef).toBe('+54');

});