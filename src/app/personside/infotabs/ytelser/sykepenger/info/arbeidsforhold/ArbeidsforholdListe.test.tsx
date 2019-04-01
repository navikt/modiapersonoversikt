import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ArbeidsForholdListe from './ArbeidsforholdListe';
import { statiskSykepengerMock } from '../../../../../../../mock/ytelse/statiskSykepengerMock';
import TestProvider from '../../../../../../../test/Testprovider';
import { getTestStore } from '../../../../../../../setupTests';
import { toggleVisAlleArbeidsforholdSykepengerActionCreator } from '../../../../../../../redux/ytelser/sykepengerReducer';

test('ArbeidsforholdListe matcher snapshot', () => {
    const arbeidsforhold = statiskSykepengerMock.arbeidsforholdListe[0];
    const resultat = renderer.create(
        <TestProvider>
            <ArbeidsForholdListe arbeidsforhold={[arbeidsforhold]} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});

test('ArbeidsforholdListe med alle vis alle arbeidsforhold matcher snapshot', () => {
    const arbeidsforhold = [statiskSykepengerMock.arbeidsforholdListe[0], statiskSykepengerMock.arbeidsforholdListe[0]];

    const testStore = getTestStore();
    testStore.dispatch(toggleVisAlleArbeidsforholdSykepengerActionCreator());
    const resultat = renderer.create(
        <TestProvider customStore={testStore}>
            <ArbeidsForholdListe arbeidsforhold={arbeidsforhold} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
