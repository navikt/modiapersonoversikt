import { Loader } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useSetUserContext } from 'src/lib/clients/contextholder';
import { useOppgave } from 'src/lib/clients/modiapersonoversikt-api';
import { useSettAktivBruker } from 'src/lib/hooks/useSettAktivBruker';
import { trackDyplenkeFraEksternKilde } from 'src/utils/analytics';

function HandleLegacyUrls({ children }: PropsWithChildren) {
    const { oppgaveId, sokFnrCode, henvendelseId, behandlingsId } = useSearch({ strict: false });

    const settGjeldendeBruker = useSettAktivBruker();
    const navigate = useNavigate();
    const [delayRender, setDelayRender] = useState(!!oppgaveId);
    const { data: oppgaveData, isLoading } = useOppgave(oppgaveId);
    const hasHandled = useRef(false);
    const setUserContext = useSetUserContext();

    useEffect(() => {
        if (oppgaveId && isLoading) return;
        if (hasHandled.current) return;
        hasHandled.current = true;

        const traadId = henvendelseId || behandlingsId;

        if (sokFnrCode) {
            setUserContext.mutate(
                { fnr: sokFnrCode, verdiType: 'FNR_KODE' },
                {
                    onSuccess: (res) => {
                        const url = removeParamFromURL('sokFnrCode');
                        window.history.replaceState(null, '', url.toString());
                        handleLegacyUrls(res.aktivBruker, traadId, oppgaveId, oppgaveData);
                        setDelayRender(false);
                    }
                }
            );
        } else {
            handleLegacyUrls(undefined, traadId, oppgaveId, oppgaveData);
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
                    onSuccess: (res) => {
                        settGjeldendeBruker(res.aktivBruker, false);
                        navigerTilTraadOgApneSvar(oppgaveData.traadId);
                    }
                }
            );
        } else if (fnr) {
            trackDyplenkeFraEksternKilde('kun fnr');
            settGjeldendeBruker(fnr, false);
            navigerTilTraadOgApneSvar();
        }
    };

    const navigerTilTraadOgApneSvar = (traadId?: string | null) => {
        const newQuery = { traadId: traadId ?? undefined };

        navigate({
            to: '/new/person/meldinger',
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
