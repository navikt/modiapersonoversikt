import { getRouteApi } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { traadKanBesvares, useFilterMeldinger } from 'src/components/Meldinger/List/utils';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';

const routeApi = getRouteApi('/new/person/meldinger');

/*
Når meldingersiden mounter for første gang og den valgte tråden kan besvares,
 settes den gjeldende tråden til "under arbeid"
 */
export const useSetDialogUnderArbeidOnMount = () => {
    const { traadId } = routeApi.useSearch();
    const traadListe = useFilterMeldinger();
    const setDialogUnderArbeid = useSetAtom(dialogUnderArbeidAtom);
    const valgtTraad = traadListe.find((t) => t.traadId === traadId);

    useEffect(() => {
        if (!valgtTraad) return;
        const kanBesvares = traadKanBesvares(valgtTraad);

        if (!kanBesvares) return;
        setDialogUnderArbeid(valgtTraad.traadId);
    }, []);
};
