import { Action } from 'redux';

const VELG_TEMAGRUPPE = 'VELG_TEMAGRUPPE';

export function velgTemagruppe(temagruppe: string): TemagruppeAction {
    return {
        temagruppe: temagruppe,
        type: VELG_TEMAGRUPPE
    };
}

type TemagruppeAction =  {
    temagruppe: string;
} & Action;

export default function reducer(temagruppe: string | null = null, action: TemagruppeAction) {
    switch (action.type) {
        case VELG_TEMAGRUPPE:
            return action.temagruppe;
        default:
            return temagruppe;
    }
}
