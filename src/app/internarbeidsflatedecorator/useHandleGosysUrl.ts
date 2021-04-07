import { useQueryParams } from '../../utils/url-utils';
import { useOnMount } from '../../utils/customHooks';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { useHistory } from 'react-router';
import { INFOTABS } from '../personside/infotabs/InfoTabEnum';
import { paths } from '../routes/routing';
import { Oppgave } from '../../models/meldinger/oppgave';
import { apiBaseUri } from '../../api/config';
import { fetchToJson, hasData } from '../../utils/fetchToJson';

function useHandleGosysUrl() {
    const queryParams = useQueryParams<{ sokFnr?: string; oppgaveid?: string; behandlingsid?: string }>();
    const history = useHistory();

    useOnMount(() => {
        const linkTilValgtHenvendelse = `${paths.personUri}/${queryParams.sokFnr}/${INFOTABS.MELDINGER.path}?traadId=${queryParams.behandlingsid}`;

        if (queryParams.oppgaveid && queryParams.behandlingsid && queryParams.sokFnr) {
            fetchToJson<Oppgave>(`${apiBaseUri}/oppgaver/oppgavedata/${queryParams.oppgaveid}`).then(response => {
                loggEvent('Oppgave', 'FraGosys', { success: hasData(response) });
                history.replace(linkTilValgtHenvendelse);
            });
        } else if (queryParams.sokFnr && queryParams.behandlingsid) {
            loggEvent('Henvendelse', 'FraGosys');
            history.replace(linkTilValgtHenvendelse);
        }
    });
}

export default useHandleGosysUrl;
