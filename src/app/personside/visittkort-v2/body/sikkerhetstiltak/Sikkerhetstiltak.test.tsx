import { render } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import Sikkerhetstiltak from './Sikkerhetstiltak';

test('viser sikkerhetstiltak', () => {
    const visittkortbody = render(
        <TestProvider>
            <Sikkerhetstiltak sikkerhetstiltak={aremark.sikkerhetstiltak} />
        </TestProvider>
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
