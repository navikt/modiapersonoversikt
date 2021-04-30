import { Dispatch, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
    Innstillinger,
    isOk,
    oppdaterInnstillinger,
    sliceSelector as innstillingerSlice,
    State as InnstillingerState
} from '../../redux/innstillinger';
import { useAppState } from '../../utils/customHooks';

const INGEN_INNSTILLINGER = {};
const INNSTILLINGER_KEY = 'lest-oppdateringslogg';
const INGEN_VERDI = -1;
const IKKE_LASTET_VERDI = Number.MAX_SAFE_INTEGER;

function useSisteLestOppdateringLogg(): [number, Dispatch<number>] {
    const dispatch = useDispatch();
    const innstillingerRequest: InnstillingerState = useAppState(innstillingerSlice);
    const harLastetData = isOk(innstillingerRequest);
    const innstillinger: Innstillinger = isOk(innstillingerRequest)
        ? innstillingerRequest.data.innstillinger
        : INGEN_INNSTILLINGER;
    const value: number = isOk(innstillingerRequest)
        ? parseInt(innstillinger[INNSTILLINGER_KEY] ?? INGEN_VERDI)
        : IKKE_LASTET_VERDI;

    const updater: Dispatch<number> = useCallback(
        (newValue: number) => {
            if (harLastetData) {
                dispatch(oppdaterInnstillinger({ ...innstillinger, [INNSTILLINGER_KEY]: newValue.toString() }));
            }
        },
        [dispatch, harLastetData, innstillinger]
    );

    return useMemo(() => [value, updater], [value, updater]);
}

export default useSisteLestOppdateringLogg;
