import { describe, expect, test } from 'vitest';
import { combineResettableReducers, reset } from './reducer-utils';

describe('combineResettableReducers', () => {
    const counter = (state = 0, action: { type: string }) => (action.type === 'INCREMENT' ? state + 1 : state);

    test('resets uncached state while keeping cached state', () => {
        const reducer = combineResettableReducers({ count: counter, cached: counter }, ['cached']);
        const state = reducer(undefined, { type: 'INCREMENT' });

        expect(reducer(state, reset())).toEqual({ count: 0, cached: 1 });
        expect(state).toEqual({ count: 1, cached: 1 });
    });

    test('passes reset actions through to cached reducers', () => {
        const cached = (state = 0, action: { type: string }) =>
            action.type === reset().type ? state + 10 : counter(state, action);
        const reducer = combineResettableReducers({ cached }, ['cached']);

        expect(reducer({ cached: 1 }, reset())).toEqual({ cached: 11 });
    });

    test('continues handling actions after a reset', () => {
        const reducer = combineResettableReducers({ count: counter });
        const state = reducer({ count: 3 }, reset());

        expect(reducer(state, { type: 'INCREMENT' })).toEqual({ count: 1 });
    });
});
