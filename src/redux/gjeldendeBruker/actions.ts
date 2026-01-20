import { resetKeepScroll } from '../../utils/hooks/useKeepScroll';
import { reset } from '../reducer-utils';
import type { AppState } from '../reducers';
import type { AsyncAction, AsyncDispatch } from '../ThunkTypes';
import { type SetNyGjeldendeBrukerAction, SetNyGjeldendeBrukerActionTypes } from './types';

// Det er neppe denne du har lyst til å bruke
// Denne vil ikke oppdatere url med nytt fnr
// Sansynligvis ønsker du å bruke setNyBrukerIPath som propagerer videre til resten av appen
export default function setGjeldendeBrukerIRedux(fødselsnummer: string): AsyncAction {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        if (getState().gjeldendeBruker.fødselsnummer !== fødselsnummer) {
            dispatch(reset());
            resetKeepScroll();

            const setGjeldendeBrukerAction: SetNyGjeldendeBrukerAction = {
                type: SetNyGjeldendeBrukerActionTypes.SetNyPerson,
                fnr: fødselsnummer
            };
            dispatch(setGjeldendeBrukerAction);
        }
    };
}
