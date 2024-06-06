import { useQueryParams } from '../../utils/url-utils';
import { useOnMount, useSettAktivBruker } from '../../utils/customHooks';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { INFOTABS } from '../personside/infotabs/InfoTabEnum';
import { paths } from '../routes/routing';
import { Oppgave } from '../../models/meldinger/oppgave';
import { apiBaseUri } from '../../api/config';
import { fetchToJson, hasData } from '../../utils/fetchToJson';
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router';

function useHandleGosysUrl() {
    const queryParams = useQueryParams<{ sokFnr?: string; oppgaveid?: string; behandlingsid?: string }>();
    const dispatch = useDispatch();
    const settGjeldendeBruker = useSettAktivBruker();

    useOnMount(() => {
        const linkTilValgtHenvendelse = `${paths.personUri}/${INFOTABS.MELDINGER.path}?traadId=${queryParams.behandlingsid}`;

        if (queryParams.oppgaveid && queryParams.behandlingsid && queryParams.sokFnr) {
            fetchToJson<Oppgave>(`${apiBaseUri}/v2/oppgaver/oppgavedata/${queryParams.oppgaveid}`).then((response) => {
                loggEvent('Oppgave', 'FraGosys', { success: hasData(response) });
                settGjeldendeBruker(queryParams.sokFnr as string);
                dispatch(replace(linkTilValgtHenvendelse));
            });
        } else if (queryParams.sokFnr && queryParams.behandlingsid) {
            loggEvent('Henvendelse', 'FraGosys');
            settGjeldendeBruker(queryParams.sokFnr);
            dispatch(replace(linkTilValgtHenvendelse));
        }
    });
}

export default useHandleGosysUrl;
