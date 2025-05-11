import { act } from '@testing-library/react';
import { statiskKommendeUtbetaling } from '../../../../../../mock/ytelse/statiskForeldrepengeMock';
import { renderWithProviders } from '../../../../../../test/Testprovider';
import KommendeUtbetalinger from './KommendeUtbetalinger';

test('Kommende enkelutbetaling matcher snapshot', async () => {
    const result = await act(() =>
        renderWithProviders(<KommendeUtbetalinger kommendeUtbetalinger={[statiskKommendeUtbetaling]} />)
    );

    expect(result.asFragment()).toMatchSnapshot();
});
