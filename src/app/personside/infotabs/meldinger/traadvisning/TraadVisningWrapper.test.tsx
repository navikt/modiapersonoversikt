import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TraadVisningWrapper from './TraadVisningWrapper';
import TestProvider from '../../../../../test/Testprovider';
import { getTestStore } from '../../../../../test/testStore';
import { hasData } from '../../../../../rest/utils/restResource';

test('Viser traad med verktøylinje', () => {
    const store = getTestStore();
    const traaderResource = getTestStore().getState().restResources.tråderOgMeldinger;
    const traader = hasData(traaderResource) && traaderResource.data;

    const container = renderer.create(
        <TestProvider customStore={store}>
            <TraadVisningWrapper valgtTraad={traader[0]} sokeord={''} />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
