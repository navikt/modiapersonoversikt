import { Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { Behandlingskjede, Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import { formatterDato } from '../../../../../utils/date-utils';
import { filtrerSakstemaerUtenData } from '../sakstemaliste/SakstemaListeUtils';

export const sakstemakodeAlle = 'ALLE';
export const sakstemanavnAlle = 'Alle tema';
export const sakstemakodeIngen = 'INGEN';
export const sakstemanavnIngen = 'Ingen tema valgt';

export function aggregertSakstema(alleSakstema: Sakstema[], valgteSakstema?: Sakstema[]): Sakstema {
    const alleSakstemaFiltrert = filtrerSakstemaerUtenData(alleSakstema);
    const sakstema = valgteSakstema !== undefined ? filtrerSakstemaerUtenData(valgteSakstema) : alleSakstemaFiltrert;
    const behandlingskjeder = aggregerSakstemaGenerisk(sakstema, (sakstema) => sakstema.behandlingskjeder);
    const journalposter = aggregerSakstemaGenerisk(sakstema, (sakstema) => sakstema.dokumentMetadata);
    const tilhorendeSaker = aggregerSakstemaGenerisk(sakstema, (sakstema) => sakstema.tilhørendeSaker);

    const erAlleSakstema = alleSakstemaFiltrert.length === sakstema.length;

    return {
        temanavn: aggregertTemanavn(sakstema, erAlleSakstema),
        temakode: erAlleSakstema ? sakstemakodeAlle : aggregertTemakode(sakstema),
        harTilgang: true,
        behandlingskjeder: behandlingskjeder,
        dokumentMetadata: journalposter,
        tilhørendeSaker: tilhorendeSaker,
        erGruppert: false,
        feilkoder: []
    };
}

export function aggregertTemanavn(valgteSakstema: Sakstema[], erAlleSakstema: boolean): string {
    const nyttTemanavn = erAlleSakstema ? sakstemanavnAlle : valgteSakstema.map((tema) => tema.temanavn).join(', ');
    return nyttTemanavn !== '' ? nyttTemanavn : sakstemanavnIngen;
}

function aggregertTemakode(valgteSakstema: Sakstema[]): string {
    const nyTemakode = valgteSakstema.map((tema) => tema.temakode).join('-');
    return nyTemakode !== '' ? nyTemakode : sakstemakodeIngen;
}

export function forkortetTemanavn(temanavn: string): string {
    if (temanavn === sakstemanavnAlle || temanavn === sakstemanavnIngen) {
        return temanavn;
    }
    const temanavnListe = temanavn.split(',');
    return temanavnListe.length <= 3
        ? temanavn
        : `${temanavnListe.slice(0, 2).join(', ')} og ${temanavnListe.length - 2} andre sakstemaer`;
}

function aggregerSakstemaGenerisk<T>(alleSakstema: Sakstema[], getGeneriskElement: (saksTema: Sakstema) => T[]): T[] {
    return alleSakstema.reduce((acc: T[], sakstema: Sakstema) => {
        return [...acc, ...getGeneriskElement(sakstema)];
    }, []);
}

export function hentFormattertDatoForSisteHendelse(sakstema: Sakstema) {
    return formatterDato(hentDatoForSisteHendelse(sakstema));
}

export function hentDatoForSisteHendelse(sakstema: Sakstema): Date {
    if (sakstema.behandlingskjeder.length > 0 && sakstema.dokumentMetadata.length === 0) {
        return hentSenesteDatoForBehandling(sakstema.behandlingskjeder);
    }
    if (sakstema.behandlingskjeder.length === 0 && sakstema.dokumentMetadata.length > 0) {
        return hentSenesteDatoForDokumenter(sakstema.dokumentMetadata);
    }

    const dateBehandling = hentSenesteDatoForBehandling(sakstema.behandlingskjeder);
    const dateDokumenter = hentSenesteDatoForDokumenter(sakstema.dokumentMetadata);
    return dateBehandling > dateDokumenter ? dateBehandling : dateDokumenter;
}

function hentSenesteDatoForDokumenter(journalposter: Journalpost[]) {
    return journalposter.reduce((acc: Date, dok: Journalpost) => {
        return acc > saksdatoSomDate(dok.dato) ? acc : saksdatoSomDate(dok.dato);
    }, new Date(0));
}

function hentSenesteDatoForBehandling(behandlingskjede: Behandlingskjede[]) {
    return behandlingskjede.reduce((acc: Date, kjede: Behandlingskjede) => {
        return acc > saksdatoSomDate(kjede.sistOppdatert) ? acc : saksdatoSomDate(kjede.sistOppdatert);
    }, new Date(0));
}
