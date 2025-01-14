import { render } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import Vergemal from './Vergemal';

test('viser vergemål', () => {
    const visittkortbody = render(
        <TestProvider>
            <Vergemal feilendeSystemer={[]} vergemal={aremark.vergemal} />
        </TestProvider>
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
