import { Sakstema } from '../../models/saksoversikt/sakstema';
import { Dokument, DokumentMetadata } from '../../models/saksoversikt/dokumentmetadata';
import {
    SaksoversiktActionTypes,
    SetValgtDokument,
    SetValgtEnkeltdokument,
    SetValgtSakstema,
    SetViktigÅViteÅpen,
    SetVisDokument
} from './types';

export function settValgtSakstema(sakstema: Sakstema): SetValgtSakstema {
    return {
        type: SaksoversiktActionTypes.SetValgtSakstema,
        sakstema: sakstema
    };
}

export function settValgtDokument(dokument: DokumentMetadata): SetValgtDokument {
    return {
        type: SaksoversiktActionTypes.SetValgtDokument,
        dokument: dokument
    };
}

export function settValgtEnkeltdokument(enkeltdokument: Dokument): SetValgtEnkeltdokument {
    return {
        type: SaksoversiktActionTypes.SetValgtEnkeltdokument,
        enkeltdokument: enkeltdokument
    };
}

export function settVisDokument(vis: boolean): SetVisDokument {
    return {
        type: SaksoversiktActionTypes.SetVisDokument,
        vis: vis
    };
}

export function setViktigÅViteÅpen(åpen: boolean): SetViktigÅViteÅpen {
    return {
        type: SaksoversiktActionTypes.SetViktigÅViteÅpen,
        åpen: åpen
    };
}