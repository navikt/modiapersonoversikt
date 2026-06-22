import type { Sakstema } from 'src/generated/modiapersonoversikt-api';

export const sakstemakodeAlle = 'ALLE';
const sakstemanavnAlle = 'Alle tema';
export const sakstemakodeIngen = 'INGEN';
const sakstemanavnIngen = 'Ingen tema valgt';

export function aggregertSakstemaV2(alleSakstema: Sakstema[], valgteSakstema?: Sakstema[]): Sakstema {
    const sakstema = valgteSakstema ?? alleSakstema;
    const erAlleSakstema = alleSakstema.length === sakstema.length;

    return {
        temanavn: aggregertTemanavnV2(sakstema, erAlleSakstema),
        temakode: erAlleSakstema ? sakstemakodeAlle : aggregertTemakode(sakstema),
        harTilgang: true
    };
}

export function aggregertTemanavnV2(valgteSakstema: Sakstema[], erAlleSakstema: boolean): string {
    const nyttTemanavn = erAlleSakstema ? sakstemanavnAlle : valgteSakstema.map((tema) => tema.temanavn).join(', ');
    return nyttTemanavn !== '' ? nyttTemanavn : sakstemanavnIngen;
}

function aggregertTemakode(valgteSakstema: Sakstema[]): string {
    const nyTemakode = valgteSakstema.map((tema) => tema.temakode).join('-');
    return nyTemakode !== '' ? nyTemakode : sakstemakodeIngen;
}

export function forkortetTemanavnV2(temanavn: string): string {
    if (temanavn === sakstemanavnAlle || temanavn === sakstemanavnIngen) {
        return temanavn;
    }
    const temanavnListe = temanavn.split(',');
    return temanavnListe.length <= 3
        ? temanavn
        : `${temanavnListe.slice(0, 2).join(', ')} og ${temanavnListe.length - 2} andre sakstemaer`;
}
