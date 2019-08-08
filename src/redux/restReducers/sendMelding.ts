import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { SendMeldingRequest } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';
import { getSaksbehandlerIdent } from '../../utils/loggInfo/getSaksbehandlerIdent';
import { getSaksbehandlerEnhet } from '../../utils/loggInfo/saksbehandlersEnhetInfo';
import { loggError } from '../../utils/frontendLogger';
import { useDispatch } from 'react-redux';
import { useFødselsnummer, useRestResource } from '../../utils/customHooks';

export function getMeldingPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/sendmelding`;
}

export type SendMeldingRequestRequiredFormData = Pick<
    SendMeldingRequest,
    'fritekst' | 'kanal' | 'type' | 'temagruppe' | 'traadId' | 'kontorsperretEnhet' | 'erTilknyttetAnsatt'
>;

export function useSendMelding() {
    const dispatch = useDispatch();
    const sendMeldingActions = useRestResource(resources => resources.sendMelding.actions);
    const tråderOgMeldingerActions = useRestResource(resources => resources.tråderOgMeldinger.actions);
    const fødselsnummer = useFødselsnummer();
    const saksbehandler = getSaksbehandlerIdent();

    return (payload: SendMeldingRequestRequiredFormData) => {
        if (!saksbehandler) {
            const error = new Error('Kunne ikke finne saksbehandlerident');
            loggError(error);
            dispatch(sendMeldingActions.setError(error));
            return;
        }
        const enhet = getSaksbehandlerEnhet();
        if (!enhet) {
            const error = new Error('Kunne ikke finne enhet');
            loggError(error);
            dispatch(sendMeldingActions.setError(error));
            return;
        }
        const request: SendMeldingRequest = {
            fnr: fødselsnummer,
            navident: saksbehandler,
            tilknyttetEnhet: enhet,
            ...payload
        };
        const reloadMeldinger = () => dispatch(tråderOgMeldingerActions.reload);
        dispatch(sendMeldingActions.post(request, reloadMeldinger));
    };
}

export default createPostResourceReducerAndActions<SendMeldingRequest>('send-melding', getMeldingPostUri);
