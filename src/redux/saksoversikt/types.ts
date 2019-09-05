import { Sakstema } from '../../models/saksoversikt/sakstema';
import { Dokument, DokumentMetadata } from '../../models/saksoversikt/dokumentmetadata';
import { Action } from 'redux';

export interface DokumentAvsenderFilter {
    fraBruker: boolean;
    fraNav: boolean;
    fraAndre: boolean;
}

export interface SaksoversikState {
    forrigeValgteSakstema?: Sakstema;
    valgtDokument?: DokumentMetadata;
    valgtEnkeltdokument?: Dokument;
    visDokument: boolean;
    viktigÅViteÅpen: boolean;
    erStandaloneVindu: boolean;
    avsenderFilter: DokumentAvsenderFilter;
}

export const initialState: SaksoversikState = {
    forrigeValgteSakstema: undefined,
    valgtDokument: undefined,
    valgtEnkeltdokument: undefined,
    visDokument: false,
    viktigÅViteÅpen: false,
    erStandaloneVindu: false,
    avsenderFilter: {
        fraBruker: true,
        fraNav: true,
        fraAndre: true
    }
};

export enum SaksoversiktActionTypes {
    SetForrigeValgteSakstema = 'SetForrigeValgteSakstema',
    SetValgtDokument = 'SetValgtDokument',
    SetValgtEnkeltdokument = 'SetValgtEnkeltdokument',
    SetVisDokument = 'SetVisDokument',
    SetViktigÅViteÅpen = 'SetViktigÅViteÅpen',
    SetErStandaloneVindu = 'SetErStandaloneVindu',
    SetDokumentAvsenderFilter = 'SetDokumentAvsenderFilter'
}

export interface HuskValgtSakstema {
    type: SaksoversiktActionTypes.SetForrigeValgteSakstema;
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

export interface SetErStandaloneVindu extends Action {
    type: SaksoversiktActionTypes.SetErStandaloneVindu;
    standaloneVindu: boolean;
}

export interface SetDokumentAvsenderFilter {
    type: SaksoversiktActionTypes.SetDokumentAvsenderFilter;
    filterEndring: Partial<DokumentAvsenderFilter>;
}

export type SaksoversiktActions =
    | SetVisDokument
    | SetValgtDokument
    | SetValgtEnkeltdokument
    | HuskValgtSakstema
    | SetViktigÅViteÅpen
    | SetErStandaloneVindu
    | SetDokumentAvsenderFilter;
