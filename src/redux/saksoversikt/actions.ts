import { Sakstema } from '../../models/saksoversikt/sakstema';
import { Dokument, DokumentMetadata } from '../../models/saksoversikt/dokumentmetadata';
import { actionKeys, SetValgtDokument, SetValgtEnkeltdokument, SetValgtSakstema, SetVisDokument } from './types';

export function settValgtSakstema(sakstema: Sakstema): SetValgtSakstema {
    return {
        type: actionKeys.SetValgtSakstema,
        sakstema: sakstema
    };
}

export function settValgtDokument(dokument: DokumentMetadata): SetValgtDokument {
    return {
        type: actionKeys.SetValgtDokument,
        dokument: dokument
    };
}

export function settValgtEnkeltdokument(enkeltdokument: Dokument): SetValgtEnkeltdokument {
    return {
        type: actionKeys.SetValgtEnkeltdokument,
        enkeltdokument: enkeltdokument
    };
}

export function settVisDokument(vis: boolean): SetVisDokument {
    return {
        type: actionKeys.SetVisDokument,
        vis: vis
    };
}