import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

interface Storage {
    get(key: string): string | null;
    set(key: string, value: string): void;
}
class LocalStorageProvider implements Storage {
    private readonly scope: string;
    constructor(scope: string) {
        this.scope = scope;
    }
    get(key: string) {
        return window.localStorage.getItem(`${this.scope}.${key}`);
    }
    set(key: string, value: string) {
        window.localStorage.setItem(`${this.scope}.${key}`, value);
    }
}
const localStorageProvider = new LocalStorageProvider('modiapersonoversikt');

function usePersistentState<S>(
    key: string,
    initialValue: S,
    storage: Storage = localStorageProvider
): [S, Dispatch<SetStateAction<S>>] {
    const [state, setState] = React.useState(() => {
        const storedValue = storage.get(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
        return initialValue;
    });
    const setter: Dispatch<SetStateAction<S>> = React.useCallback(
        (s: S | ((prev: S) => S)) => {
            if (typeof s === 'function') {
                setState((prev: S) => {
                    const newState = (s as (prev: S) => S)(prev);
                    storage.set(key, JSON.stringify(newState));
                    return newState;
                });
            } else {
                storage.set(key, JSON.stringify(s));
                setState(s);
            }
        },
        [storage, setState, key]
    );
    return [state, setter];
}
export default usePersistentState;
