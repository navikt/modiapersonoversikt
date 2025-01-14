import { render } from '@testing-library/react';
import { statiskSykepengerMock } from 'src/mock/ytelse/statiskSykepengerMock';
import TestProvider from '../../../../../test/Testprovider';
import ArbeidsForholdListe from './ArbeidsforholdListe';

test('ArbeidsforholdListe matcher snapshot', () => {
    const arbeidsforhold = statiskSykepengerMock.arbeidsforholdListe[0];
    const resultat = render(
        <TestProvider>
            <ArbeidsForholdListe arbeidsForhold={[arbeidsforhold]} />
        </TestProvider>
    );

    expect(resultat.asFragment()).toMatchSnapshot();
});
