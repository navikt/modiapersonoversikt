import { useQueryParams } from 'src/utils/url-utils';
import { useOnMount, useSettAktivBruker } from 'src/utils/customHooks';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import { INFOTABS } from 'src/app/personside/infotabs/InfoTabEnum';
import { paths } from 'src/app/routes/routing';
import { Oppgave } from 'src/models/meldinger/oppgave';
import { apiBaseUri, contextHolderBaseUri } from 'src/api/config';
import { fetchToJson, hasData } from 'src/utils/fetchToJson';
import { post } from 'src/api/api';
import { useMatchRoute, useNavigate } from '@tanstack/react-router';
import { erGyldigishFnr } from 'src/utils/fnr-utils';
import { PropsWithChildren, useState } from 'react';
import { Loader } from '@navikt/ds-react';

function HandleLegacyUrls({ children }: PropsWithChildren) {
    const queryParams = useQueryParams<{
        sokFnr?: string;
        sokFnrCode?: string;
        oppgaveid?: string;
        behandlingsid?: string;
    }>();
    const match = useMatchRoute();
    const fnrMatch = match({ to: '/person/$fnr' });
    const validFnr = fnrMatch && erGyldigishFnr(fnrMatch.fnr ?? '') ? fnrMatch.fnr : undefined;
    const settGjeldendeBruker = useSettAktivBruker();
    const navigate = useNavigate();
    const [delayRender, setDelayRender] = useState(!!validFnr);

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
            handleLegacyUrls(queryParams.sokFnr ?? validFnr);
            setDelayRender(false);
        }
    });

    const handleLegacyUrls = (fnr?: string) => {
        const linkTilValgtHenvendelse = `${paths.personUri}/${INFOTABS.MELDINGER.path}` as const;
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

    return delayRender ? <Loader /> : children;
}

export default HandleLegacyUrls;
