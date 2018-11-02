import { DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { Behandlingskjede, Sakstema } from '../../../../models/saksoversikt/sakstema';
import * as moment from 'moment';

export function hentDatoForSisteHendelse(sakstema: Sakstema) {
    if (sakstema.behandlingskjeder.length > 0 && sakstema.dokumentMetadata.length === 0) {
        return formatterDato(hentSenesteDatoForBehandling(sakstema.behandlingskjeder));
    }
    if (sakstema.behandlingskjeder.length === 0 && sakstema.dokumentMetadata.length > 0) {
        return formatterDato(hentSenesteDatoForDokumenter(sakstema.dokumentMetadata));
    }

    const dateBehandling = hentSenesteDatoForBehandling(sakstema.behandlingskjeder);
    const dateDokumenter = hentSenesteDatoForDokumenter(sakstema.dokumentMetadata);
    return formatterDato(dateBehandling > dateDokumenter ? dateBehandling : dateDokumenter);
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
