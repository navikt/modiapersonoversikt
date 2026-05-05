import { useSearch } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { traadKanBesvares, useFilterMeldinger, useTraader } from 'src/components/Meldinger/List/utils';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { svarUnderArbeidAtom } from 'src/lib/state/dialog';

/*
Når meldingersiden mounter for første gang og den valgte tråden kan besvares,
 settes den gjeldende tråden til "under arbeid"
 Dette skrus av i den den nye kommunikasjonsløsningen, da bruker må ta et aktivt valg om å besvare en tråd
 */
export const useSetDialogUnderArbeidOnMount = () => {
    const search = useSearch({ from: '/new/person/meldinger', shouldThrow: false });
    const traadId = search?.traadId;
    const traadListe = useFilterMeldinger();
    const setDialogUnderArbeid = useSetAtom(svarUnderArbeidAtom);
    const valgtTraad = traadListe.find((t) => t.traadId === traadId);
    const fnr = useAtomValue(aktivBrukerAtom);
    const { isLoading } = useTraader();
    const prevFnr = useRef<string | undefined>(undefined);
    const { isOn: isNyKommunikasjonEnabled } = useFeatureToggle(FeatureToggles.NyKommunikasjon);

    useEffect(() => {
        if (isNyKommunikasjonEnabled) return;
        if (isLoading) return;
        if (prevFnr.current === fnr) return;
        if (!valgtTraad) return;

        prevFnr.current = fnr;
        const kanBesvares = traadKanBesvares(valgtTraad);
        if (!kanBesvares) return;
        setDialogUnderArbeid(valgtTraad.traadId);
    }, [fnr, isLoading, valgtTraad?.traadId, isNyKommunikasjonEnabled]);
};
