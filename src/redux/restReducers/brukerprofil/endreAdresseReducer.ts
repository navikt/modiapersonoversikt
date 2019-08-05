import {
    EndreAdresseRequest,
    getEndreNorskGateadresseRequest,
    getEndreMatrikkeladresseRequest,
    getEndrePostboksadresseRequest,
    getEndreUtenlandsadresseRequest,
    getSlettMidlertidigeAdresserRequest
} from './adresse-api';
import { Gateadresse, Matrikkeladresse, Postboksadresse, Utlandsadresse } from '../../../models/personadresse';
import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import { AsyncDispatch } from '../../ThunkTypes';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';

function getEndreAdressePostUri(state: AppState, request: EndreAdresseRequest) {
    const fødselsnummer = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/brukerprofil/${fødselsnummer}/adresse/`;
}

export default createPostResourceReducerAndActions<EndreAdresseRequest>('endreadresse', getEndreAdressePostUri);

function createThunkPoster(request: EndreAdresseRequest) {
    return (d: AsyncDispatch, getState: () => AppState) => {
        const postEndreAdresse = getState().restResources.endreAdresse.actions.post;
        d(postEndreAdresse(request));
    };
}

export function endreNorskGateadresse(gateadresse: Gateadresse) {
    return createThunkPoster(getEndreNorskGateadresseRequest(gateadresse));
}

export function endreMatrikkeladresse(matrikkeladresse: Matrikkeladresse) {
    return createThunkPoster(getEndreMatrikkeladresseRequest(matrikkeladresse));
}

export function endrePostboksadrese(postboksadresse: Postboksadresse) {
    return createThunkPoster(getEndrePostboksadresseRequest(postboksadresse));
}

export function slettMidlertidigeAdresser() {
    return createThunkPoster(getSlettMidlertidigeAdresserRequest());
}

export function endreUtlandsadresse(utlandsadresse: Utlandsadresse) {
    return createThunkPoster(getEndreUtenlandsadresseRequest(utlandsadresse));
}
