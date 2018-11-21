import { Dokument, DokumentMetadata } from '../../models/saksoversikt/dokumentmetadata';

export interface SaksoversiktReduxState {
    valgtDokument?: DokumentMetadata;
    valgtEnkeltdokument?: Dokument;
    visDokument: boolean;
}

const initialState: SaksoversiktReduxState = {
    valgtDokument: undefined,
    valgtEnkeltdokument: undefined,
    visDokument: false
};

enum actionKeys {
    SetValgtDokument = 'SetValgtDokument',
    SetValgtEnkeltdokument = 'SetValgtEnkeltdokument',
    SetVisDokument = 'SetVisDokument'
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

type Actions = SetVisDokument | SetValgtDokument | SetValgtEnkeltdokument;

export function saksoversiktStateReducer(state: SaksoversiktReduxState = initialState, action: Actions) {
    switch (action.type) {
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
