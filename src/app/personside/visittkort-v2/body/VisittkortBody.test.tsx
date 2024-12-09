import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../mock/persondata/aremark';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import VisittkortBody from './VisittkortBody';

test('viser info om bruker i visittkortbody', () => {
    setupReactQueryMocks();
    const visittkortbody = renderer.create(
        <TestProvider>
            <VisittkortBody
                persondata={{
                    feilendeSystemer: [],
                    person: aremark
                }}
            />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
