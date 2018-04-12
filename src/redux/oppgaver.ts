import { plukkOppgaveFraServer } from '../api/oppgave-api';
import { createActionsAndReducer } from './restReducer';
import { Oppgave } from '../models/oppgave';
import { settNyPersonIKontekst } from '../app/routes/routing';
import { Dispatch } from 'react-redux';
import { Action } from 'redux';

const { reducer, action} = createActionsAndReducer('oppgave');

export function plukkOppgaver(dispatch: Dispatch<Action>, enhet: string, temagruppe: string) {
    dispatch(action(() => plukkOppgaveFraServer(enhet, temagruppe)))
        .then((oppgaver: Oppgave[]) => hentPersonBasertPåPlukketOppgaver(dispatch, oppgaver ));
}

function hentPersonBasertPåPlukketOppgaver(dispatch: Dispatch<Action>, oppgaver: Oppgave[]) {
    const fødselsnummer = selectFodselsnummerfraOppgaver(oppgaver);
    if (fødselsnummer) {
        settNyPersonIKontekst(dispatch, fødselsnummer);
    }
}

export function selectFodselsnummerfraOppgaver(oppgaver: Oppgave[]) {
    if (oppgaver.length === 0) {
        return null;
    } else {
        return oppgaver[0].fodselsnummer;
    }
}

export default reducer;