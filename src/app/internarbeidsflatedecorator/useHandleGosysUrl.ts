import { useQueryParams } from '../../utils/url-utils';
import { useOnMount } from '../../utils/customHooks';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { useDispatch } from 'react-redux';
import { usePostResource } from '../../rest/consumer/usePostResource';
import { useHistory } from 'react-router';
import { INFOTABS } from '../personside/infotabs/InfoTabEnum';
import { paths } from '../routes/routing';
import { Oppgave } from '../../models/meldinger/oppgave';
import { apiBaseUri } from '../../api/config';
import { fetchToJson, hasData } from '../../utils/fetchToJson';

function useHandleGosysUrl() {
    const queryParams = useQueryParams<{ sokFnr?: string; oppgaveid?: string; behandlingsid?: string }>();
    const plukkOppgaverResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const dispatch = useDispatch();
    const history = useHistory();

    useOnMount(() => {
        if (queryParams.oppgaveid && queryParams.behandlingsid && queryParams.sokFnr) {
            fetchToJson<Oppgave>(`${apiBaseUri}/oppgaver/oppgavedata/${queryParams.oppgaveid}`).then(response => {
                if (hasData(response)) {
                    dispatch(plukkOppgaverResource.actions.setResponse([response.data]));
                    loggEvent('Oppgave', 'FraGosys');
                }
            });
        } else if (queryParams.sokFnr && queryParams.behandlingsid) {
            const linkTilValgtHenvendelse = `${paths.personUri}/${
                queryParams.sokFnr
            }/${INFOTABS.MELDINGER.toLowerCase()}?traadId=${queryParams.behandlingsid}`;
            history.replace(linkTilValgtHenvendelse);
            loggEvent('Henvendelse', 'FraGosys');
        }
    });
}

export default useHandleGosysUrl;
