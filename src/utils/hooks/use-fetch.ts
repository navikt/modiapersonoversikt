import { Reducer, ReducerState, useEffect, useReducer, useState } from 'react';

type FetchActionInit = { type: 'FETCH_INIT' };
type FetchActionOk<TYPE> = { type: 'FETCH_OK'; data: TYPE };
type FetchActionError = { type: 'FETCH_ERROR' };
type FetchActions<TYPE> = FetchActionInit | FetchActionError | FetchActionOk<TYPE>;

type FetchData<TYPE> = {
    isLoading: boolean;
    isError: boolean;
    data: TYPE | null;
};
type FetchReducer<TYPE> = Reducer<FetchData<TYPE>, FetchActions<TYPE>>;
const initalState: FetchData<any> = {
    isLoading: true,
    isError: false,
    data: null
};

function fetchReducer<TYPE>(state: FetchData<TYPE>, action: FetchActions<TYPE>): FetchData<TYPE> {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, isError: false };
        case 'FETCH_ERROR':
            return { ...state, isError: true, isLoading: false };
        case 'FETCH_OK':
            return { ...state, isError: false, isLoading: false, data: action.data };
    }
}

export type UseFetchHook<TYPE> = ReducerState<FetchReducer<TYPE>> & {
    refetch(): void;
};

export default function useFetch<TYPE>(url: RequestInfo, option?: RequestInit): UseFetchHook<TYPE> {
    const [rerun, setRerun] = useState(0);
    const [state, dispatch] = useReducer<FetchReducer<TYPE>>(fetchReducer, initalState);
    useEffect(() => {
        let didCancel = false;

        async function fetchData() {
            dispatch({ type: 'FETCH_INIT' });
            try {
                const response = await fetch(url, option);
                const json = await response.json();
                if (!didCancel) {
                    dispatch({ type: 'FETCH_OK', data: json });
                }
            } catch (e) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_ERROR' });
                }
            }
        }

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [url, option, rerun]);

    function refetch() {
        setRerun(rerun + 1);
    }

    return { ...state, refetch };
}

export function combineStates<T>(
    reducer: (acc: T, next: T) => T,
    initialValue: T,
    ...allekall: Array<UseFetchHook<T>>
): UseFetchHook<T> {
    const isLoading = allekall.some(kall => kall.isLoading);
    const isError = allekall.every(kall => kall.isError);
    const data = isLoading
        ? null
        : allekall.filter(kall => kall.data !== null).reduce((acc, kall) => reducer(acc, kall.data!), initialValue);
    const refetch = () => {
        allekall.forEach(kall => kall.refetch());
    };

    return {
        isLoading,
        isError,
        data,
        refetch
    };
}
