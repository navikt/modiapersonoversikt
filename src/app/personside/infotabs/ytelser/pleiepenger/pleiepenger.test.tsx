import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Oversikt from './Oversikt';
import { getMockPleiepengerettighet } from '../../../../../mock/ytelse/pleiepenger-mock';
import { aremark } from '../../../../../mock/person/aremark';
import TestProvider from '../../../../../test/Testprovider';
import Pleiepenger from './Pleiepenger';
import Pleiepengerperiode from './Pleiepengerperiode';

const mockPleiepenger = getMockPleiepengerettighet(aremark.fødselsnummer);

Date.prototype.getTime = jest.fn(() => 0);

test('Om pleiepengeretten matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider><Pleiepenger pleiepenger={mockPleiepenger}/></TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});

test('Om Oversikten i pleiepengeretten matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider><Oversikt pleiepenger={mockPleiepenger}/></TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});

test('Om Pleiepengeperiode i pleiepengeretten matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <Pleiepengerperiode periode={mockPleiepenger.perioder[0]} periodeNummer={1}/>
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
