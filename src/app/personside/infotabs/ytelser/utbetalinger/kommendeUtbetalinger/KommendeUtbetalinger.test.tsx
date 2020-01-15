import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskKommendeUtbetaling } from '../../../../../../mock/ytelse/statiskForeldrepengeMock';
import KommendeUtbetalinger from './KommendeUtbetalinger';
import TestProvider from '../../../../../../test/Testprovider';

test('Kommende enkelutbetaling matcher snapshot', () => {
    const result = renderer.create(
        <TestProvider>
            <KommendeUtbetalinger kommendeUtbetalinger={[statiskKommendeUtbetaling]} />
        </TestProvider>
    );

    expect(result).toMatchSnapshot();
});
