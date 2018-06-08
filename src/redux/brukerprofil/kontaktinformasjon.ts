import { createActionsAndReducer } from '../restReducer';
import { fetchEndreNavKontaktinformasjon, Request } from '../../api/brukerprofil/endre-navkontaktinformasjon-api';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endre-kontaktinformasjon');

export function endreNavKontaktinformasjon(request: Request) {
    console.log(request);
    return action(() => fetchEndreNavKontaktinformasjon(request));
}

function dispatchTilbakestillReducer() { return tilbakestillReducer; }

export { actionNames, dispatchTilbakestillReducer as tilbakestillReducer };
export default reducer;