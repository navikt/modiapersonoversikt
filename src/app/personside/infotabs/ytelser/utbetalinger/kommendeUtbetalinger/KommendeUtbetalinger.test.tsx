import { render } from '@testing-library/react';
import { statiskKommendeUtbetaling } from '../../../../../../mock/ytelse/statiskForeldrepengeMock';
import TestProvider from '../../../../../../test/Testprovider';
import KommendeUtbetalinger from './KommendeUtbetalinger';

test('Kommende enkelutbetaling matcher snapshot', () => {
    const result = render(
        <TestProvider>
            <KommendeUtbetalinger kommendeUtbetalinger={[statiskKommendeUtbetaling]} />
        </TestProvider>
    );

    expect(result.asFragment()).toMatchSnapshot();
});
