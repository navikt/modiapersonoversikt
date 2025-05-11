import { act } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../../test/Testprovider';
import DeltBosted from './DeltBosted';

test('viser deltbosted', async () => {
    const visittkortbody = await act(() => renderWithProviders(<DeltBosted deltBosted={aremark.deltBosted} />));

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
