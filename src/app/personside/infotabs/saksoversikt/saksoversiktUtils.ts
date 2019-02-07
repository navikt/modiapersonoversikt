import { DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import { Behandlingskjede, Sakstema } from '../../../../models/saksoversikt/sakstema';
import moment from 'moment';
import { sakstemakodeAlle } from './SakstemaListe';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';

export function aggregertSakstema(alleSakstema: Sakstema[]): Sakstema {
    const alleBehandlingskjeder = aggregerSakstemaGenerisk(alleSakstema, (sakstema => sakstema.behandlingskjeder));
    const alleDokumentmetadata = aggregerSakstemaGenerisk(alleSakstema, (sakstema => sakstema.dokumentMetadata));
    const alleTilhørendeSaker = aggregerSakstemaGenerisk(alleSakstema, (sakstema => sakstema.tilhorendeSaker));

    return {
        temanavn: 'Alle tema',
        temakode: sakstemakodeAlle,
        harTilgang: true,
        behandlingskjeder: alleBehandlingskjeder,
        dokumentMetadata: alleDokumentmetadata,
        tilhorendeSaker: alleTilhørendeSaker,
        erGruppert: false,
        feilkoder: []
    };
}

function aggregerSakstemaGenerisk<T>(alleSakstema: Sakstema[], getGeneriskElement: (saksTema: Sakstema) => T[]): T[] {
    return alleSakstema.reduce(
        (acc: T[], sakstema: Sakstema) => {
            return [...acc, ...getGeneriskElement(sakstema)];
        },
        []
    );
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

function hentSenesteDatoForDokumenter(dokumentmetadata: DokumentMetadata[]) {
    return dokumentmetadata.reduce(
        (acc: Date, dok: DokumentMetadata) => {
            return acc > saksdatoSomDate(dok.dato) ? acc : saksdatoSomDate(dok.dato);
        },
        new Date(0)
    );
}

function hentSenesteDatoForBehandling(behandlingskjede: Behandlingskjede[]) {
    return behandlingskjede.reduce(
        (acc: Date, kjede: Behandlingskjede) => {
            return acc > saksdatoSomDate(kjede.sistOppdatert) ? acc : saksdatoSomDate(kjede.sistOppdatert);
        },
        new Date(0)
    );
}

function formatterDato(date: Date) {
    return moment(date).format('DD.MM.YYYY');
}
