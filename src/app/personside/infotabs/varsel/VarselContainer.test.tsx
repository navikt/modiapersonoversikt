import { act } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import VarselContainer from './VarslerContainer';

test('Viser varselcontainer med alt innhold', async () => {
    setupReactQueryMocks();
    const container = await act(() => renderWithProviders(<VarselContainer />));

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
