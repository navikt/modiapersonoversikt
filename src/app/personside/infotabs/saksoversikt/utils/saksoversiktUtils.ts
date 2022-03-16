import { Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { Behandlingskjede, Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { sakstemakodeAlle } from '../sakstemaliste/SakstemaListe';
import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import { formatterDato } from '../../../../../utils/date-utils';

export function aggregertSakstema(alleSakstema: Sakstema[], valgteSakstema?: Sakstema[]): Sakstema {
    const sakstema = valgteSakstema !== undefined ? valgteSakstema : alleSakstema;
    const behandlingskjeder = aggregerSakstemaGenerisk(sakstema, (sakstema) => sakstema.behandlingskjeder);
    const journalposter = aggregerSakstemaGenerisk(sakstema, (sakstema) => sakstema.dokumentMetadata);
    const tilhorendeSaker = aggregerSakstemaGenerisk(sakstema, (sakstema) => sakstema.tilhørendeSaker);

    const erAlleSakstema = alleSakstema.length === sakstema.length;

    return {
        temanavn: erAlleSakstema ? 'Alle tema' : aggregertTemanavn(sakstema),
        temakode: erAlleSakstema ? sakstemakodeAlle : aggregertTemakode(sakstema),
        harTilgang: true,
        behandlingskjeder: behandlingskjeder,
        dokumentMetadata: journalposter,
        tilhørendeSaker: tilhorendeSaker,
        erGruppert: false,
        feilkoder: []
    };
}

function aggregertTemanavn(valgteSakstema: Sakstema[]): string {
    return valgteSakstema.map((tema) => tema.temanavn).join(', ');
}

function aggregertTemakode(valgteSakstema: Sakstema[]): string {
    const nyTemakode = valgteSakstema.map((tema) => tema.temakode).join('-');
    return nyTemakode !== '' ? nyTemakode : 'INGEN';
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

export function getUnikSakstemaKey(sakstema: Sakstema) {
    return sakstema.temakode + '-' + Math.floor(hentDatoForSisteHendelse(sakstema).getTime() / 1000); // TODO bør skrives om til å bruke dato for første hendelse for permanente lenker
}
