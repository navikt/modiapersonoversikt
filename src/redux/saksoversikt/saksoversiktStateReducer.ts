import { DokumentMetadata } from '../../models/saksoversikt/dokumentmetadata';

export interface SaksoversiktReduxState {
    valgtDokument?: DokumentMetadata;
    visDokument: boolean;
}

const initialState: SaksoversiktReduxState = {
    valgtDokument: undefined,
    visDokument: false
};

enum actionKeys {
    SetValgtDokument = 'SetValgtDokument',
    SetVisDokument = 'SetVisDokument'
}

interface SetValgtDokument {
    type: actionKeys.SetValgtDokument;
    dokument: DokumentMetadata;
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

export function settVisDokument(vis: boolean): SetVisDokument {
    return {
        type: actionKeys.SetVisDokument,
        vis: vis
    };
}

type Actions = SetVisDokument | SetValgtDokument;

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
        default:
            return state;
    }
}
