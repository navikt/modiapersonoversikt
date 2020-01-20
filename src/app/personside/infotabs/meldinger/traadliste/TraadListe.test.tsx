import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { getTestStore } from '../../../../../test/testStore';
import { hasData } from '../../../../../rest/utils/restResource';
import TraadListe from './TraadListe';

test('Viser Traadliste', () => {
    const store = getTestStore();
    const traaderResource = getTestStore().getState().restResources.tråderOgMeldinger;
    const traader = hasData(traaderResource) ? traaderResource.data : [];

    const container = renderer.create(
        <TestProvider customStore={store}>
            <TraadListe
                traader={traader}
                setSkjulVarsler={() => null}
                skjulVarsler={false}
                sokeord={''}
                valgtTraad={traader[0]}
                setSokeord={() => null}
                traaderEtterSokOgFiltrering={traader}
            />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
