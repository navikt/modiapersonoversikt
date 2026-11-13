import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { apiBaseUri } from 'src/api/config';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { server } from 'src/mock/node';
import { representasjonsoppdragMock } from 'src/mock/persondata/representasjonsoppdrag';
import { expect, it } from 'vitest';
import { useRepresentasjonsoppdrag } from './modiapersonoversikt-api';

it('tømmer forrige persons forhold under personbytte og bruker en separat query-nøkkel', async () => {
    const store = createStore();
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const andreRespons = Promise.withResolvers<void>();
    const foresporsler: string[] = [];
    server.use(
        http.post(`${apiBaseUri}/person/representasjonsoppdrag`, async ({ request }) => {
            const { fnr } = (await request.json()) as { fnr: string };
            foresporsler.push(fnr);
            if (fnr === 'person-b') {
                await andreRespons.promise;
                return HttpResponse.json({ fullmaktsgivere: [], vergehavere: [], feilendeSystemer: [] });
            }
            return HttpResponse.json(representasjonsoppdragMock);
        })
    );
    store.set(aktivBrukerAtom, 'person-a');
    const wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );
    const { result, unmount } = renderHook(useRepresentasjonsoppdrag, { wrapper });
    try {
        await waitFor(() => expect(result.current.data?.vergehavere).toHaveLength(1));
        act(() => store.set(aktivBrukerAtom, 'person-b'));
        expect(result.current.data).toBeUndefined();
        await waitFor(() => expect(foresporsler).toEqual(['person-a', 'person-b']));
        expect(result.current.isPending).toBe(true);
        andreRespons.resolve();
        await waitFor(() => expect(result.current.data?.vergehavere).toEqual([]));
    } finally {
        andreRespons.resolve();
        unmount();
        queryClient.clear();
    }
});

it('viser HTTP-feil fra klienten og henter forholdene ved manuell retry', async () => {
    const store = createStore();
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    store.set(aktivBrukerAtom, 'testperson');
    server.use(
        http.post(
            `${apiBaseUri}/person/representasjonsoppdrag`,
            () => HttpResponse.json({ message: 'Testfeil' }, { status: 503 }),
            { once: true }
        ),
        http.post(`${apiBaseUri}/person/representasjonsoppdrag`, () => HttpResponse.json(representasjonsoppdragMock))
    );
    const wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );
    const { result, unmount } = renderHook(useRepresentasjonsoppdrag, { wrapper });
    try {
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeUndefined();
        await act(async () => {
            await result.current.refetch();
        });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.vergehavere).toHaveLength(1);
        expect(result.current.data?.fullmaktsgivere).toHaveLength(2);
    } finally {
        unmount();
        queryClient.clear();
    }
});
