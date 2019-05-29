import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { SendMeldingRequest } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';
import { AsyncDispatch } from '../ThunkTypes';
import { getSaksbehandlerIdent } from '../../utils/loggInfo/getSaksbehandlerIdent';
import { getSaksbehandlerEnhet } from '../../utils/loggInfo/saksbehandlersEnhetInfo';
import { loggError } from '../../utils/frontendLogger';

export function getMeldingPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/sendmelding`;
}

export const resetSendMeldingActionCreator = (dispatch: AsyncDispatch, getState: () => AppState) =>
    dispatch(getState().restResources.sendMelding.actions.reset);

export function sendMeldingActionCreator(
    payload: Pick<SendMeldingRequest, 'fritekst' | 'kanal' | 'type' | 'temagruppe' | 'traadId' | 'kontorsperretEnhet'>
) {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        const saksbehandler = getSaksbehandlerIdent();
        const state = getState();
        if (!saksbehandler) {
            const error = new Error('Kunne ikke finne saksbehandlerident');
            loggError(error);
            dispatch(state.restResources.sendMelding.actions.setError(error));
            return;
        }
        const enhet = getSaksbehandlerEnhet();
        if (!enhet) {
            const error = new Error('Kunne ikke finne enhet');
            loggError(error);
            dispatch(state.restResources.sendMelding.actions.setError(error));
            return;
        }
        const fnr = state.gjeldendeBruker.fødselsnummer;
        const request: SendMeldingRequest = {
            fnr: fnr,
            navident: saksbehandler,
            tilknyttetEnhet: enhet,
            erTilknyttetAnsatt: false,
            ...payload
        };
        dispatch(state.restResources.sendMelding.actions.post(request));
    };
}

export default createPostResourceReducerAndActions<SendMeldingRequest>('send-melding', getMeldingPostUri);
