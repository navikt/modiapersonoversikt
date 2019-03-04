import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskKommendeUtbetaling } from '../../../../../../mock/ytelse/statiskForeldrepengeMock';
import KommendeUtbetalingKomponent from './KommendeUtbetalingKomponent';

test('Kommende enkelutbetaling matcher snapshot', () => {
    const result = renderer.create(<KommendeUtbetalingKomponent kommendeUtbetaling={statiskKommendeUtbetaling} />);

    expect(result).toMatchSnapshot();
});
