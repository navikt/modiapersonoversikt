import { act } from '@testing-library/react';
import { aremark } from '../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import VisittkortBody from './VisittkortBody';

test('viser info om bruker i visittkortbody', async () => {
    setupReactQueryMocks();
    const visittkortbody = await act(() =>
        renderWithProviders(
            <VisittkortBody
                persondata={{
                    feilendeSystemer: [],
                    person: aremark
                }}
            />
        )
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
