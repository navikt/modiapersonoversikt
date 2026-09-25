import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { apiBaseUri } from 'src/api/config';
import type { PersonsokRequest } from 'src/lib/types/modiapersonoversikt-api';
import { server } from 'src/mock/node';
import { mockPersonsokResponseV4 } from 'src/mock/personsok/personsokMock';
import { renderWithProviders } from 'src/test/Testprovider';
import { onTestFinished, vi } from 'vitest';
import { FOR_MANGE_TREFF_TEKST, MAKS_TREFF_ADVARSEL, PersonsokResult } from './PersonsokResult';
import { lagTreffTekst, visningsintervall } from './utils';

vi.mock('src/utils/customHooks', async (importOriginal) => ({
    ...(await importOriginal<typeof import('src/utils/customHooks')>()),
    useSettAktivBruker: () => vi.fn()
}));

type Body = { pageNumber?: number | null; resultsPerPage?: number | null };

function lyttPaaV4(svar: (body: Body) => Response = (body) => HttpResponse.json(mockPersonsokResponseV4(body))) {
    const kall: Body[] = [];
    server.use(
        http.post(`${apiBaseUri}/personsok/v4`, async ({ request }) => {
            const body = (await request.json()) as Body;
            kall.push(body);
            return svar(body);
        })
    );
    return kall;
}

// Testprovider deler én QueryClient, så hver test trenger en unik spørring for å unngå cache-treff.
const lagQuery = (fornavn: string): PersonsokRequest => ({ fornavn });

// Telleren oppdateres straks brukeren blar, så vi venter til skjelettradene er borte før vi sjekker treffene.
const ventTilSidenErLastet = () => waitFor(() => expect(screen.queryAllByTestId('skjelettrad')).toHaveLength(0));

function utsattSvar() {
    let slippSvar: () => void = () => {};
    const venter = new Promise<void>((resolve) => {
        slippSvar = resolve;
    });
    return { venter, slippSvar };
}

function lyttPaaV4MedVenting(skalVente: (body: Body) => boolean) {
    const { venter, slippSvar } = utsattSvar();
    server.use(
        http.post(`${apiBaseUri}/personsok/v4`, async ({ request }) => {
            const body = (await request.json()) as Body;
            if (skalVente(body)) await venter;
            return HttpResponse.json(mockPersonsokResponseV4(body));
        })
    );
    return slippSvar;
}

