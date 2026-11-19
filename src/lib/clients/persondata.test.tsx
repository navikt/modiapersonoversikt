import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { apiBaseUri } from 'src/api/config';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { server } from 'src/mock/node';
import { representasjonsoppdragMock } from 'src/mock/persondata/representasjonsoppdrag';
import { createPersonData } from 'src/test/createPersonData';
import { expect, it } from 'vitest';
import { usePersonData } from './modiapersonoversikt-api';

it('henter forhold i personresponsen og viser ikke forrige persons forhold under personbytte', async () => {
    const store = createStore();
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const andreRespons = Promise.withResolvers<void>();
    const foresporsler: string[] = [];
    server.use(
        http.post(`${apiBaseUri}/person`, async ({ request }) => {
            const { fnr } = (await request.json()) as { fnr: string };
            foresporsler.push(fnr);
            if (fnr === 'person-b') {
                await andreRespons.promise;
                return HttpResponse.json({ person: createPersonData(), feilendeSystemer: [] });
            }
            return HttpResponse.json({
                person: { ...createPersonData(), ...representasjonsoppdragMock },
                feilendeSystemer: []
            });
        })
    );
    store.set(aktivBrukerAtom, 'person-a');
    const wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );
    const { result, unmount } = renderHook(usePersonData, { wrapper });
    try {
        await waitFor(() => expect(result.current.data?.person.vergehavere).toHaveLength(1));
        act(() => store.set(aktivBrukerAtom, 'person-b'));
        expect(result.current.data).toBeUndefined();
        await waitFor(() => expect(foresporsler).toEqual(['person-a', 'person-b']));
        expect(result.current.isPending).toBe(true);
        andreRespons.resolve();
        await waitFor(() => expect(result.current.data?.person.vergehavere).toEqual([]));
    } finally {
        andreRespons.resolve();
        unmount();
        queryClient.clear();
    }
});

it('beholder vellykkede persondata ved kildefeil uten en separat representasjonsspørring', async () => {
    const store = createStore();
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    store.set(aktivBrukerAtom, 'testperson');
    let kall = 0;
    server.use(
        http.post(`${apiBaseUri}/person`, () => {
            kall += 1;
            return HttpResponse.json({
                person: { ...createPersonData(), vergehavere: representasjonsoppdragMock.vergehavere },
                feilendeSystemer: [PersonDataFeilendeSystemer.REPR_API_FULLMAKTSGIVERE]
            });
        })
    );
    const wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );
    const { result, unmount } = renderHook(usePersonData, { wrapper });
    try {
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.person.vergehavere).toHaveLength(1);
        expect(result.current.data?.person.fullmaktsgivere).toEqual([]);
        expect(result.current.data?.feilendeSystemer).toEqual([PersonDataFeilendeSystemer.REPR_API_FULLMAKTSGIVERE]);
        expect(kall).toBe(1);
    } finally {
        unmount();
        queryClient.clear();
    }
});
