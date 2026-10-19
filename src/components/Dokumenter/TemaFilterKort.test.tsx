import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TemaFilterKort } from 'src/components/Dokumenter/TemaFilterKort';
import type { TemaDokumentStatistikk } from 'src/components/Dokumenter/utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

const temaer: TemaDokumentStatistikk[] = [
    {
        temakode: 'DAG',
        temanavn: 'Dagpenger',
        harTilgang: true,
        antallDokumenter: 2,
        nyesteDokumentDato: '2024-03-10T12:00:00'
    },
    {
        temakode: 'AAP',
        temanavn: 'Arbeidsavklaringspenger',
        harTilgang: true,
        antallDokumenter: 0,
        nyesteDokumentDato: null
    },
    {
        temakode: 'SYK',
        temanavn: 'Sykepenger',
        harTilgang: true,
        antallDokumenter: 1,
        nyesteDokumentDato: '2024-02-01T12:00:00'
    }
];

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const mockTemaLayout = (bredde: number, elementer: { top: number; bottom: number }[]) => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        if (this.hasAttribute('data-tema-filter-liste')) {
            return new DOMRect(0, 0, bredde, 200);
        }

        if (this.hasAttribute('data-tema-filter-element')) {
            const index = Array.from(this.parentElement?.children ?? []).indexOf(this);
            const { top, bottom } = elementer[index] ?? { top: 50, bottom: 90 };
            return new DOMRect(0, top, 120, bottom - top);
        }

        return new DOMRect();
    });
};

describe('TemaFilterKort', () => {
    it('viser antall og nyeste dokumentdato, og deaktiverer tema uten treff', () => {
        render(<TemaFilterKort temaer={temaer} selectedTemaer={[]} onChange={vi.fn()} dataLoaded />);

        expect(screen.getByRole('checkbox', { name: 'Dagpenger (2)' })).toBeEnabled();
        expect(screen.getByText('10.03.2024')).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: 'Arbeidsavklaringspenger (0)' })).toBeDisabled();
        expect(screen.queryByText('Ingen dokumenter fra temaet med nåværende filtrering.')).not.toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: 'Arbeidsavklaringspenger (0)' })).toHaveAccessibleDescription(
            'Ingen dokumenter fra temaet med nåværende filtrering.'
        );
    });

    it('sender det oppdaterte temavalget videre', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<TemaFilterKort temaer={temaer} selectedTemaer={[]} onChange={onChange} dataLoaded />);

        await user.click(screen.getByRole('checkbox', { name: 'Dagpenger (2)' }));

        expect(onChange).toHaveBeenCalledWith(['DAG']);
    });

    it('beholder valgte tema uten treff og lar brukeren fjerne valget', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const { rerender } = render(
            <TemaFilterKort temaer={temaer} selectedTemaer={['DAG']} onChange={onChange} dataLoaded />
        );
        const temaerUtenTreff = temaer.map((tema) => ({
            ...tema,
            antallDokumenter: 0,
            nyesteDokumentDato: null
        }));

        rerender(<TemaFilterKort temaer={temaerUtenTreff} selectedTemaer={['DAG']} onChange={onChange} dataLoaded />);

        const valgtTema = screen.getByRole('checkbox', { name: 'Dagpenger (0)' });
        expect(valgtTema).toBeChecked();
        expect(valgtTema).toBeEnabled();
        expect(screen.getByRole('checkbox', { name: 'Arbeidsavklaringspenger (0)' })).toBeDisabled();
        expect(onChange).not.toHaveBeenCalled();

        await user.click(valgtTema);

        expect(onChange).toHaveBeenCalledWith([]);
    });

    it('viser en knapp for temaene som ikke får plass på første linje', async () => {
        const user = userEvent.setup();
        mockTemaLayout(320, [
            { top: 0, bottom: 40 },
            { top: 0, bottom: 40 },
            { top: 50, bottom: 90 }
        ]);
        render(<TemaFilterKort temaer={temaer} selectedTemaer={[]} onChange={vi.fn()} dataLoaded />);

        expect(screen.getByRole('group', { name: /Velg tema for å filtrere dokumenter/ })).toBeInTheDocument();
        expect(screen.queryByRole('checkbox', { name: 'Sykepenger (1)' })).not.toBeInTheDocument();

        const knapp = screen.getByRole('button', { name: 'Vis flere tema (1)' });
        expect(knapp).toHaveAttribute('aria-expanded', 'false');
        await user.click(knapp);

        expect(screen.getByRole('checkbox', { name: 'Sykepenger (1)' })).toBeVisible();
        expect(screen.getByRole('button', { name: 'Vis færre tema' })).toHaveAttribute('aria-expanded', 'true');

        await user.click(screen.getByRole('button', { name: 'Vis færre tema' }));
        expect(screen.queryByRole('checkbox', { name: 'Sykepenger (1)' })).not.toBeInTheDocument();
    });

    it('viser alle tema som får plass på første linje, uten en knapp for å vise flere', () => {
        mockTemaLayout(600, [
            { top: 0, bottom: 40 },
            { top: 0, bottom: 40 },
            { top: 0, bottom: 40 }
        ]);
        render(<TemaFilterKort temaer={temaer} selectedTemaer={[]} onChange={vi.fn()} dataLoaded />);

        expect(screen.getByRole('checkbox', { name: 'Sykepenger (1)' })).toBeVisible();
        expect(screen.queryByRole('button', { name: /Vis flere tema/ })).not.toBeInTheDocument();
    });

    it('viser forklaringen når brukeren holder pekeren over det deaktiverte feltet', async () => {
        const user = userEvent.setup();
        render(<TemaFilterKort temaer={temaer} selectedTemaer={[]} onChange={vi.fn()} dataLoaded />);

        await user.hover(screen.getByRole('checkbox', { name: 'Arbeidsavklaringspenger (0)' }));

        await waitFor(() => {
            expect(screen.getByRole('tooltip')).toHaveTextContent(
                'Ingen dokumenter fra temaet med nåværende filtrering.'
            );
        });
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
