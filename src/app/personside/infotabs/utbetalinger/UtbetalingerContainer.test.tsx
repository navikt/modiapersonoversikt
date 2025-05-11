import { act } from '@testing-library/react';
import { statiskMockUtbetaling } from '../../../../mock/utbetalinger/statiskMockUtbetaling';
import utbetalingerResource from '../../../../rest/resources/utbetalingerResource';
import { renderWithProviders } from '../../../../test/Testprovider';
import { mockReactQuery, setupReactQueryMocks } from '../../../../test/testStore';
import UtbetalingerContainer from './UtbetalingerContainer';

test('Viser utbetalingercontainer med alt innhold', async () => {
    vi.useRealTimers();
    setupReactQueryMocks();
    mockReactQuery(utbetalingerResource.useFetch, {
        utbetalinger: [statiskMockUtbetaling],
        periode: { sluttDato: '1986-12-28', startDato: '1905-01-01' }
    });

    const visittkortheader = await act(() => renderWithProviders(<UtbetalingerContainer />));
    const json = visittkortheader.asFragment();
    expect(json).toMatchSnapshot();
});
