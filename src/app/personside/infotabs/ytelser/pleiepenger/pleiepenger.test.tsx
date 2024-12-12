import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../../test/testStore';
import Oversikt from './Oversikt';
import Pleiepengerperiode from './Pleiepengerperiode';
import { pleiepengerTestData } from './pleiepengerTestData';

test('Om Oversikten i pleiepengeretten matcher snapshot', () => {
    setupReactQueryMocks();
    const resultat = renderer.create(
        <TestProvider>
            <Oversikt pleiepenger={pleiepengerTestData} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});

test('Om Pleiepengeperiode i pleiepengeretten matcher snapshot', () => {
    setupReactQueryMocks();
    const resultat = renderer.create(
        <TestProvider>
            <Pleiepengerperiode periode={pleiepengerTestData.perioder[0]} periodeNummer={1} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
