import { act } from '@testing-library/react';
import { statiskSykepengerMock } from 'src/mock/ytelse/statiskSykepengerMock';
import { renderWithProviders } from '../../../../../test/Testprovider';
import ArbeidsForholdListe from './ArbeidsforholdListe';

test('ArbeidsforholdListe matcher snapshot', async () => {
    const arbeidsforhold = statiskSykepengerMock.arbeidsforholdListe[0];
    const resultat = await act(() => renderWithProviders(<ArbeidsForholdListe arbeidsForhold={[arbeidsforhold]} />));

    expect(resultat.asFragment()).toMatchSnapshot();
});
