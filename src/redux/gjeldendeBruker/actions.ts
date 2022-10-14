import { SetNyGjeldendeBrukerAction, SetNyGjeldendeBrukerActionTypes } from './types';
import { AsyncAction, AsyncDispatch } from '../ThunkTypes';
import { cache } from '@nutgaard/use-fetch';
import { reset } from '../reducer-utils';
import { resetKeepScroll } from '../../utils/hooks/useKeepScroll';
import { AppState } from '../reducers';
import { resetKeepQueryParams } from '../../utils/hooks/useKeepQueryParams';
import { createTrie, searchTrie } from '../../utils/trie';

const trieDelimiter = /\/|\|\|.*/;
const protectedCache = createTrie(
    [
        '/modiapersonoversikt-api/rest/hode/me',
        '/modiapersonoversikt-api/rest/hode/enheter',
        '/modiapersonoversikt-api/rest/baseurls',
        '/modiapersonoversikt-api/rest/enheter/oppgavebehandlere/alle',
        '/modiapersonoversikt-api/rest/dialogoppgave/v2/tema',
        '/modiapersonoversikt-api/rest/tilgang/auth',
        '/modiapersonoversikt-api/rest/featuretoggle',
        '/modiapersonoversikt/proxy/modia-skrivestotte/skrivestotte',
        '/modiapersonoversikt/proxy/modia-innstillinger/api/innstillinger'
    ],
    trieDelimiter
);

// Det er neppe denne du har lyst til å bruke
// Denne vil ikke oppdatere url med nytt fnr
// Sansynligvis ønsker du å bruke setNyBrukerIPath som propagerer videre til resten av appen
export default function setGjeldendeBrukerIRedux(fødselsnummer: string): AsyncAction {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        if (getState().gjeldendeBruker.fødselsnummer !== fødselsnummer) {
            dispatch(reset());

            cache
                .keys()
                .filter((key) => {
                    const res = !searchTrie(protectedCache, key, trieDelimiter);
                    if (!res) {
                        console.log('[FetchCache] protected ', key);
                    }
                    return res;
                })
                .forEach((key) => {
                    console.log('[FetchCache] remove ', key);
                    cache.remove(key);
                });

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