describe('PersonsokResult', () => {
    test('henter bare første side ved visning', async () => {
        const kall = lyttPaaV4();
        await renderWithProviders(<PersonsokResult query={lagQuery('forste')} onClick={vi.fn()} />);

        expect(await screen.findByText('Viser 1–50 av 132 treff')).toBeInTheDocument();
        expect(kall).toHaveLength(1);
        expect(kall[0]).toMatchObject({ pageNumber: 1, resultsPerPage: 50 });
    });

    test('henter neste side først når brukeren blar', async () => {
        const kall = lyttPaaV4();
        await renderWithProviders(<PersonsokResult query={lagQuery('bla')} onClick={vi.fn()} />);
        await screen.findByText('Viser 1–50 av 132 treff');

        await userEvent.click(screen.getByRole('button', { name: '3' }));
        await ventTilSidenErLastet();

        expect(screen.getByText('Viser 101–132 av 132 treff')).toBeInTheDocument();
        expect(kall.map((k) => k.pageNumber)).toEqual([1, 3]);
    });

    test('henter ikke på nytt når brukeren blar tilbake til en side som er hentet', async () => {
        const kall = lyttPaaV4();
        await renderWithProviders(<PersonsokResult query={lagQuery('tilbake')} onClick={vi.fn()} />);
        await screen.findByText('Viser 1–50 av 132 treff');

        await userEvent.click(screen.getByRole('button', { name: '2' }));
        await ventTilSidenErLastet();
        await userEvent.click(screen.getByRole('button', { name: '1' }));
        await screen.findByText('Viser 1–50 av 132 treff');
        await ventTilSidenErLastet();

        expect(kall.map((k) => k.pageNumber)).toEqual([1, 2]);
    });

    test('holder pagineringen synlig etter bytte av side', async () => {
        const scrollIntoView = vi.fn();
        const opprinnelig = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = scrollIntoView;
        onTestFinished(() => {
            Element.prototype.scrollIntoView = opprinnelig;
        });
        lyttPaaV4();
        await renderWithProviders(<PersonsokResult query={lagQuery('scroll')} onClick={vi.fn()} />);
        await screen.findByText('Viser 1–50 av 132 treff');
        expect(scrollIntoView).not.toHaveBeenCalled();

        await userEvent.click(screen.getByRole('button', { name: '2' }));
        await ventTilSidenErLastet();

        await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' }));
        expect(scrollIntoView.mock.contexts.at(-1)).toBe(screen.getByRole('navigation'));
    });

    test('beregner antall sider fra totalHits når totalPages mangler', async () => {
        lyttPaaV4((body) => HttpResponse.json({ ...mockPersonsokResponseV4(body), totalPages: null }));
        await renderWithProviders(<PersonsokResult query={lagQuery('utensider')} onClick={vi.fn()} />);

        await screen.findByText('Viser 1–50 av 132 treff');
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    });

    test('viser ikke paginering når det bare er én side', async () => {
        lyttPaaV4((body) => HttpResponse.json(mockPersonsokResponseV4({ ...body, resultsPerPage: 200 })));
        await renderWithProviders(<PersonsokResult query={lagQuery('enside')} onClick={vi.fn()} />);

        await screen.findByRole('table');
        expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    test('viser egen melding når søket gir for mange treff (400)', async () => {
        lyttPaaV4(() => HttpResponse.json({ message: 'Søket gav for mange treff' }, { status: 400 }));
        await renderWithProviders(<PersonsokResult query={lagQuery('formange')} onClick={vi.fn()} />);

        expect(await screen.findByText(FOR_MANGE_TREFF_TEKST)).toBeInTheDocument();
        expect(screen.queryByText('En feil oppsto under søket')).not.toBeInTheDocument();
    });

    test('viser en full side med skjelettrader mens første side lastes', async () => {
        const slippSvar = lyttPaaV4MedVenting(() => true);
        await renderWithProviders(<PersonsokResult query={lagQuery('skjelett')} onClick={vi.fn()} />);

        expect(await screen.findAllByTestId('skjelettrad')).toHaveLength(50);
        expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');

        slippSvar();
        expect(await screen.findByText('Viser 1–50 av 132 treff')).toBeInTheDocument();
        expect(screen.queryAllByTestId('skjelettrad')).toHaveLength(0);
    });

    test('viser skjelettrader og beholder pagineringen mens neste side lastes', async () => {
        const slippSvar = lyttPaaV4MedVenting((body) => body.pageNumber === 2);
        await renderWithProviders(<PersonsokResult query={lagQuery('skjelettbla')} onClick={vi.fn()} />);
        await screen.findByText('Viser 1–50 av 132 treff');

        await userEvent.click(screen.getByRole('button', { name: '2' }));

        expect(await screen.findAllByTestId('skjelettrad')).toHaveLength(50);
        expect(screen.getByText('Viser 51–100 av 132 treff')).toBeInTheDocument();
        expect(screen.getByRole('navigation')).toBeInTheDocument();

        slippSvar();
        await ventTilSidenErLastet();
    });

    test('advarer og begrenser sidene når søket treffer 1000 personer', async () => {
        lyttPaaV4((body) => HttpResponse.json(mockPersonsokResponseV4({ ...body, fornavn: 'Mange' })));
        await renderWithProviders(<PersonsokResult query={lagQuery('tusen')} onClick={vi.fn()} />);

        expect(await screen.findByText(MAKS_TREFF_ADVARSEL)).toBeInTheDocument();
        expect(screen.getByText('Viser 1–50 av 1000 treff')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument();
    });

    test('begrenser antall sider til 20 selv om backend oppgir flere', async () => {
        lyttPaaV4((body) => HttpResponse.json({ ...mockPersonsokResponseV4(body), totalHits: 5000, totalPages: 100 }));
        await renderWithProviders(<PersonsokResult query={lagQuery('femtusen')} onClick={vi.fn()} />);

        expect(await screen.findByText(MAKS_TREFF_ADVARSEL)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: '21' })).not.toBeInTheDocument();
    });

    test('viser ikke advarsel om maks antall treff ved vanlige søk', async () => {
        lyttPaaV4();
        await renderWithProviders(<PersonsokResult query={lagQuery('ingenadvarsel')} onClick={vi.fn()} />);

        await screen.findByText('Viser 1–50 av 132 treff');
        expect(screen.queryByText(MAKS_TREFF_ADVARSEL)).not.toBeInTheDocument();
    });

    test('viser generell feilmelding ved andre feil', async () => {
        lyttPaaV4(() => HttpResponse.json({}, { status: 500 }));
        await renderWithProviders(<PersonsokResult query={lagQuery('feil')} onClick={vi.fn()} />);

        await waitFor(() => expect(screen.getByText('En feil oppsto under søket')).toBeInTheDocument());
    });
});

describe('visningsintervall', () => {
    test('regner ut første, midterste og siste side', () => {
        expect(visningsintervall(1, 132)).toEqual({ fra: 1, til: 50 });
        expect(visningsintervall(2, 132)).toEqual({ fra: 51, til: 100 });
        expect(visningsintervall(3, 132)).toEqual({ fra: 101, til: 132 });
    });

    test('håndterer færre treff enn én side', () => {
        expect(lagTreffTekst(1, 7)).toBe('Viser 1–7 av 7 treff');
    });
});
