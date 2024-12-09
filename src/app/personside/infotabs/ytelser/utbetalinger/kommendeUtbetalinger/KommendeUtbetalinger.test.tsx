import * as renderer from 'react-test-renderer';
import { statiskKommendeUtbetaling } from '../../../../../../mock/ytelse/statiskForeldrepengeMock';
import TestProvider from '../../../../../../test/Testprovider';
import KommendeUtbetalinger from './KommendeUtbetalinger';

test('Kommende enkelutbetaling matcher snapshot', () => {
    const result = renderer.create(
        <TestProvider>
            <KommendeUtbetalinger kommendeUtbetalinger={[statiskKommendeUtbetaling]} />
        </TestProvider>
    );

    expect(result).toMatchSnapshot();
});
