import { act } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../../test/Testprovider';
import Foreldreansvar from './Foreldreansvar';

test('viser foreldreansvar', async () => {
    const visittkortbody = await act(() =>
        renderWithProviders(<Foreldreansvar feilendeSystemer={[]} foreldreansvar={aremark.foreldreansvar} />)
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
