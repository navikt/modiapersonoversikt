import { useQueryParams } from '../../utils/url-utils';
import { useOnMount, useSettAktivBruker } from '../../utils/customHooks';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { INFOTABS } from '../personside/infotabs/InfoTabEnum';
import { paths } from '../routes/routing';
import { Oppgave } from '../../models/meldinger/oppgave';
import { apiBaseUri, contextHolderBaseUri } from '../../api/config';
import { fetchToJson, hasData } from '../../utils/fetchToJson';
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router';
import { post } from '../../api/api';

function useHandleGosysUrl() {
    const queryParams = useQueryParams<{
        sokFnr?: string;
        sokFnrCode?: string;
        oppgaveid?: string;
        behandlingsid?: string;
    }>();
    const dispatch = useDispatch();
    const settGjeldendeBruker = useSettAktivBruker();

    useOnMount(() => {
        if (queryParams.sokFnrCode) {
            post<{
                aktivBruker: string;
                aktivEnhet: string;
            }>(`${contextHolderBaseUri}/context`, {
                eventType: 'NY_AKTIV_BRUKER',
                verdiType: 'FNR_KODE',
                verdi: queryParams.sokFnrCode
            }).then((res) => {
                const url = removeParamFromURL('sokFnrCode');
                window.history.replaceState(null, '', url.toString());
                handleLegacyUrls(res.aktivBruker);
            });
        } else {
            handleLegacyUrls(queryParams.sokFnr);
        }
    });

    const handleLegacyUrls = (fnr?: string) => {
        const linkTilValgtHenvendelse = `${paths.personUri}/${INFOTABS.MELDINGER.path}?traadId=${queryParams.behandlingsid}`;
        if (queryParams.oppgaveid && queryParams.behandlingsid && fnr) {
            fetchToJson<Oppgave>(`${apiBaseUri}/v2/oppgaver/oppgavedata/${queryParams.oppgaveid}`).then((response) => {
                loggEvent('Oppgave', 'FraGosys', { success: hasData(response) });
                settGjeldendeBruker(fnr);
                dispatch(replace(linkTilValgtHenvendelse));
            });
        } else if (fnr && queryParams.behandlingsid) {
            loggEvent('Henvendelse', 'FraGosys');
            settGjeldendeBruker(fnr);
            dispatch(replace(linkTilValgtHenvendelse));
        } else if (queryParams.behandlingsid) {
            loggEvent('Henvendelse', 'FraGosys');
            dispatch(replace(linkTilValgtHenvendelse));
        } else if (fnr) {
            settGjeldendeBruker(fnr);
        }
    };

    const removeParamFromURL = (param: string) => {
        const urlObj = new URL(window.location.href);
        urlObj.searchParams.delete(param);
        return urlObj.toString();
    };
}

export default useHandleGosysUrl;
