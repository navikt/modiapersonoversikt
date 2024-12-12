import * as renderer from 'react-test-renderer';
import { statiskMockUtbetaling } from '../../../../mock/utbetalinger/statiskMockUtbetaling';
import utbetalingerResource from '../../../../rest/resources/utbetalingerResource';
import TestProvider from '../../../../test/Testprovider';
import { getTestStore, mockReactQuery, setupReactQueryMocks } from '../../../../test/testStore';
import UtbetalingerContainer from './UtbetalingerContainer';

test('Viser utbetalingercontainer med alt innhold', () => {
    vi.useRealTimers();
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
