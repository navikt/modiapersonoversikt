import { render } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import Foreldreansvar from './Foreldreansvar';

test('viser foreldreansvar', () => {
    const visittkortbody = render(
        <TestProvider>
            <Foreldreansvar feilendeSystemer={[]} foreldreansvar={aremark.foreldreansvar} />
        </TestProvider>
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
