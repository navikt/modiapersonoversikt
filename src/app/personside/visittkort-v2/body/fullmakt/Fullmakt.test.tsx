import { act } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/Testprovider';
import { aremark } from './../../../../../mock/persondata/aremark';
import Fullmakter from './Fullmakt';

test('viser fullmakt', async () => {
    const visittkortbody = await act(() =>
        renderWithProviders(<Fullmakter feilendeSystemer={[]} fullmakter={aremark.fullmakt} />)
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
