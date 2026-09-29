import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { PeriodType } from 'src/components/DateFilters/types';
import { DateFilter, UtbetalingListFilter } from './Filter';

const routeSearch = vi.hoisted(() => ({
    periode: undefined as string | undefined,
    person: 'person-a',
    navigate: vi.fn()
}));

vi.mock('@tanstack/react-router', () => ({
    useSearch: () => ({ periode: routeSearch.periode }),
    useNavigate: () => routeSearch.navigate
}));
vi.mock('src/lib/state/context', () => ({ usePersonAtomValue: () => routeSearch.person }));
vi.mock('src/components/Utbetaling/utils', () => ({
    useFilterUtbetalinger: () => ({ data: { alleUtbetalinger: [] } }),
    reduceUtbetlingerTilYtelser: () => []
}));

beforeEach(() => {
    routeSearch.navigate.mockImplementation(() => {
        routeSearch.periode = undefined;
        return Promise.resolve();
    });
});

afterEach(() => {
    routeSearch.periode = undefined;
    routeSearch.person = 'person-a';
    routeSearch.navigate.mockReset();
});

it('velger Siste 30 dager når lenken fra Hjem brukes', () => {
    routeSearch.periode = 'siste30';
    render(
        <Provider>
            <DateFilter />
        </Provider>
    );
    expect(screen.getByRole('combobox', { name: 'Periode' })).toHaveValue(PeriodType.LAST_30_DAYS);
});

it('beholder standardperioden ved vanlig navigasjon', () => {
    render(
        <Provider>
            <DateFilter />
        </Provider>
    );
    expect(screen.getByRole('combobox', { name: 'Periode' })).toHaveValue(PeriodType.LAST_TWO_YEARS);
});

it('bruker det valgte filteret etter at saksbehandler endrer perioden', () => {
    routeSearch.periode = 'siste30';
    const { rerender } = render(
        <Provider>
            <DateFilter />
        </Provider>
    );

    fireEvent.change(screen.getByRole('combobox', { name: 'Periode' }), { target: { value: PeriodType.THIS_YEAR } });
    expect(routeSearch.navigate).toHaveBeenCalledWith({ search: {} });
    rerender(
        <Provider>
            <DateFilter />
        </Provider>
    );
    expect(screen.getByRole('combobox', { name: 'Periode' })).toHaveValue(PeriodType.THIS_YEAR);
});

it('fjerner lenkeperioden når filteret tilbakestilles', () => {
    routeSearch.periode = 'siste30';
    const { rerender } = render(
        <Provider>
            <UtbetalingListFilter />
        </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Tilbakestill' }));
    expect(routeSearch.navigate).toHaveBeenCalledWith({ search: {} });
    rerender(
        <Provider>
            <UtbetalingListFilter />
        </Provider>
    );
    expect(screen.getByRole('combobox', { name: 'Periode' })).toHaveValue(PeriodType.LAST_TWO_YEARS);
});

it('fjerner lenkeperioden ved bytte av person', () => {
    routeSearch.periode = 'siste30';
    const { rerender } = render(
        <Provider>
            <UtbetalingListFilter />
        </Provider>
    );
    expect(routeSearch.navigate).not.toHaveBeenCalled();

    routeSearch.person = 'person-b';
    rerender(
        <Provider>
            <UtbetalingListFilter />
        </Provider>
    );
    expect(routeSearch.navigate).toHaveBeenCalledWith({ search: {} });
    rerender(
        <Provider>
            <UtbetalingListFilter />
        </Provider>
    );
    expect(screen.getByRole('combobox', { name: 'Periode' })).toHaveValue(PeriodType.LAST_TWO_YEARS);
});
