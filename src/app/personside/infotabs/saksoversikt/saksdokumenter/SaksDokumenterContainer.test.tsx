import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SaksDokumenterContainer from './SaksDokumenterContainer';
import { getTestStore } from '../../../../../test/testStore';
import TestProvider from '../../../../../test/Testprovider';
import { hasData } from '../../../../../rest/utils/restResource';
import { aggregertSakstema } from '../utils/saksoversiktUtils';

test('Viser saksdokumenter med alt innhold', () => {
    const store = getTestStore();
    const sakstemaResource = store.getState().restResources.sakstema;
    const aggregerteSakstema =
        (hasData(sakstemaResource) && aggregertSakstema(sakstemaResource.data.resultat)) || undefined;

    const container = renderer.create(
        <TestProvider customStore={store}>
            {aggregerteSakstema && <SaksDokumenterContainer valgtSakstema={aggregerteSakstema} />}
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
