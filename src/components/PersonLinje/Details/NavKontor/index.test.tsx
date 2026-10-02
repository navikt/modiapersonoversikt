import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PersonData, Publikumsmottak } from 'src/lib/types/modiapersonoversikt-api';
import { createPersonData } from 'src/test/createPersonData';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NavKontor from './index';

let person: PersonData;

vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    usePersonData: () => ({ data: { person, feilendeSystemer: [] } }),
    useArbeidsoppfolging: () => ({ data: null }),
    useBaseUrls: () => ({ data: { norg2Frontend: 'https://example.no' }, isLoading: false, error: null })
}));

const mottak = (adresse: string): Publikumsmottak => ({
    besoksadresse: { linje1: adresse },
    apningstider: [
        {
            ukedag: new Date().toLocaleDateString('nb-NO', { weekday: 'long' }),
            apningstid: '09:00 - 15:00'
        }
    ]
});

function mottakGrid(nummer: number): HTMLElement {
    const grid = screen.getByText(`Testgata ${nummer}`).closest('.aksel-hgrid');
    if (!(grid instanceof HTMLElement)) throw new Error(`Mangler grid for publikumsmottak ${nummer}`);
    return grid;
}

beforeEach(() => {
    person = createPersonData();
    person.geografiskTilknytning = '0301';
    person.navEnhet = {
        id: '0001',
        navn: 'Nav test',
        publikumsmottak: [mottak('Testgata 1')]
    };
});

describe('NavKontor', () => {
    it('viser besøksadressen til første publikumsmottak', () => {
        render(<NavKontor />);

        expect(screen.getByText('Testgata 1')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Flere detaljer om kontoret' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Det finnes flere publikumsmottak' })).not.toBeInTheDocument();
    });

    it.each([0, 1])('viser ingen utvidelse med %i publikumsmottak', (antall) => {
        if (person.navEnhet) person.navEnhet.publikumsmottak = antall ? [mottak('Testgata 1')] : [];
        render(<NavKontor />);

        expect(screen.queryByRole('button', { name: 'Det finnes flere publikumsmottak' })).not.toBeInTheDocument();
        if (antall === 0) {
            expect(screen.getAllByText('Ikke tilgjengelig')).not.toHaveLength(0);
        }
    });

    it.each([2, 4])('viser alle %i publikumsmottak i riktig rekkefølge', async (antall) => {
        if (person.navEnhet) {
            person.navEnhet.publikumsmottak = Array.from({ length: antall }, (_, index) =>
                mottak(`Testgata ${index + 1}`)
            );
        }
        render(<NavKontor />);

        expect(screen.getByText('Testgata 1')).toBeVisible();
        const bruker = userEvent.setup();
        const readMore = screen.getByRole('button', { name: 'Det finnes flere publikumsmottak' });
        readMore.focus();
        await bruker.keyboard('{Enter}');
        expect(readMore).toHaveAttribute('aria-expanded', 'true');
        for (let nummer = 2; nummer <= antall; nummer++) {
            expect(screen.getByText(`Testgata ${nummer}`)).toBeVisible();
        }
        expect(screen.queryByRole('heading', { name: /^Publikumsmottak \d+$/ })).not.toBeInTheDocument();
        expect(screen.getAllByText('09:00 - 15:00')).toHaveLength(antall);
        for (let nummer = 2; nummer <= antall; nummer++) {
            const grid = mottakGrid(nummer);
            expect(grid).toHaveClass('aksel-hgrid');
            expect(grid.children).toHaveLength(2);
            expect(within(grid).getByText('Besøksadresse')).toBeInTheDocument();
            expect(within(grid).getByText('Åpent i dag')).toBeInTheDocument();
        }
        await bruker.keyboard('{Enter}');
        expect(readMore).toHaveAttribute('aria-expanded', 'false');
    });

    it('viser Stengt for et øvrig mottak uten åpningstid i dag', async () => {
        const andreMottak = mottak('Testgata 2');
        andreMottak.apningstider = [{ ukedag: 'ikke en ukedag', apningstid: '10:00 - 14:00' }];
        if (person.navEnhet) person.navEnhet.publikumsmottak.push(andreMottak);
        render(<NavKontor />);

        await userEvent.setup().click(screen.getByRole('button', { name: 'Det finnes flere publikumsmottak' }));
        expect(screen.getByText('Stengt')).toBeVisible();
        expect(screen.queryByText('10:00 - 14:00')).not.toBeInTheDocument();
    });

    it('viser Ikke tilgjengelig når et øvrig mottak mangler åpningstider', async () => {
        const andreMottak = mottak('Testgata 2');
        andreMottak.apningstider = [];
        if (person.navEnhet) person.navEnhet.publikumsmottak.push(andreMottak);
        render(<NavKontor />);

        await userEvent.setup().click(screen.getByRole('button', { name: 'Det finnes flere publikumsmottak' }));
        expect(within(mottakGrid(2)).getByText('Ikke tilgjengelig')).toBeVisible();
    });
});
