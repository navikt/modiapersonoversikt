import * as React from 'react';
import * as moment from 'moment';
import { Behandlingskjede, Sakstema } from '../../../../models/saksoversikt/sakstema';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';

interface Props {
    sakstema: Sakstema;
}

function compareSaksDato(left: Date, right: Date): number {
    if (left < right) { return -1; }
    if (left > right) { return 1; }
    return 0;
}

function hentSenesteDatoForDokumenter(dokumentmetadata: DokumentMetadata[]) {
    let sortertDokumentmetadata: DokumentMetadata[];
    sortertDokumentmetadata = dokumentmetadata.slice(0);
    sortertDokumentmetadata.sort((left, right): number => {
        return compareSaksDato(saksdatoSomDate(left.dato), saksdatoSomDate(right.dato));
    });
    return saksdatoSomDate(sortertDokumentmetadata[0].dato);
}

function hentSenesteDatoForBehandling(behandlingskjede: Behandlingskjede[]) {
    let sortertBehandlingskjede: Behandlingskjede[];
    sortertBehandlingskjede = behandlingskjede.slice(0);
    sortertBehandlingskjede.sort((left, right): number => {
        return compareSaksDato(saksdatoSomDate(left.sistOppdatert), saksdatoSomDate(right.sistOppdatert));
    });

    return saksdatoSomDate(sortertBehandlingskjede[0].sistOppdatert);
}

function formatterDato(date: Date) {
    return moment(date).format('DD.MM.YYYY [kl.] hh:mm');
}

function hentDatoForSisteHendelse(sakstema: Sakstema) {
    if (sakstema.behandlingskjeder.length > 0 && sakstema.dokumentMetadata.length === 0) {
        return formatterDato(hentSenesteDatoForBehandling(sakstema.behandlingskjeder));
    }
    if (sakstema.behandlingskjeder.length === 0 && sakstema.dokumentMetadata.length > 0) {
        return formatterDato(hentSenesteDatoForDokumenter(sakstema.dokumentMetadata));
    }

    let dateBehandling = hentSenesteDatoForBehandling(sakstema.behandlingskjeder);
    let dateDokumenter = hentSenesteDatoForDokumenter(sakstema.dokumentMetadata);
    return formatterDato(dateBehandling > dateDokumenter ? dateBehandling : dateDokumenter);
}

function SakstemaComponent(props: Props) {
    return (
        <>
            <div>
                <EtikettLiten>{hentDatoForSisteHendelse(props.sakstema)}</EtikettLiten>
                <b>{props.sakstema.temanavn}</b>
            </div>
        </>
    );
}

export default SakstemaComponent;