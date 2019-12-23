import { Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { Behandlingskjede, Sakstema } from '../../../../../models/saksoversikt/sakstema';
import moment from 'moment';
import { sakstemakodeAlle } from '../sakstemaliste/SakstemaListe';
import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import { useRestResource } from '../../../../../utils/customHooks';
import { useMemo } from 'react';
import { hasData } from '../../../../../rest/utils/restResource';

export function aggregertSakstema(alleSakstema: Sakstema[]): Sakstema {
    const alleBehandlingskjeder = aggregerSakstemaGenerisk(alleSakstema, sakstema => sakstema.behandlingskjeder);
    const alleJournalposter = aggregerSakstemaGenerisk(alleSakstema, sakstema => sakstema.journalPoster);
    const alleTilhørendeSaker = aggregerSakstemaGenerisk(alleSakstema, sakstema => sakstema.tilhørendeSaker);

    return {
        temanavn: 'Alle tema',
        temakode: sakstemakodeAlle,
        harTilgang: true,
        behandlingskjeder: alleBehandlingskjeder,
        journalPoster: alleJournalposter,
        tilhørendeSaker: alleTilhørendeSaker,
        erGruppert: false,
        feilkoder: []
    };
}

export function useAgregerteSaker(): Sakstema | undefined {
    const sakstemaResource = useRestResource(resources => resources.sakstema);
    return useMemo(() => (hasData(sakstemaResource) ? aggregertSakstema(sakstemaResource.data.resultat) : undefined), [
        sakstemaResource
    ]);
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
    if (sakstema.behandlingskjeder.length > 0 && sakstema.journalPoster.length === 0) {
        return hentSenesteDatoForBehandling(sakstema.behandlingskjeder);
    }
    if (sakstema.behandlingskjeder.length === 0 && sakstema.journalPoster.length > 0) {
        return hentSenesteDatoForDokumenter(sakstema.journalPoster);
    }

    const dateBehandling = hentSenesteDatoForBehandling(sakstema.behandlingskjeder);
    const dateDokumenter = hentSenesteDatoForDokumenter(sakstema.journalPoster);
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

function formatterDato(date: Date) {
    return moment(date).format('DD.MM.YYYY');
}

export function getUnikSakstemaKey(sakstema: Sakstema) {
    return sakstema.temakode + Math.floor(hentDatoForSisteHendelse(sakstema).getTime() / 1000); // TODO bør skrives om til å bruke dato for første hendelse for permanente lenker
}
