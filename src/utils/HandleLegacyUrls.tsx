import { Loader } from '@navikt/ds-react';
import { useMatchRoute, useNavigate } from '@tanstack/react-router';
import { type PropsWithChildren, useState } from 'react';
import { post } from 'src/api/api';
import { contextHolderBaseUri } from 'src/api/config';
import { INFOTABS } from 'src/app/personside/infotabs/InfoTabEnum';
import { paths } from 'src/app/routes/routing';
import { useOppgave } from 'src/lib/clients/modiapersonoversikt-api';
import { useOnMount, useSettAktivBruker } from 'src/utils/customHooks';
import { erGyldigishFnr } from 'src/utils/fnr-utils';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import { useQueryParams } from 'src/utils/url-utils';

function HandleLegacyUrls({ children }: PropsWithChildren) {
    const queryParams = useQueryParams<{
        sokFnr?: string;
        sokFnrCode?: string;
        oppgaveid?: string;
        behandlingsid?: string;
        henvendelseid?: string;
    }>();
    const match = useMatchRoute();
    const fnrMatch = match({ to: '/person/$fnr' });
    const validFnr = fnrMatch && erGyldigishFnr(fnrMatch.fnr ?? '') ? fnrMatch.fnr : undefined;
    const settGjeldendeBruker = useSettAktivBruker();
    const navigate = useNavigate();
    const [delayRender, setDelayRender] = useState(!!validFnr);

    useOnMount(() => {
        const behandlingsId = queryParams.henvendelseid || queryParams.behandlingsid;
        const oppgaveId = queryParams.oppgaveid;
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
                handleLegacyUrls(res.aktivBruker, behandlingsId, oppgaveId);
            });
        } else {
            handleLegacyUrls(queryParams.sokFnr ?? validFnr, behandlingsId, oppgaveId);
            setDelayRender(false);
        }
    });

    const handleLegacyUrls = (fnr?: string, behandlingsId?: string, oppgaveId?: string) => {
        const linkTilValgtHenvendelse = `${paths.personUri}/${INFOTABS.MELDINGER.path}` as const;
        const newQuery = { traadId: behandlingsId };

        if (oppgaveId && behandlingsId && fnr) {
            settGjeldendeBruker(fnr, false);
            loggEvent('Oppgave', 'FraGosys');
            navigate({
                to: linkTilValgtHenvendelse,
                search: newQuery,
                replace: true
            });
        } else if (fnr && behandlingsId) {
            loggEvent('Henvendelse', 'FraGosys');
            settGjeldendeBruker(fnr, false);
            navigate({
                to: linkTilValgtHenvendelse,
                search: newQuery,
                replace: true
            });
        } else if (behandlingsId) {
            loggEvent('Henvendelse', 'FraGosys');
            navigate({
                to: linkTilValgtHenvendelse,
                search: newQuery,
                replace: true
            });
        } else if (oppgaveId) {
            loggEvent('Oppgave', 'FraGosys');
            const { data: oppgaveData } = useOppgave(oppgaveId);
            post<{
                aktivBruker: string;
                aktivEnhet: string;
            }>(`${contextHolderBaseUri}/context`, {
                eventType: 'NY_AKTIV_BRUKER',
                verdiType: 'FNR',
                verdi: oppgaveData.fnr
            }).then(() => {
                const query = { traadId: oppgaveData.traadId };
                navigate({
                    to: linkTilValgtHenvendelse,
                    search: query,
                    replace: true
                });
            });
        } else if (fnr) {
            settGjeldendeBruker(fnr);
        }
    };

    const removeParamFromURL = (param: string) => {
        const urlObj = new URL(window.location.href);
        urlObj.searchParams.delete(param);
        return urlObj.toString();
    };

    return delayRender ? <Loader size="3xlarge" /> : children;
}

export default HandleLegacyUrls;
