import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { getTestStore } from '../../../../../test/testStore';
import TraadListe from './TraadListe';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';
import { MeldingsokProvider } from '../../../../../context/meldingsok';

test('Viser Traadliste', () => {
    const store = getTestStore();
    const traader = [statiskTraadMock];

    const container = renderer.create(
        <TestProvider customStore={store}>
            <MeldingsokProvider>
                <TraadListe traader={traader} valgtTraad={traader[0]} traaderEtterSokOgFiltrering={traader} />
            </MeldingsokProvider>
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
