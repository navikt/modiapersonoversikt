import {
    type Action,
    type AnyAction,
    type CombinedState,
    combineReducers,
    type Reducer,
    type ReducersMapObject
} from 'redux';

type Keyof<S> = string & keyof S;

function entries<SHAPE extends object>(value: SHAPE): Array<[Keyof<SHAPE>, SHAPE[Keyof<SHAPE>]]> {
    return Object.entries(value) as Array<[Keyof<SHAPE>, SHAPE[Keyof<SHAPE>]]>;
}

enum Type {
    RESET = 'RESETTABLE_REDUCER/RESET',
    INIT = 'RESETTABLE_REDUCER/INIT'
}

export function reset(): Action<Type> {
    return { type: Type.RESET };
}

function resettable<S>(reducer: Reducer<S>): Reducer<S> {
    return (state: S | undefined, action: AnyAction) => {
        if (action.type === Type.RESET) {
            return reducer(undefined, { type: Type.INIT });
        }
        return reducer(state, action);
    };
}
export function combineResettableReducers<S>(
    //biome-ignore lint/suspicious/noExplicitAny: biome migration
    reducers: ReducersMapObject<S, any>,
    useCache: Array<Keyof<S>> = []
): Reducer<CombinedState<S>> {
    //biome-ignore lint/suspicious/noExplicitAny: biome migration
    const mappedReducers = entries<ReducersMapObject<S, any>>(reducers)
        .map(([reducerName, reducerFn]) => {
            if (useCache.includes(reducerName as Keyof<S>)) {
                return [reducerName, reducerFn];
            }
            return [reducerName, resettable(reducerFn)];
        })
        .reduce(
            (acc, [reducerName, reducerFn]) => ({
                //biome-ignore lint/performance/noAccumulatingSpread: biome migration
                ...acc,
                [`${reducerName}`]: reducerFn
            }),
            {}
        );

    //biome-ignore lint/suspicious/noExplicitAny: biome migration
    return combineReducers<S>(mappedReducers as ReducersMapObject<S, any>);
}
