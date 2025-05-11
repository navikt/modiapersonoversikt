import { act } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../../test/Testprovider';
import Sikkerhetstiltak from './Sikkerhetstiltak';

test('viser sikkerhetstiltak', async () => {
    const visittkortbody = await act(() =>
        renderWithProviders(<Sikkerhetstiltak sikkerhetstiltak={aremark.sikkerhetstiltak} />)
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
