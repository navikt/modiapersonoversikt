import { endretAvTekst } from './endretAvUtil';

it('Formaterer tom endretAv til ønsket visningsformat', () => {
    const rawString = '';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('');
});

it('Formaterer endretAv tall + BD03 (brukerprofil-app = bruker) tekst til ønsket visningsformat', () => {
    const rawString = '1010800, BD03';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av bruker');
});

it('Formaterer endretAv tall + PP01 (PSelv-app - bruker) tekst til ønsket visningsformat', () => {
    const rawString = 'Srvpsel, PP01';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av bruker');
});

it('Formaterer endretAv ident + BD06 (modiabrukerdialog-app - NAV) tekst til ønsket visningsformat', () => {
    const rawString = 'X108000, BD06';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv ident (med liten bokstav) + BD06 tekst til ønsket visningsformat', () => {
    const rawString = 'x108000, BD06';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv gammel type ident + IT00 (Infotrygd-app - NAV) tekst til ønsket visningsformat', () => {
    const rawString = 'AAH1234, IT00';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv Konvert + IT00 (Infotrygd-app - NAV) tekst til ønsket visningsformat', () => {
    const rawString = 'KONVERT, IT00';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv ident + PP01 (modiabrukerdialog-app - NAV) tekst til ønsket visningsformat', () => {
    const rawString = 'srvPensjon, PP01';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv Arena, PP01 (modiabrukerdialog-app - NAV) tekst til ønsket visningsformat', () => {
    const rawString = 'ARENA, PP01';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv ident + FS21 (Gosys-app - NAV) tekst til ønsket visningsformat', () => {
    const rawString = 'X108001, FS21';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av NAV');
});

it('Formaterer endretAv tekst + SKD (Skatt/Folkeregisteret) tekst til ønsket visningsformat', () => {
    const rawString = 'AJOURHD, SKD';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('i Folkeregisteret');
});

it('Formaterer endretAv tekst + SKD (Skatt/Folkeregisteret) tekst til ønsket visningsformat', () => {
    const rawString = 'AAA2101, SKD';
    const formatertTekst = endretAvTekst(rawString);

    expect(formatertTekst).toEqual('av Skatteetaten');
});
