import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { SendMeldingRequest } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';
import { AsyncDispatch } from '../ThunkTypes';

export function getMeldingPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/meldinger/sendmelding`;
}

export function sendMeldingActionCreator(payload: Partial<SendMeldingRequest>) {
    const request: SendMeldingRequest = {
        fritekst: '',
        fnr: '',
        navident: '',
        kanal: '',
        type: '',
        tilknyttetEnhet: '',
        erTilknyttetAnsatt: false,
        traadId: '',
        kontorsperretEnhet: '',
        temagruppe: '',
        ...payload
    };
    return (dispatch: AsyncDispatch, getState: () => AppState) =>
        dispatch(getState().restResources.sendMelding.actions.post(request));
}

export default createPostResourceReducerAndActions<SendMeldingRequest>('meldinger', getMeldingPostUri);
