import { act } from '@testing-library/react';
import { aremark } from 'src/mock/persondata/aremark';
import { renderWithProviders } from 'src/test/LegacyTestprovider';
import Sikkerhetstiltak from './Sikkerhetstiltak';

test('viser sikkerhetstiltak', async () => {
    const visittkortbody = await act(() =>
        renderWithProviders(<Sikkerhetstiltak sikkerhetstiltak={aremark.sikkerhetstiltak} />)
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
