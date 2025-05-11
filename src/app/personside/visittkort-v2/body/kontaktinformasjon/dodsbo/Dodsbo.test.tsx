import { act } from '@testing-library/react';
import { aremark } from '../../../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../../../test/Testprovider';
import KontaktinformasjonDodsbo from './Dodsbo';

test('viser dodsbo', async () => {
    const dodsbo = await act(() =>
        renderWithProviders(<KontaktinformasjonDodsbo harFeilendeSystem={false} dodsbo={aremark.dodsbo} />)
    );

    expect(dodsbo.asFragment()).toMatchSnapshot();
});
