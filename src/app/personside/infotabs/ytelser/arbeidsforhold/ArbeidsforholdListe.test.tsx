import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ArbeidsForholdListe from './ArbeidsforholdListe';
import { statiskSykepengerMock } from '../../../../../mock/ytelse/statiskSykepengerMock';
import TestProvider from '../../../../../test/Testprovider';

test('ArbeidsforholdListe matcher snapshot', () => {
    const arbeidsforhold = statiskSykepengerMock.arbeidsforholdListe[0];
    const resultat = renderer.create(
        <TestProvider>
            <ArbeidsForholdListe arbeidsforhold={[arbeidsforhold]} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
