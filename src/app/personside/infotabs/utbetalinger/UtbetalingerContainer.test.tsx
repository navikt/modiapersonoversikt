import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import UtbetalingerContainer from './UtbetalingerContainer';
import { getTestStore, mockReactQuery, setupReactQueryMocks } from '../../../../test/testStore';
import { statiskMockUtbetaling } from '../../../../mock/utbetalinger/statiskMockUtbetaling';
import MockDate from 'mockdate';
import utbetalingerResource from '../../../../rest/resources/utbetalingerResource';

test('Viser utbetalingercontainer med alt innhold', () => {
    MockDate.reset();
    setupReactQueryMocks();
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
    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
