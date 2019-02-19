import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import Utbetalinger from './Utbetalinger';
import { YtelserKeys } from '../ytelserKeys';

test('Utbetalinger matcher snapshot', () => {
    const result = renderer.create(
        <TestProvider>
            <Utbetalinger
                kommendeUtbetalinger={[]}
                historiskeUtbetalinger={[]}
                ytelsesType={YtelserKeys.Foreldrepenger}
            />
        </TestProvider>
    );

    expect(result).toMatchSnapshot();
});
