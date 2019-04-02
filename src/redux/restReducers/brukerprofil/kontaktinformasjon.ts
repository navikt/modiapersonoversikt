import { createActionsAndReducer } from '../restResource';
import { postEndreNavKontaktinformasjon, Request } from '../../../api/brukerprofil/endre-navkontaktinformasjon-api';

const { reducer, action, tilbakestill, actionNames } = createActionsAndReducer('endre-kontaktinformasjon');

export function endreNavKontaktinformasjon(request: Request, fødselsnummer: string) {
    return action(() => postEndreNavKontaktinformasjon(request, fødselsnummer));
}

function dispatchtilbakestill() {
    return tilbakestill;
}

export { actionNames, dispatchtilbakestill as tilbakestill };
export default reducer;
