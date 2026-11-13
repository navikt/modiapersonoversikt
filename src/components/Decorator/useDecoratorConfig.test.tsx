import { renderHook } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { vi } from 'vitest';
import { useDecoratorConfig } from './useDecoratorConfig';

vi.mock('src/components/featureToggle/useFeatureToggle', () => ({
    default: () => ({ isOn: false })
}));
vi.mock('src/components/Oppdateringslogg/OppdateringsloggContainer', () => ({
    DecoratorButtonId: 'oppdateringslogg'
}));
vi.mock('src/lib/hooks/useSettAktivBruker', () => ({
    useSettAktivBruker: () => vi.fn()
}));

const originalUrl = window.location.href;

afterEach(() => {
    window.history.replaceState(null, '', originalUrl);
});

it('bruker aktiv person fremfor rått fødselsnummer fra URL-en', () => {
    const store = createStore();
    store.set(aktivBrukerAtom, '11111111111');
    window.history.replaceState(null, '', '?sokFnr=00000000000');

    const { result } = renderHook(useDecoratorConfig, {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    expect(result.current.configV3.fnr).toBe('11111111111');
    expect(result.current.configV3.userKey).toBe('11111111111');
});

it('velger ikke person fra URL-en når aktiv person mangler', () => {
    const store = createStore();
    store.set(aktivBrukerAtom, undefined);
    window.history.replaceState(null, '', '?sokFnr=00000000000');

    const { result } = renderHook(useDecoratorConfig, {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    expect(result.current.configV3.fnr).toBeUndefined();
    expect(result.current.configV3.userKey).toBeUndefined();
});
