import { type Action, type AnyAction, combineReducers, type Reducer } from 'redux';

enum Type {
    RESET = 'RESETTABLE_REDUCER/RESET',
    INIT = 'RESETTABLE_REDUCER/INIT'
}

export function reset(): Action<Type> {
    return { type: Type.RESET };
}

function resettable<S>(reducer: Reducer<S, AnyAction>): Reducer<S, AnyAction> {
    return (state: S | undefined, action: AnyAction) => {
        if (action.type === Type.RESET) {
            return reducer(undefined, { type: Type.INIT });
        }
        return reducer(state, action);
    };
}
export function combineResettableReducers<S extends object>(
    // biome-ignore lint/suspicious/noExplicitAny: each reducer declares its own action union
    reducers: { [K in keyof S]: Reducer<S[K], any> },
    useCache: Array<keyof S> = []
) {
    const mappedReducers = { ...reducers };
    for (const reducerName in mappedReducers) {
        if (!useCache.includes(reducerName)) {
            mappedReducers[reducerName] = resettable(mappedReducers[reducerName]);
        }
    }

    return combineReducers(mappedReducers);
}
