import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import Foreldreansvar from './Foreldreansvar';

test('viser foreldreansvar', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <Foreldreansvar feilendeSystem={false} foreldreansvar={aremark.foreldreansvar} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
