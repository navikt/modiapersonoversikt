import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ArbeidsForholdListe from './ArbeidsforholdListe';
import TestProvider from '../../../../../../test/Testprovider';
import { pleiepengerTestData } from '../pleiepengerTestData';

const arbeidsforhold = pleiepengerTestData.perioder[0].arbeidsforhold[0];

test('ArbeidsforholdListe matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <ArbeidsForholdListe arbeidsforhold={[arbeidsforhold]} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
