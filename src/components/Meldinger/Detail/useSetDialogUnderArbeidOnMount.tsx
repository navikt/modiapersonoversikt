import { useSearch } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { traadKanBesvares, useFilterMeldinger, useTraader } from 'src/components/Meldinger/List/utils';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';

/*
Når meldingersiden mounter for første gang og den valgte tråden kan besvares,
 settes den gjeldende tråden til "under arbeid"
 */
export const useSetDialogUnderArbeidOnMount = () => {
    const search = useSearch({ from: '/new/person/meldinger', shouldThrow: false });
    const traadId = search?.traadId;
    const traadListe = useFilterMeldinger();
    const setDialogUnderArbeid = useSetAtom(dialogUnderArbeidAtom);
    const valgtTraad = traadListe.find((t) => t.traadId === traadId);
    const fnr = useAtomValue(aktivBrukerAtom);
    const { isLoading } = useTraader();
    const prevFnr = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (isLoading) return;
        if (prevFnr.current === fnr) return;
        if (!valgtTraad) return;

        prevFnr.current = fnr;
        const kanBesvares = traadKanBesvares(valgtTraad);
        if (!kanBesvares) return;
        setDialogUnderArbeid(valgtTraad.traadId);
    }, [fnr, isLoading, valgtTraad?.traadId]);
};
