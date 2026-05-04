import { Loader } from '@navikt/ds-react';
import { useMatchRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import { INFOTABS } from 'src/app/personside/infotabs/InfoTabEnum';
import { paths } from 'src/app/routes/routing';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useSetUserContext } from 'src/lib/clients/contextholder';
import { useOppgave } from 'src/lib/clients/modiapersonoversikt-api';
import { svarUnderArbeidAtom } from 'src/lib/state/dialog';
import { trackDyplenkeFraEksternKilde } from 'src/utils/analytics';
import { useSettAktivBruker } from 'src/utils/customHooks';
import { erGyldigishFnr } from 'src/utils/fnr-utils';

function HandleLegacyUrls({ children }: PropsWithChildren) {
    const { oppgaveId, sokFnr, sokFnrCode, henvendelseId, behandlingsId } = useSearch({ strict: false });
    const { isOn: nyKommunikasjon } = useFeatureToggle(FeatureToggles.NyKommunikasjon);

    const match = useMatchRoute();
    const fnrMatch = match({ to: '/person/$fnr' });
    const validFnr = fnrMatch && erGyldigishFnr(fnrMatch.fnr ?? '') ? fnrMatch.fnr : undefined;
    const settGjeldendeBruker = useSettAktivBruker();
    const navigate = useNavigate();
    const [delayRender, setDelayRender] = useState(!!validFnr || !!oppgaveId);
    const { data: oppgaveData, isLoading } = useOppgave(oppgaveId);
    const hasHandled = useRef(false);
    const setDialogUnderArbeid = useSetAtom(svarUnderArbeidAtom);
    const setUserContext = useSetUserContext();

    useEffect(() => {
        if (oppgaveId && isLoading) return;
        if (hasHandled.current) return;
        hasHandled.current = true;

        const traadId = henvendelseId || behandlingsId;

        if (sokFnrCode) {
            setUserContext.mutate(
                { fnr: sokFnrCode, verdiType: 'FNR_CODE' },
                {
                    onSuccess: (res) => {
                        const url = removeParamFromURL('sokFnrCode');
                        window.history.replaceState(null, '', url.toString());
                        handleLegacyUrls(res.aktivBruker, traadId, oppgaveId, oppgaveData);
                    }
                }
            );
        } else {
            handleLegacyUrls(sokFnr ?? validFnr, traadId, oppgaveId, oppgaveData);
            setDelayRender(false);
        }
    }, [isLoading, oppgaveData]);

    const handleLegacyUrls = (fnr?: string, traadId?: string, oppgaveId?: string, oppgaveData?: OppgaveDto) => {
        if (oppgaveId && traadId && fnr) {
            settGjeldendeBruker(fnr, false);
            trackDyplenkeFraEksternKilde('oppgave');
            navigerTilTraadOgApneSvar(traadId);
        } else if (fnr && traadId) {
            trackDyplenkeFraEksternKilde('henvendelse');
            settGjeldendeBruker(fnr, false);
            navigerTilTraadOgApneSvar(traadId);
        } else if (traadId) {
            trackDyplenkeFraEksternKilde('henvendelse');
            navigerTilTraadOgApneSvar(traadId);
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

        if (!nyKommunikasjon) setDialogUnderArbeid(traadId);

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
