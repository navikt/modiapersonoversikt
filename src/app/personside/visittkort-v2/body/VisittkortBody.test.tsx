import { render } from '@testing-library/react';
import { aremark } from '../../../../mock/persondata/aremark';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import VisittkortBody from './VisittkortBody';

test('viser info om bruker i visittkortbody', () => {
    setupReactQueryMocks();
    const visittkortbody = render(
        <TestProvider>
            <VisittkortBody
                persondata={{
                    feilendeSystemer: [],
                    person: aremark
                }}
            />
        </TestProvider>
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
