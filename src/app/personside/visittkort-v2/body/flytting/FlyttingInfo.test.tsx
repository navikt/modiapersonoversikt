import { act } from '@testing-library/react';
import FlyttingInfo from 'src/app/personside/visittkort-v2/body/flytting/FlyttingInfo';
import { aremark } from 'src/mock/persondata/aremark';
import { renderWithProviders } from 'src/test/Testprovider';

test('viser info om flytting', async () => {
    const visittkortbody = await act(() => renderWithProviders(<FlyttingInfo person={aremark} />));
    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
