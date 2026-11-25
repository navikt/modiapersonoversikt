import { act } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../../test/LegacyTestprovider';
import Vergemal from './Vergemal';

test('viser vergemål', async () => {
    const visittkortbody = await act(() =>
        renderWithProviders(<Vergemal feilendeSystemer={[]} vergemal={aremark.vergemal} />)
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
