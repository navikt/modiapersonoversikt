import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Oversikt from './Oversikt';
import { getMockPleiepengerettighet } from '../../../../../mock/ytelse/pleiepenger-mock';
import { aremark } from '../../../../../mock/person/aremark';

const mockPleiepenger = getMockPleiepengerettighet(aremark.fødselsnummer);

test('Om pleiepengeretten matcher snapshot', () => {
    const resultat = renderer.create(
        <Oversikt pleiepenger={mockPleiepenger}/>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
