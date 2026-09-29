import { render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import UtbetalingerOversikt from './index';

vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({ useUtbetalinger: vi.fn() }));
vi.mock('@tanstack/react-router', () => ({
    Link: ({ children, search }: { children: ReactNode; search: { periode: string } }) => (
        <a href={`/new/person/utbetaling?periode=${search.periode}`}>{children}</a>
    )
}));

const utbetaling = (dato: string, ytelser: Utbetaling['ytelser']): Utbetaling => ({
    posteringsdato: dato,
    utbetalingsdato: dato,
    erUtbetaltTilPerson: true,
    erUtbetaltTilOrganisasjon: false,
    erUtbetaltTilSamhandler: false,
    nettobelop: ytelser.reduce((sum, ytelse) => sum + ytelse.nettobelop, 0),
    metode: 'bank',
    status: 'utbetalt',
    ytelser
});

const ytelse = (type: string, nettobelop: number): Utbetaling['ytelser'][number] => ({
    type,
    nettobelop,
    ytelseskomponentListe: [],
    ytelseskomponentersum: nettobelop,
    trekkListe: [],
    trekksum: 0,
    skattListe: [],
    skattsum: 0
});

function giUtbetalinger(utbetalinger: Utbetaling[]) {
    vi.mocked(useUtbetalinger).mockReturnValue({
        data: { utbetalinger, periode: { startDato: '2026-08-29', sluttDato: '2026-10-28' } },
        isLoading: false,
        isError: false
    } as ReturnType<typeof useUtbetalinger>);
}

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-28T12:00:00'));
});

afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
});

it('viser maks fem ytelsesrader med riktig beløp og teller skjulte rader', () => {
    giUtbetalinger([
        utbetaling('2026-09-28', [ytelse('Sykepenger', 100), ytelse('Dagpenger', 200)]),
        ...[27, 26, 25, 24, 23].map((dag) => utbetaling(`2026-09-${dag}`, [ytelse('Arbeidsavklaringspenger', 50)]))
    ]);
    render(<UtbetalingerOversikt />);

    expect(screen.getAllByRole('row')).toHaveLength(6);
    expect(screen.getByRole('columnheader', { name: 'Ytelse' })).toBeInTheDocument();
    expect(within(screen.getAllByRole('row')[1]).getByText('100,00 NOK')).toBeInTheDocument();
    expect(screen.getByText('200,00 NOK')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /2 flere utbetalingslinjer/ })).toHaveAttribute(
        'href',
        '/new/person/utbetaling?periode=siste30'
    );
    expect(useUtbetalinger).toHaveBeenCalledWith('2026-08-29', '2026-10-28');
});

it('teller den sjette ytelsen selv når den tilhører en utbetaling som allerede vises', () => {
    giUtbetalinger([
        ...[28, 27, 26, 25].map((dag) => utbetaling(`2026-09-${dag}`, [ytelse('Sykepenger', 50)])),
        utbetaling('2026-09-24', [ytelse('Dagpenger', 100), ytelse('Barnetrygd', 200)])
    ]);
    render(<UtbetalingerOversikt />);

    expect(screen.getAllByRole('row')).toHaveLength(6);
    expect(screen.getByText('Dagpenger')).toBeInTheDocument();
    expect(screen.queryByText('Barnetrygd')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /1 flere utbetalingslinjer/ })).toHaveAttribute(
        'href',
        '/new/person/utbetaling?periode=siste30'
    );
});

it('viser ingen lenke når det er nøyaktig fem ytelsesrader', () => {
    giUtbetalinger([
        utbetaling('2026-09-28', [ytelse('Sykepenger', 100), ytelse('Dagpenger', 200)]),
        ...[27, 26, 25].map((dag) => utbetaling(`2026-09-${dag}`, [ytelse('Arbeidsavklaringspenger', 50)]))
    ]);
    render(<UtbetalingerOversikt />);

    expect(screen.getAllByRole('row')).toHaveLength(6);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

it('oppgir perioden når det ikke finnes utbetalinger', () => {
    giUtbetalinger([]);
    render(<UtbetalingerOversikt />);
    expect(screen.getByText(/siste 30 dager/)).toBeInTheDocument();
});

it('teller bare eldre utbetalinger som finnes under Siste 30 dager', () => {
    giUtbetalinger([
        utbetaling('2026-10-01', [ytelse('Kommende', 100)]),
        ...[28, 27, 26, 25, 24, 23].map((dag) => utbetaling(`2026-09-${dag}`, [ytelse('Sykepenger', 50)]))
    ]);
    render(<UtbetalingerOversikt />);
    expect(screen.getByText('Kommende')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /2 flere utbetalingslinjer siste 30 dager/ })).toHaveAttribute(
        'href',
        '/new/person/utbetaling?periode=siste30'
    );
});
