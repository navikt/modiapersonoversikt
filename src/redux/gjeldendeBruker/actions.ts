import { SetNyGjeldendeBrukerAction, SetNyGjeldendeBrukerActionTypes } from './types';
import { AsyncAction, AsyncDispatch } from '../ThunkTypes';
import { cache } from '@nutgaard/use-fetch';
import { reset } from '../reducer-utils';
import { resetKeepScroll } from '../../utils/hooks/useKeepScroll';
import { AppState } from '../reducers';
import { resetKeepQueryParams } from '../../utils/hooks/useKeepQueryParams';

// Det er neppe denne du har lyst til å bruke
// Denne vil ikke oppdatere url med nytt fnr
// Sansynligvis ønsker du å bruke setNyBrukerIPath som propagerer videre til resten av appen
export default function setGjeldendeBrukerIRedux(fødselsnummer: string): AsyncAction {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        if (getState().gjeldendeBruker.fødselsnummer !== fødselsnummer) {
            dispatch(reset());
            cache.clear();
            resetKeepScroll();
            resetKeepQueryParams();

            const setGjeldendeBrukerAction: SetNyGjeldendeBrukerAction = {
                type: SetNyGjeldendeBrukerActionTypes.SetNyPerson,
                fnr: fødselsnummer
            };
            dispatch(setGjeldendeBrukerAction);
        }
    };
}
