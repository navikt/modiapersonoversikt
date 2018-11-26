import { Sakstema } from '../../models/saksoversikt/sakstema';
import { Dokument, DokumentMetadata } from '../../models/saksoversikt/dokumentmetadata';

export interface SaksoversiktReduxState {
    valgtSakstema?: Sakstema;
    valgtDokument?: DokumentMetadata;
    valgtEnkeltdokument?: Dokument;
    visDokument: boolean;
}

export const initialState: SaksoversiktReduxState = {
    valgtSakstema: undefined,
    valgtDokument: undefined,
    valgtEnkeltdokument: undefined,
    visDokument: false
};

export enum actionKeys {
    SetValgtSakstema = 'SetValgtSakstema',
    SetValgtDokument = 'SetValgtDokument',
    SetValgtEnkeltdokument = 'SetValgtEnkeltdokument',
    SetVisDokument = 'SetVisDokument'
}

export interface SetValgtSakstema {
    type: actionKeys.SetValgtSakstema;
    sakstema: Sakstema;
}

export interface SetValgtDokument {
    type: actionKeys.SetValgtDokument;
    dokument: DokumentMetadata;
}

export interface SetValgtEnkeltdokument {
    type: actionKeys.SetValgtEnkeltdokument;
    enkeltdokument: Dokument;
}

export interface SetVisDokument {
    type: actionKeys.SetVisDokument;
    vis: boolean;
}

export type Actions = SetVisDokument | SetValgtDokument | SetValgtEnkeltdokument | SetValgtSakstema;