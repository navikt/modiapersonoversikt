import {
    DokumentAvsenderFilter,
    SaksoversiktActionTypes,
    SetDokumentAvsenderFilter,
    SetErStandaloneVindu,
    SetViktigÅViteÅpen
} from './types';

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
