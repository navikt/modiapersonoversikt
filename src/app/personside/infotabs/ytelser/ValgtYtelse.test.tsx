import * as renderer from 'react-test-renderer';
import { statiskForeldrepengeMock } from '../../../../mock/ytelse/statiskForeldrepengeMock';
import { statiskSykepengerMock } from '../../../../mock/ytelse/statiskSykepengerMock';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import ValgtYtelse from './ValgtYtelse';
import { pleiepengerTestData } from './pleiepenger/pleiepengerTestData';

test('Om foreldrepenger matcher snapshot', () => {
    setupReactQueryMocks();
    const resultat = renderer.create(
        <TestProvider>
            <ValgtYtelse valgtYtelse={statiskForeldrepengeMock} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});

test('Om pleiepenger matcher snapshot', () => {
    setupReactQueryMocks();
    const resultat = renderer.create(
        <TestProvider>
            <ValgtYtelse valgtYtelse={pleiepengerTestData} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});

test('Om sykepenger matcher snapshot', () => {
    setupReactQueryMocks();
    const resultat = renderer.create(
        <TestProvider>
            <ValgtYtelse valgtYtelse={statiskSykepengerMock} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
