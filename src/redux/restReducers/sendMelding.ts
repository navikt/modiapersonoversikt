import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { Meldingstype, SendMeldingRequest, Temagruppe } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';
import { AsyncDispatch } from '../ThunkTypes';
import { getSaksbehandlerIdent } from '../../utils/loggInfo/getSaksbehandlerIdent';
import { getSaksbehandlerEnhet } from '../../utils/loggInfo/saksbehandlersEnhetInfo';
import { loggError } from '../../utils/frontendLogger';

export function getMeldingPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/sendmelding`;
}

export function sendMeldingActionCreator(payload: Partial<SendMeldingRequest>) {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        const state = getState();
        const saksbehandler = getSaksbehandlerIdent();
        const enhet = getSaksbehandlerEnhet();
        if (!saksbehandler) {
            loggError(new Error('Kunne ikke finne saksbehandlerIdent'));
            return;
        }
        if (!enhet) {
            loggError(new Error('Kunne ikke finne enhet'));
            return;
        }
        const fnr = state.gjeldendeBruker.fødselsnummer;
        const request: SendMeldingRequest = {
            fritekst: '',
            fnr: fnr,
            navident: saksbehandler,
            kanal: '',
            type: Meldingstype.SamtalereferatTelefon,
            tilknyttetEnhet: enhet,
            erTilknyttetAnsatt: false,
            traadId: '',
            kontorsperretEnhet: '',
            temagruppe: Temagruppe.Arbeid,
            ...payload
        };
        dispatch(state.restResources.sendMelding.actions.post(request));
    };
}

export default createPostResourceReducerAndActions<SendMeldingRequest>('send-melding', getMeldingPostUri);
