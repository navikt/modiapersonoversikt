import { render } from '@testing-library/react';
import TestProvider from '../../../../../test/Testprovider';
import { aremark } from './../../../../../mock/persondata/aremark';
import Fullmakter from './Fullmakt';

test('viser fullmakt', () => {
    const visittkortbody = render(
        <TestProvider>
            <Fullmakter feilendeSystemer={[]} fullmakter={aremark.fullmakt} />
        </TestProvider>
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
