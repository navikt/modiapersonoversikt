import {
    DokumentAvsenderFilter,
    SaksoversiktActionTypes,
    SetDokumentAvsenderFilter,
    SetViktigÅViteÅpen
} from './types';

export function setViktigÅViteÅpen(åpen: boolean): SetViktigÅViteÅpen {
    return {
        type: SaksoversiktActionTypes.SetViktigÅViteÅpen,
        åpen: åpen
    };
}

export function oppdaterAvsenderfilter(filter: Partial<DokumentAvsenderFilter>): SetDokumentAvsenderFilter {
    return {
        type: SaksoversiktActionTypes.SetDokumentAvsenderFilter,
        filterEndring: filter
    };
}
