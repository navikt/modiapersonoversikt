import { Loader } from '@navikt/ds-react';
import { useMatchRoute, useNavigate } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import { INFOTABS } from 'src/app/personside/infotabs/InfoTabEnum';
import { paths } from 'src/app/routes/routing';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useSetUserContext } from 'src/lib/clients/contextholder';
import { useOppgave } from 'src/lib/clients/modiapersonoversikt-api';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import { trackDyplenkeFraEksternKilde } from 'src/utils/analytics';
import { useSettAktivBruker } from 'src/utils/customHooks';
import { erGyldigishFnr } from 'src/utils/fnr-utils';
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
    const [delayRender, setDelayRender] = useState(!!validFnr || !!queryParams.oppgaveid);
    const { data: oppgaveData, isLoading } = useOppgave(queryParams.oppgaveid);
    const hasHandled = useRef(false);
    const setDialogUnderArbeid = useSetAtom(dialogUnderArbeidAtom);
    const setUserContext = useSetUserContext();

    useEffect(() => {
        if (queryParams.oppgaveid && isLoading) return;
        if (hasHandled.current) return;
        hasHandled.current = true;

        const behandlingsId = queryParams.henvendelseid || queryParams.behandlingsid;
        const oppgaveId = queryParams.oppgaveid;
        if (queryParams.sokFnrCode) {
            setUserContext.mutate(
                { fnr: queryParams.sokFnrCode, verdiType: 'FNR_CODE' },
                {
                    onSuccess: (res) => {
                        const url = removeParamFromURL('sokFnrCode');
                        window.history.replaceState(null, '', url.toString());
                        handleLegacyUrls(res.aktivBruker, behandlingsId, oppgaveId, oppgaveData);
                    }
                }
            );
        } else {
            handleLegacyUrls(queryParams.sokFnr ?? validFnr, behandlingsId, oppgaveId, oppgaveData);
            setDelayRender(false);
        }
    }, [isLoading, oppgaveData]);

    const handleLegacyUrls = (fnr?: string, behandlingsId?: string, oppgaveId?: string, oppgaveData?: OppgaveDto) => {
        if (oppgaveId && behandlingsId && fnr) {
            settGjeldendeBruker(fnr, false);
            trackDyplenkeFraEksternKilde('oppgave');
            navigerTilTraadOgApneSvar(behandlingsId);
        } else if (fnr && behandlingsId) {
            trackDyplenkeFraEksternKilde('henvendelse');
            settGjeldendeBruker(fnr, false);
            navigerTilTraadOgApneSvar(behandlingsId);
        } else if (behandlingsId) {
            trackDyplenkeFraEksternKilde('henvendelse');
            navigerTilTraadOgApneSvar(behandlingsId);
        } else if (oppgaveData) {
            trackDyplenkeFraEksternKilde('kun oppgave');
            if (!oppgaveData.fnr) return;
            setUserContext.mutate(
                { fnr: oppgaveData.fnr, verdiType: 'FNR' },
                {
                    onSuccess: () => {
                        navigerTilTraadOgApneSvar(oppgaveData.traadId);
                    }
                }
            );
        } else if (fnr) {
            trackDyplenkeFraEksternKilde('kun fnr');
            settGjeldendeBruker(fnr, false);
            navigate({
                to: `${paths.personUri}/${INFOTABS.MELDINGER.path}`,
                replace: true
            });
        }
    };

    const navigerTilTraadOgApneSvar = (traadId?: string) => {
        const linkTilValgtHenvendelse = `${paths.personUri}/${INFOTABS.MELDINGER.path}` as const;
        const newQuery = { traadId: traadId };

        setDialogUnderArbeid(traadId);
        navigate({
            to: linkTilValgtHenvendelse,
            search: newQuery,
            replace: true
        });
    };

    const removeParamFromURL = (param: string) => {
        const urlObj = new URL(window.location.href);
        urlObj.searchParams.delete(param);
        return urlObj.toString();
    };

    return delayRender ? <Loader size="3xlarge" /> : children;
}

export default HandleLegacyUrls;
