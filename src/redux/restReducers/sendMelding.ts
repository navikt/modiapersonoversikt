import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { SendMeldingRequest } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';
import { AsyncDispatch } from '../ThunkTypes';
import { getSaksbehandlerIdent } from '../../utils/loggInfo/getSaksbehandlerIdent';
import { getSaksbehandlerEnhet } from '../../utils/loggInfo/saksbehandlersEnhetInfo';

export function getMeldingPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/sendmelding`;
}

export function sendMeldingActionCreator(
    payload: Pick<SendMeldingRequest, 'fritekst' | 'kanal' | 'type' | 'temagruppe' | 'traadId' | 'kontorsperretEnhet'>
) {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        const saksbehandler = getSaksbehandlerIdent();
        const enhet = getSaksbehandlerEnhet();
        if (!saksbehandler) {
            throw new Error('Kunne ikke finne saksbehandlerIdent');
        }
        if (!enhet) {
            throw new Error('Kunne ikke finne enhet');
        }
        const state = getState();
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
