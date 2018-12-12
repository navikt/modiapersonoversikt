import { Sakstema } from '../../models/saksoversikt/sakstema';
import { Dokument, DokumentMetadata } from '../../models/saksoversikt/dokumentmetadata';
import { Action } from 'redux';

export interface DokumentAvsenderFilter {
    fraBruker: boolean;
    fraNav: boolean;
    fraAndre: boolean;
}

export interface SaksoversikState {
    valgtSakstema?: Sakstema;
    valgtDokument?: DokumentMetadata;
    valgtEnkeltdokument?: Dokument;
    visDokument: boolean;
    viktigÅViteÅpen: boolean;
    avsenderFilter: DokumentAvsenderFilter;
}

export const initialState: SaksoversikState = {
    valgtSakstema: undefined,
    valgtDokument: undefined,
    valgtEnkeltdokument: undefined,
    visDokument: false,
    viktigÅViteÅpen: false,
    avsenderFilter: {
        fraBruker: true,
        fraNav: true,
        fraAndre: true
    }
};

export enum SaksoversiktActionTypes {
    SetValgtSakstema = 'SetValgtSakstema',
    SetValgtDokument = 'SetValgtDokument',
    SetValgtEnkeltdokument = 'SetValgtEnkeltdokument',
    SetVisDokument = 'SetVisDokument',
    SetViktigÅViteÅpen = 'SetViktigÅViteÅpen',
    SetDokumentAvsenderFilter = 'SetDokumentAvsenderFilter'
}

export interface SetValgtSakstema {
    type: SaksoversiktActionTypes.SetValgtSakstema;
    sakstema: Sakstema;
}

export interface SetValgtDokument {
    type: SaksoversiktActionTypes.SetValgtDokument;
    dokument: DokumentMetadata;
}

export interface SetValgtEnkeltdokument {
    type: SaksoversiktActionTypes.SetValgtEnkeltdokument;
    enkeltdokument: Dokument;
}

export interface SetVisDokument {
    type: SaksoversiktActionTypes.SetVisDokument;
    vis: boolean;
}

export interface SetViktigÅViteÅpen extends Action {
    type: SaksoversiktActionTypes.SetViktigÅViteÅpen;
    åpen: boolean;
}

export interface SetDokumentAvsenderFilter {
    type: SaksoversiktActionTypes.SetDokumentAvsenderFilter;
    filterEndring: Partial<DokumentAvsenderFilter>;
}

export type SaksoversiktActions =
    SetVisDokument |
    SetValgtDokument |
    SetValgtEnkeltdokument |
    SetValgtSakstema |
    SetViktigÅViteÅpen |
    SetDokumentAvsenderFilter;