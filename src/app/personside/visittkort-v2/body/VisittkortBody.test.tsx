import { act } from '@testing-library/react';
import { aremark } from 'src/mock/persondata/aremark';
import { renderWithProviders } from 'src/test/Testprovider';
import { setupReactQueryMocks } from 'src/test/testStore';
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
