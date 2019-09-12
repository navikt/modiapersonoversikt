import { Sakstema } from '../../models/saksoversikt/sakstema';
import { Dokument, DokumentMetadata } from '../../models/saksoversikt/dokumentmetadata';
import {
    DokumentAvsenderFilter,
    SaksoversiktActionTypes,
    SetDokumentAvsenderFilter,
    SetErStandaloneVindu,
    SetValgtDokument,
    SetValgtEnkeltdokument,
    HuskValgtSakstema,
    SetViktigÅViteÅpen,
    SetVisDokument
} from './types';

export function huskValgtSakstema(sakstema: Sakstema): HuskValgtSakstema {
    return {
        type: SaksoversiktActionTypes.SetForrigeValgteSakstema,
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

export function setErStandaloneVindu(standaloneVindu: boolean): SetErStandaloneVindu {
    return {
        type: SaksoversiktActionTypes.SetErStandaloneVindu,
        standaloneVindu: standaloneVindu
    };
}

export function oppdaterAvsenderfilter(filter: Partial<DokumentAvsenderFilter>): SetDokumentAvsenderFilter {
    return {
        type: SaksoversiktActionTypes.SetDokumentAvsenderFilter,
        filterEndring: filter
    };
}
