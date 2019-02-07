import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Oversikt from './Oversikt';
import TestProvider from '../../../../../test/Testprovider';
import Pleiepengerperiode from './Pleiepengerperiode';
import { pleiepengerTestData } from './pleiepengerTestData';

beforeEach(() => {
    Date.prototype.getTime = jest.fn(() => 0);
    Date.parse = jest.fn(() => 0);
});

test('Om Oversikten i pleiepengeretten matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider><Oversikt pleiepenger={pleiepengerTestData}/></TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});

test('Om Pleiepengeperiode i pleiepengeretten matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <Pleiepengerperiode periode={pleiepengerTestData.perioder[0]} periodeNummer={1}/>
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
