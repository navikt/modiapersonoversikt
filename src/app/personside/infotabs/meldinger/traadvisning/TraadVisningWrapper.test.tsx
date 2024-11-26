import * as renderer from 'react-test-renderer';
import TraadVisningWrapper from './TraadVisningWrapper';
import TestProvider from '../../../../../test/Testprovider';
import { getTestStore, setupReactQueryMocks } from '../../../../../test/testStore';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';

test('Viser traad med verktøylinje', () => {
    setupReactQueryMocks();
    const store = getTestStore();
    const traader = [statiskTraadMock];

    const container = renderer.create(
        <TestProvider customStore={store}>
            <TraadVisningWrapper valgtTraad={traader[0]} sokeord={''} />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
