import { renderHook } from '@testing-library/react';
import { Provider } from 'jotai';
import type { ReactNode } from 'react';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import { useFilterUtbetalinger } from './utils';

vi.mock('@tanstack/react-router', () => ({ useSearch: () => ({ periode: 'siste30' }) }));
vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({ useUtbetalinger: vi.fn() }));

const utbetaling = (posteringsdato: string, utbetalingsdato: string): Utbetaling => ({
    posteringsdato,
    utbetalingsdato,
    erUtbetaltTilPerson: true,
    erUtbetaltTilOrganisasjon: false,
    erUtbetaltTilSamhandler: false,
    nettobelop: 100,
    metode: 'bank',
    status: 'utbetalt',
    ytelser: []
});

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-28T12:00:00'));
});

afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
});

it('filtrerer lenket periode på posteringsdato, også når vist dato er en annen', () => {
    const innenfor = utbetaling('2026-09-20', '2026-01-01');
    const kommende = utbetaling('2026-09-28', '2026-10-01');
    const utenfor = utbetaling('2026-08-28', '2026-09-28');
    vi.mocked(useUtbetalinger).mockReturnValue({
        data: {
            utbetalinger: [innenfor, kommende, utenfor],
            periode: { startDato: '2026-08-29', sluttDato: '2026-09-28' }
        },
        isLoading: false,
        isError: false
    } as ReturnType<typeof useUtbetalinger>);

    const { result } = renderHook(() => useFilterUtbetalinger(), {
        wrapper: ({ children }: { children: ReactNode }) => <Provider>{children}</Provider>
    });

    expect(useUtbetalinger).toHaveBeenCalledWith('2026-08-29', '2026-09-28');
    expect(result.current.data.utbetalinger).toEqual([kommende, innenfor]);
});
