import { Action, AnyAction, combineReducers, Reducer, ReducersMapObject } from 'redux';

type Keyof<S> = string & keyof S;

function entries<SHAPE>(value: SHAPE): Array<[Keyof<SHAPE>, SHAPE[Keyof<SHAPE>]]> {
    return Object.entries(value) as Array<[Keyof<SHAPE>, SHAPE[Keyof<SHAPE>]]>;
}

enum Type {
    RESET = 'RESETTABLE_REDUCER/RESET',
    INIT = 'RESETTABLE_REDUCER/INIT'
}

export function reset(): Action<Type> {
    return { type: Type.RESET };
}

export function resettable<S>(reducer: Reducer<S>): Reducer<S> {
    return (state: S | undefined, action: AnyAction) => {
        if (action.type === Type.RESET) {
            return reducer(undefined, { type: Type.INIT });
        } else {
            return reducer(state, action);
        }
    };
}
export function combineResettableReducers<S>(
    reducers: ReducersMapObject<S, any>,
    ignore: Array<Keyof<S>> = []
): Reducer<S> {
    const mappedReducers = entries<ReducersMapObject<S, any>>(reducers)
        .map(([reducerName, reducerFn]) => {
            if (ignore.includes(reducerName as Keyof<S>)) {
                return [reducerName, reducerFn];
            } else {
                return [reducerName, resettable(reducerFn)];
            }
        })
        .reduce((acc, [reducerName, reducerFn]) => ({ ...acc, ['' + reducerName]: reducerFn }), {});

    return combineReducers<S>(mappedReducers as ReducersMapObject<S, any>);
}
