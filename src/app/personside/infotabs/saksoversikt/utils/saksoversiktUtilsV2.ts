import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import type { Journalpost } from '../../../../../models/saksoversikt/journalpost';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { formatterDato } from '../../../../../utils/date-utils';
import { filtrerSakstemaerUtenDataV2 } from '../sakstemaliste/SakstemaListeUtils';

export const sakstemakodeAlle = 'ALLE';
const sakstemanavnAlle = 'Alle tema';
export const sakstemakodeIngen = 'INGEN';
const sakstemanavnIngen = 'Ingen tema valgt';

export function aggregertSakstemaV2(alleSakstema: Sakstema[], valgteSakstema?: Sakstema[]): Sakstema {
    const alleSakstemaFiltrert = filtrerSakstemaerUtenDataV2(alleSakstema);
    const sakstema = valgteSakstema !== undefined ? filtrerSakstemaerUtenDataV2(valgteSakstema) : alleSakstemaFiltrert;
    const journalposter = aggregerSakstemaGenerisk(sakstema, (sakstema) => sakstema.dokumentMetadata);
    const tilhorendeSaker = aggregerSakstemaGenerisk(sakstema, (sakstema) => sakstema.tilhorendeSaker);

    const erAlleSakstema = alleSakstemaFiltrert.length === sakstema.length;

    return {
        temanavn: aggregertTemanavnV2(sakstema, erAlleSakstema),
        temakode: erAlleSakstema ? sakstemakodeAlle : aggregertTemakode(sakstema),
        harTilgang: true,
        dokumentMetadata: journalposter,
        tilhorendeSaker: tilhorendeSaker,
        erGruppert: false,
        feilkoder: []
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

function aggregerSakstemaGenerisk<T>(alleSakstema: Sakstema[], getGeneriskElement: (saksTema: Sakstema) => T[]): T[] {
    return alleSakstema.reduce((acc: T[], sakstema) => {
        //biome-ignore lint/performance/noAccumulatingSpread: biome migration
        return [...acc, ...getGeneriskElement(sakstema)];
    }, []);
}

export function hentFormattertDatoForSisteHendelseV2(sakstema: Sakstema): string {
    const sisteHendelse = hentDatoForSisteHendelseV2(sakstema);
    if (!sisteHendelse) {
        return 'Fant ikke dato';
    }
    return formatterDato(sisteHendelse);
}

export function hentDatoForSisteHendelseV2(sakstema: Sakstema): Date | undefined {
    if (sakstema.dokumentMetadata.length > 0) {
        return hentSenesteDatoForDokumenter(sakstema.dokumentMetadata);
    }

    return undefined;
}

function hentSenesteDatoForDokumenter(journalposter: Journalpost[]) {
    return journalposter.reduce((acc: Date, dok: Journalpost) => {
        return acc > saksdatoSomDate(dok.dato) ? acc : saksdatoSomDate(dok.dato);
    }, new Date(0));
}
