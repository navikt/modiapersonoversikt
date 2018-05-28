import { formaterMobiltelefonnummer } from './telefon-utils';

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
