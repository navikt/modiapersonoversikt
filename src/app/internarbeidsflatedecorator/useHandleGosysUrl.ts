import { useQueryParams } from '../../utils/url-utils';
import { useOnMount, useSettAktivBruker } from '../../utils/customHooks';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { INFOTABS } from '../personside/infotabs/InfoTabEnum';
import { paths } from '../routes/routing';
import { Oppgave } from '../../models/meldinger/oppgave';
import { apiBaseUri, contextHolderBaseUri } from '../../api/config';
import { fetchToJson, hasData } from '../../utils/fetchToJson';
import { post } from '../../api/api';
import { useNavigate } from '@tanstack/react-router';

function useHandleGosysUrl() {
    const queryParams = useQueryParams<{
        sokFnr?: string;
        sokFnrCode?: string;
        oppgaveid?: string;
        behandlingsid?: string;
    }>();
    const settGjeldendeBruker = useSettAktivBruker();
    const navigate = useNavigate();

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
        const linkTilValgtHenvendelse = `${paths.personUri}/${INFOTABS.MELDINGER.path}`;
        const newQuery = { traadId: queryParams.behandlingsid };
        if (queryParams.oppgaveid && queryParams.behandlingsid && fnr) {
            fetchToJson<Oppgave>(`${apiBaseUri}/v2/oppgaver/oppgavedata/${queryParams.oppgaveid}`).then((response) => {
                loggEvent('Oppgave', 'FraGosys', { success: hasData(response) });
                settGjeldendeBruker(fnr);
                navigate({ to: linkTilValgtHenvendelse, search: newQuery, replace: true });
            });
        } else if (fnr && queryParams.behandlingsid) {
            loggEvent('Henvendelse', 'FraGosys');
            settGjeldendeBruker(fnr);
            navigate({ to: linkTilValgtHenvendelse, search: newQuery, replace: true });
        } else if (queryParams.behandlingsid) {
            loggEvent('Henvendelse', 'FraGosys');
            navigate({ to: linkTilValgtHenvendelse, search: newQuery, replace: true });
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
