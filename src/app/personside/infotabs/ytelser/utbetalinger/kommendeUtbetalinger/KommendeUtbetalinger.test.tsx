import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskKommendeUtbetaling } from '../../../../../../mock/ytelse/statiskForeldrepengeMock';
import KommendeUtbetalinger from './KommendeUtbetalinger';

test('Kommende enkelutbetaling matcher snapshot', () => {
    const result = renderer.create(<KommendeUtbetalinger kommendeUtbetalinger={[statiskKommendeUtbetaling]} />);

    expect(result).toMatchSnapshot();
});
