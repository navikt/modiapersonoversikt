import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { apiBaseUri } from 'src/api/config';
import { dialogSuksessMeldingAtom, referatResultatAtom } from 'src/components/melding/MeldingPanel';
import { type SendMeldingRequestV2, SendMeldingRequestV2TraadType } from 'src/generated/modiapersonoversikt-api';
import { aktivBrukerAtom, aktivEnhetAtom } from 'src/lib/state/context';
import { server } from 'src/mock/node';
import { $api, useSendMelding } from './modiapersonoversikt-api';

const body: SendMeldingRequestV2 = {
    fnr: '00000000000',
    enhet: '0101',
    traadType: SendMeldingRequestV2TraadType.SAMTALEREFERAT,
    fritekst: 'Syntetisk referat',
    temagruppe: 'PENS',
    sak: { temaKode: 'DAG', sakstype: 'GEN' }
};

function renderMutation() {
    const store = createStore();
    store.set(aktivBrukerAtom, body.fnr);
    store.set(aktivEnhetAtom, body.enhet);
    const queryClient = new QueryClient({
        defaultOptions: { queries: { refetchOnMount: false, retry: false } }
    });
    const wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );
    return { ...renderHook(() => useSendMelding(), { wrapper }), store, queryClient };
}

describe('sende og journalføre referat', () => {
    test('viser kombinert kvittering først når backend har svart', async () => {
        server.use(
            http.post(`*${apiBaseUri}/dialog/sendmelding`, () =>
                HttpResponse.json({ traadId: 'nytt-referat', journalforingFeilet: false })
            )
        );
        const { result, store } = renderMutation();

        await act(() => result.current.mutateAsync({ body }));

        expect(store.get(referatResultatAtom)).toMatchObject({
            traadId: 'nytt-referat',
            variant: 'success',
            melding: 'Referatet er sendt og journalført.'
        });
        expect(store.get(dialogSuksessMeldingAtom)).toBeNull();
    });

    test('beholder tråd-ID ved journalføringsfeil uten å sende på nytt', async () => {
        let antallKall = 0;
        server.use(
            http.post(`*${apiBaseUri}/dialog/sendmelding`, () => {
                antallKall++;
                return HttpResponse.json({ traadId: 'nytt-referat', journalforingFeilet: true });
            })
        );
        const { result, store } = renderMutation();

        await act(() => result.current.mutateAsync({ body }));

        expect(antallKall).toBe(1);
        expect(store.get(referatResultatAtom)).toMatchObject({
            traadId: 'nytt-referat',
            variant: 'error',
            melding: expect.stringContaining('Referatet er sendt, men journalføringen feilet.')
        });
    });

    test('ukjent utfall gir advarsel om å kontrollere meldingslisten og ingen automatisk gjentakelse', async () => {
        let antallKall = 0;
        server.use(
            http.post(`*${apiBaseUri}/dialog/sendmelding`, () => {
                antallKall++;
                return new HttpResponse(null, { status: 504 });
            })
        );
        const { result, store } = renderMutation();

        await act(async () => {
            await expect(result.current.mutateAsync({ body })).rejects.toThrow();
        });

        expect(antallKall).toBe(1);
        expect(store.get(referatResultatAtom)).toMatchObject({
            variant: 'error',
            melding: expect.stringContaining('Kontroller meldingslisten før du sender på nytt.')
        });
        expect(store.get(referatResultatAtom)?.traadId).toBeUndefined();
    });

    test('viser ikke kvittering for en annen person hvis konteksten endres under innsending', async () => {
        const mottatt = Promise.withResolvers<void>();
        const fortsett = Promise.withResolvers<void>();
        server.use(
            http.post(`*${apiBaseUri}/dialog/sendmelding`, async () => {
                mottatt.resolve();
                await fortsett.promise;
                return HttpResponse.json({ traadId: 'nytt-referat', journalforingFeilet: false });
            })
        );
        const { result, store } = renderMutation();

        await act(async () => {
            const sending = result.current.mutateAsync({ body });
            await mottatt.promise;
            store.set(aktivBrukerAtom, '11111111111');
            fortsett.resolve();
            await sending;
        });

        expect(store.get(referatResultatAtom)).toBeNull();
        expect(store.get(dialogSuksessMeldingAtom)).toBeNull();
    });

    test('vanlig sending av referat beholder dagens kvittering', async () => {
        server.use(
            http.post(`*${apiBaseUri}/dialog/sendmelding`, () =>
                HttpResponse.json({ traadId: 'nytt-referat', journalforingFeilet: false })
            )
        );
        const { result, store } = renderMutation();

        await act(() => result.current.mutateAsync({ body: { ...body, sak: undefined } }));

        expect(store.get(referatResultatAtom)).toBeNull();
        expect(store.get(dialogSuksessMeldingAtom)).toBe('Melding sendt');
    });

    test.each([
        { status: 200, kontekst: 'person' },
        { status: 504, kontekst: 'person' },
        { status: 200, kontekst: 'enhet' },
        { status: 504, kontekst: 'enhet' }
    ])('henter inaktiv meldingsliste på nytt ved $status etter bytte av $kontekst', async ({ status, kontekst }) => {
        const mottatt = Promise.withResolvers<void>();
        const fortsett = Promise.withResolvers<void>();
        let antallHentinger = 0;
        server.use(
            http.post(`*${apiBaseUri}/dialog/meldinger`, async ({ request }) => {
                expect(await request.json()).toEqual({ fnr: body.fnr });
                expect(new URL(request.url).searchParams.get('enhet')).toBe(body.enhet);
                antallHentinger++;
                return HttpResponse.json({ traader: antallHentinger === 1 ? [] : [{ traadId: 'nytt-referat' }] });
            }),
            http.post(`*${apiBaseUri}/dialog/sendmelding`, async () => {
                mottatt.resolve();
                await fortsett.promise;
                return status === 504
                    ? new HttpResponse(null, { status })
                    : HttpResponse.json({ traadId: 'nytt-referat', journalforingFeilet: false });
            })
        );
        const { result, store, queryClient } = renderMutation();
        const options = $api.queryOptions('post', '/rest/dialog/meldinger', {
            body: { fnr: body.fnr },
            params: { query: { enhet: body.enhet } }
        });
        await queryClient.fetchQuery(options);
        expect(queryClient.getQueryState(options.queryKey)?.data).toEqual({ traader: [] });

        await act(async () => {
            const sending = result.current.mutateAsync({ body });
            await mottatt.promise;
            if (kontekst === 'person') {
                store.set(aktivBrukerAtom, '11111111111');
            } else {
                store.set(aktivEnhetAtom, '0202');
            }
            fortsett.resolve();
            if (status === 504) {
                await expect(sending).rejects.toThrow();
            } else {
                await sending;
            }
        });

        await waitFor(() =>
            expect(queryClient.getQueryData(options.queryKey)).toEqual({ traader: [{ traadId: 'nytt-referat' }] })
        );
        expect(antallHentinger).toBe(2);
        expect(store.get(referatResultatAtom)).toBeNull();
        expect(store.get(dialogSuksessMeldingAtom)).toBeNull();
    });
});
