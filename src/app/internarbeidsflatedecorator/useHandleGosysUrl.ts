import { useQueryParams } from '../../utils/urlUtils';
import { useOnMount } from '../../utils/customHooks';
import { loggEvent } from '../../utils/frontendLogger';
import { useDispatch } from 'react-redux';
import { usePostResource } from '../../rest/consumer/usePostResource';

function useHandleGosysUrl() {
    const queryParams = useQueryParams<{ sokFnr?: string; oppgaveid?: string; behandlingsid?: string }>();
    const plukkOppgaverResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const dispatch = useDispatch();

    useOnMount(() => {
        if (queryParams.oppgaveid && queryParams.behandlingsid && queryParams.sokFnr) {
            const oppgave = {
                oppgaveId: queryParams.oppgaveid,
                fødselsnummer: queryParams.sokFnr,
                traadId: queryParams.behandlingsid,
                fraGosys: true
            };
            dispatch(plukkOppgaverResource.actions.setResponse([oppgave]));
            loggEvent('Oppgave', 'FraGosys');
        }
    });
}

export default useHandleGosysUrl;
