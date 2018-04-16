import { endretAvTekst } from './endretAvUtil';

it('Formaterer endretAv BD03 (brukerprofil-app = bruker) tekst til ønsket visningsformat', () => {
    const rawString = '1010800 BD03';
    const formatertTekst =  endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av bruker');
});

it('Formaterer endretAv BD06 (modiabrukerdialog-app - NAV) tekst til ønsket visningsformat', () => {
    const rawString = '1010800 BD06';
    const formatertTekst =  endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv SKD (bruker) tekst til ønsket visningsformat', () => {
    const rawString = 'AJOURHD, SKD';
    const formatertTekst =  endretAvTekst(rawString);

    expect(formatertTekst).toEqual('i Folkeregisteret');
});