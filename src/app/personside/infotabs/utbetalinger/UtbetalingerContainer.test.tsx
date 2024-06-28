import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import UtbetalingerContainer from './UtbetalingerContainer';
import { getTestStore, mockReactQuery, setupReactQueryMocks } from '../../../../test/testStore';
import { statiskMockUtbetaling } from '../../../../mock/utbetalinger/statiskMockUtbetaling';
import FetchMock from 'yet-another-fetch-mock';
import MockDate from 'mockdate';
import utbetalingerResource from '../../../../rest/resources/utbetalingerResource';

test('Viser utbetalingercontainer med alt innhold', (done) => {
    MockDate.reset();
    setupReactQueryMocks();
    const mock = FetchMock.configure({
        enableFallback: false
    });
    mockReactQuery(utbetalingerResource.useFetch, {
        utbetalinger: [statiskMockUtbetaling],
        periode: { sluttDato: '1986-12-28', startDato: '1905-01-01' }
    });

    const testStore = getTestStore();

    const visittkortheader = renderer.create(
        <TestProvider customStore={testStore}>
            <UtbetalingerContainer />
        </TestProvider>
    );
    setTimeout(() => {
        const json = visittkortheader.toJSON();
        expect(json).toMatchSnapshot();
        mock.restore();
        done();
    }, 500);
});
