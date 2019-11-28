import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ArbeidsForholdListe from './ArbeidsforholdListe';
import TestProvider from '../../../../../../test/Testprovider';
import { pleiepengerTestData } from '../pleiepengerTestData';
import { Pleiepengerettighet } from '../../../../../../models/ytelse/pleiepenger';

const arbeidsforhold = pleiepengerTestData.perioder[0].arbeidsforhold[0];
const pleiepenger: Pleiepengerettighet = {
    ...pleiepengerTestData,
    perioder: [
        {
            ...pleiepengerTestData.perioder[0],
            arbeidsforhold: [arbeidsforhold]
        }
    ]
};

test('ArbeidsforholdListe matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <ArbeidsForholdListe pleiepengerettighet={pleiepenger} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
