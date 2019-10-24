import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import UtbetalingerContainer from './UtbetalingerContainer';
import { getTestStore } from '../../../../test/testStore';
import { statiskMockUtbetaling } from '../../../../mock/utbetalinger/statiskMockUtbetaling';

test('Viser utbetalingercontainer med alt innhold', () => {
    const testStore = getTestStore();
    testStore.dispatch(
        testStore.getState().restResources.utbetalinger.actions.setData({
            utbetalinger: [statiskMockUtbetaling],
            periode: { sluttDato: '1986-12-28', startDato: '1905-01-01' }
        })
    );
    const visittkortheader = renderer.create(
        <TestProvider customStore={testStore}>
            <UtbetalingerContainer />
        </TestProvider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
