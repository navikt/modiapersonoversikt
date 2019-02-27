import { createActionsAndReducer } from '../restReducer';
import { postEndreNavKontaktinformasjon, Request } from '../../../api/brukerprofil/endre-navkontaktinformasjon-api';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endre-kontaktinformasjon');

export function endreNavKontaktinformasjon(request: Request, fødselsnummer: string) {
    return action(() => postEndreNavKontaktinformasjon(request, fødselsnummer));
}

function dispatchTilbakestillReducer() {
    return tilbakestillReducer;
}

export { actionNames, dispatchTilbakestillReducer as tilbakestillReducer };
export default reducer;
