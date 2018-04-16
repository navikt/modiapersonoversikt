import { endretAvTekst } from './endretAvUtil';

it('Formaterer endretAv tall + BD03 (brukerprofil-app = bruker) tekst til ønsket visningsformat', () => {
    const rawString = '1010800 BD03';
    const formatertTekst =  endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av bruker');
});

it('Formaterer endretAv tall + PP01 (PSelv-app - bruker) tekst til ønsket visningsformat', () => {
    const rawString = '1010800 PP01';
    const formatertTekst =  endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av bruker');
});

it('Formaterer endretAv ident + BD06 (modiabrukerdialog-app - NAV) tekst til ønsket visningsformat', () => {
    const rawString = 'X108000 BD06';
    const formatertTekst =  endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv ident + PP01 (modiabrukerdialog-app - NAV) tekst til ønsket visningsformat', () => {
    const rawString = 'X108001 PP01';
    const formatertTekst =  endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv tekst + SKD (Skatt/Folkeregisteret) tekst til ønsket visningsformat', () => {
    const rawString = 'AJOURHD, SKD';
    const formatertTekst =  endretAvTekst(rawString);

    expect(formatertTekst).toEqual('i Folkeregisteret');
});