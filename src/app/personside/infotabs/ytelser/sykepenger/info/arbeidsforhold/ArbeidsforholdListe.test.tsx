import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ArbeidsForholdListe from './ArbeidsforholdListe';
import { statiskSykepengerMock } from '../../../../../../../mock/ytelse/statiskSykepengerMock';

test('ArbeidsforholdListe matcher snapshot', () => {
    const arbeidsforhold = statiskSykepengerMock.arbeidsforholdListe[0];
    const resultat = renderer.create(<ArbeidsForholdListe arbeidsforhold={[arbeidsforhold]} />);

    expect(resultat.toJSON()).toMatchSnapshot();
});
