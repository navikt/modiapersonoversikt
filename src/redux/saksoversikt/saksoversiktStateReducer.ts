import { Dokument, DokumentMetadata } from '../../models/saksoversikt/dokumentmetadata';
import { Sakstema } from '../../models/saksoversikt/sakstema';

export interface SaksoversiktReduxState {
    valgtSakstema?: Sakstema;
    valgtDokument?: DokumentMetadata;
    valgtEnkeltdokument?: Dokument;
    visDokument: boolean;
}

const initialState: SaksoversiktReduxState = {
    valgtSakstema: undefined,
    valgtDokument: undefined,
    valgtEnkeltdokument: undefined,
    visDokument: false
};

enum actionKeys {
    SetValgtSakstema = 'SetValgtSakstema',
    SetValgtDokument = 'SetValgtDokument',
    SetValgtEnkeltdokument = 'SetValgtEnkeltdokument',
    SetVisDokument = 'SetVisDokument'
}

interface SetValgtSakstema {
    type: actionKeys.SetValgtSakstema;
    sakstema: Sakstema;
}

interface SetValgtDokument {
    type: actionKeys.SetValgtDokument;
    dokument: DokumentMetadata;
}

interface SetValgtEnkeltdokument {
    type: actionKeys.SetValgtEnkeltdokument;
    enkeltdokument: Dokument;
}

interface SetVisDokument {
    type: actionKeys.SetVisDokument;
    vis: boolean;
}

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

type Actions = SetVisDokument | SetValgtDokument | SetValgtEnkeltdokument | SetValgtSakstema;

export function saksoversiktStateReducer(state: SaksoversiktReduxState = initialState, action: Actions) {
    switch (action.type) {
        case actionKeys.SetValgtSakstema:
            return {
                ...state,
                valgtSakstema: action.sakstema
            };
        case actionKeys.SetVisDokument:
            return {
                ...state,
                visDokument: action.vis
            };
        case actionKeys.SetValgtDokument:
            return {
                ...state,
                valgtDokument: action.dokument
            };
        case actionKeys.SetValgtEnkeltdokument:
            return {
                ...state,
                valgtEnkeltdokument: action.enkeltdokument
            };
        default:
            return state;
    }
}
