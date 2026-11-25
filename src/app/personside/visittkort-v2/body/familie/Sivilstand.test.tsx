import { act } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../../test/LegacyTestprovider';
import SivilstandWrapper from './Sivilstand';

test('viser sivilstand', async () => {
    const sivilstand = await act(() =>
        renderWithProviders(<SivilstandWrapper harFeilendeSystem={false} sivilstandListe={aremark.sivilstand} />)
    );

    expect(sivilstand.asFragment()).toMatchSnapshot();
});
