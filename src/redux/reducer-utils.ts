import {
    type Action,
    type AnyAction,
    type CombinedState,
    type Reducer,
    type ReducersMapObject,
    combineReducers
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducers: ReducersMapObject<S, any>,
    useCache: Array<Keyof<S>> = []
): Reducer<CombinedState<S>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedReducers = entries<ReducersMapObject<S, any>>(reducers)
        .map(([reducerName, reducerFn]) => {
            if (useCache.includes(reducerName as Keyof<S>)) {
                return [reducerName, reducerFn];
            }
            return [reducerName, resettable(reducerFn)];
        })
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        .reduce((acc, [reducerName, reducerFn]) => ({ ...acc, [`${reducerName}`]: reducerFn }), {});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return combineReducers<S>(mappedReducers as ReducersMapObject<S, any>);
}
