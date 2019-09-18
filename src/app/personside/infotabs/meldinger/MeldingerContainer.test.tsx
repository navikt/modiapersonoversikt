import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import MeldingerContainer from './MeldingerContainer';
import { getTestStore } from '../../../../test/testStore';
import { statiskTraadMock } from '../../../../mock/meldinger/statiskTraadMock';

test('Viser meldingercontainer med alt innhold', () => {
    const store = getTestStore();
    store.dispatch(store.getState().restResources.tråderOgMeldinger.actions.setData([statiskTraadMock]));
    const container = renderer.create(
        <TestProvider customStore={store}>
            <MeldingerContainer />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
