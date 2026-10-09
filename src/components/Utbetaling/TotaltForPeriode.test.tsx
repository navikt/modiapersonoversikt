import { fireEvent, render, screen, within } from '@testing-library/react';
import { TotaltForPeriode } from './TotaltForPeriode';

vi.mock('src/components/Utbetaling/utils', async (importOriginal) => {
    const actual = await importOriginal<typeof import('src/components/Utbetaling/utils')>();
    return {
        ...actual,
        useFilterUtbetalinger: () => ({
            data: {
                utbetalinger: [
                    {
                        ytelser: [
                            {
                                type: 'Sykepenger',
                                ytelseskomponentersum: 1000,
                                skattsum: -200,
                                trekksum: -50,
                                nettobelop: 750,
                                periode: { start: '2026-09-30', slutt: '2026-09-01' }
                            },
                            {
                                type: 'Dagpenger',
                                ytelseskomponentersum: 500,
                                skattsum: -50,
                                trekksum: 0,
                                nettobelop: 450,
                                periode: { start: '2026-01-01', slutt: '2026-04-30' }
                            }
                        ]
                    }
                ],
                periode: { startDato: '2026-09-01', sluttDato: '2026-09-30' }
            }
        })
    };
});

it('viser per-ytelse-tabellen bak ReadMore og inkluderer en full tabell for utskrift', () => {
    const { container } = render(<TotaltForPeriode />);

    expect(screen.getByRole('heading', { name: /Totalt utbetalt for valgt periode \(.+\)/ })).toBeInTheDocument();

    const utskriftstabell = container.querySelector<HTMLTableElement>('.print-only table');
    expect(utskriftstabell).not.toBeNull();
    if (!utskriftstabell) {
        throw new Error('Fant ikke tabellen for utskrift');
    }
    expect(within(utskriftstabell).getByText('Sykepenger')).toBeInTheDocument();
    expect(within(utskriftstabell).getByText('Dagpenger')).toBeInTheDocument();
    expect(within(utskriftstabell).getByText('01.09.2026 - 30.09.2026')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Beløp per ytelse' }));
    const skjermtabell = container.querySelector<HTMLTableElement>('.print-hide table');
    expect(skjermtabell).not.toBeNull();
    if (!skjermtabell) {
        throw new Error('Fant ikke tabellen i ReadMore');
    }
    expect(within(skjermtabell).getByText('Sykepenger')).toBeInTheDocument();
    expect(within(skjermtabell).getByText('Dagpenger')).toBeInTheDocument();
    expect(within(skjermtabell).getByText('01.01.2026 - 30.04.2026')).toBeInTheDocument();

    fireEvent.click(within(skjermtabell).getByRole('button', { name: 'Om perioden' }));
    expect(screen.getByText('Tidligste og seneste dato for utbetaling fra ytelsen.')).toBeInTheDocument();
});
