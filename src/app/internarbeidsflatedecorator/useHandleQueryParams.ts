import { useHistory } from 'react-router';
import { useQueryParams } from '../../utils/urlUtils';
import { paths, setNyBrukerIPath } from '../routes/routing';
import { useOnMount } from '../../utils/customHooks';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { INFOTABS } from '../personside/infotabs/InfoTabEnum';
import { useDispatch } from 'react-redux';
import { usePostResource } from '../../rest/consumer/usePostResource';

function useHandleQueryParams() {
    const history = useHistory();
    const queryParams = useQueryParams<{ sokFnr?: string; oppgaveid?: string; behandlingsid?: string }>();
    const sokFnr = queryParams.sokFnr === '0' ? undefined : queryParams.sokFnr;
    const plukkOppgaverResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const dispatch = useDispatch();

    useOnMount(() => {
        if (queryParams.behandlingsid && sokFnr) {
            history.push(
                `${paths.personUri}/${sokFnr}/${INFOTABS.MELDINGER.toLowerCase()}/${queryParams.behandlingsid}`
            );
            if (queryParams.oppgaveid) {
                dispatch(
                    plukkOppgaverResource.actions.setResponse([
                        {
                            oppgaveId: queryParams.oppgaveid,
                            fødselsnummer: sokFnr,
                            traadId: queryParams.behandlingsid,
                            fraGosys: true
                        }
                    ])
                );
                loggEvent('Oppgave', 'FraGosys');
            }
        } else if (sokFnr) {
            loggEvent('Oppslag', 'Puzzle');
            setNyBrukerIPath(history, sokFnr);
        }
    });
    return { queryParams, sokFnr };
}

export default useHandleQueryParams;
