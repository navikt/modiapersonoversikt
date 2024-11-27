import * as renderer from 'react-test-renderer';
import ArbeidsForholdListe from './ArbeidsforholdListe';
import { statiskSykepengerMock } from 'src/mock/ytelse/statiskSykepengerMock';
import TestProvider from '../../../../../test/Testprovider';

test('ArbeidsforholdListe matcher snapshot', () => {
    const arbeidsforhold = statiskSykepengerMock.arbeidsforholdListe[0];
    const resultat = renderer.create(
        <TestProvider>
            <ArbeidsForholdListe arbeidsForhold={[arbeidsforhold]} />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
