import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { PeriodType } from 'src/components/DateFilters/types';
import { DateFilter } from './Filter';

const routeSearch = vi.hoisted(() => ({ periode: undefined as string | undefined }));

vi.mock('@tanstack/react-router', () => ({
    useSearch: () => ({ periode: routeSearch.periode }),
    useNavigate: () => vi.fn()
}));

afterEach(() => {
    routeSearch.periode = undefined;
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
