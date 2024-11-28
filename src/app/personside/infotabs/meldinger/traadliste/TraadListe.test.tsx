import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../../test/testStore';
import TraadListe from './TraadListe';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';

test('Viser Traadliste', () => {
    setupReactQueryMocks();
    const traader = [statiskTraadMock];

    const container = renderer.create(
        <TestProvider>
            <TraadListe traader={traader} valgtTraad={traader[0]} traaderEtterSokOgFiltrering={traader} />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
