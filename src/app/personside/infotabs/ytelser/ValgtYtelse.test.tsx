import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import * as React from 'react';
import ValgtYtelse from './ValgtYtelse';
import { statiskForeldrepengeMock } from '../../../../mock/ytelse/statiskForeldrepengeMock';
import { pleiepengerTestData } from './pleiepenger/pleiepengerTestData';
import { statiskSykepengerMock } from '../../../../mock/ytelse/statiskSykepengerMock';

test('Om foreldrepenger matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <ValgtYtelse valgtYtelse={statiskForeldrepengeMock} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});

test('Om pleiepenger matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <ValgtYtelse valgtYtelse={pleiepengerTestData} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});

test('Om sykepenger matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <ValgtYtelse valgtYtelse={statiskSykepengerMock} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
