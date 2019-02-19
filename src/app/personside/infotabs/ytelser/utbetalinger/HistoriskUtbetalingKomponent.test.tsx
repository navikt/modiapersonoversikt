import * as React from 'react';
import * as renderer from 'react-test-renderer';
import HistoriskUtbetalingKomponent from './HistoriskUtbetalingKomponent';
import { statiskHistoriskUtbetaling } from '../../../../../mock/ytelse/statiskForeldrepengeMock';

test('Historisk enkelutbetaling matcher snapshot', () => {
    const result = renderer.create(<HistoriskUtbetalingKomponent historiskUtbetaling={statiskHistoriskUtbetaling} />);

    expect(result).toMatchSnapshot();
});
