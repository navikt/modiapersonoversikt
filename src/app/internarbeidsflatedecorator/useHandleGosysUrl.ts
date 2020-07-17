import { useQueryParams } from '../../utils/url-utils';
import { useOnMount } from '../../utils/customHooks';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { useDispatch } from 'react-redux';
import { usePostResource } from '../../rest/consumer/usePostResource';
import { useHistory } from 'react-router';
import { INFOTABS } from '../personside/infotabs/InfoTabEnum';
import { paths } from '../routes/routing';
import { Oppgave } from '../../models/meldinger/oppgave';

function useHandleGosysUrl() {
    const queryParams = useQueryParams<{ sokFnr?: string; oppgaveid?: string; behandlingsid?: string }>();
    const plukkOppgaverResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const dispatch = useDispatch();
    const history = useHistory();

    useOnMount(() => {
        if (queryParams.oppgaveid && queryParams.behandlingsid && queryParams.sokFnr) {
            const oppgave: Oppgave = {
                oppgaveId: queryParams.oppgaveid,
                fødselsnummer: queryParams.sokFnr,
                traadId: queryParams.behandlingsid,
                fraGosys: true
            };
            dispatch(plukkOppgaverResource.actions.setResponse([oppgave]));
            loggEvent('Oppgave', 'FraGosys');
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
