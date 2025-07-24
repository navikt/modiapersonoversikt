import { useAtomValue } from 'jotai';
import { useCallback, useEffect } from 'react';
import { $api, usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';

export const useTraadHenvendelse = (traad: Traad) => {
    const enhet = useAtomValue(aktivEnhetAtom);
    const fnr = usePersonAtomValue();
    const { refetch } = usePersonOppgaver();

    const { mutate, data, isSuccess, isPending } = $api.useMutation('post', '/rest/dialog/fortsett/opprett');
    const getOppgave = useCallback(async () => {
        mutate(
            { body: { fnr, enhet, traadId: traad.traadId } },
            {
                onError: (e) => {
                    console.log(e);
                },
                onSuccess: () => {
                    refetch();
                }
            }
        );
    }, [traad.traadId, fnr, enhet, mutate, refetch]);

    useEffect(() => {
        getOppgave();
    }, [getOppgave]);

    return {
        isSuccess,
        isPending,
        data
    };
};
