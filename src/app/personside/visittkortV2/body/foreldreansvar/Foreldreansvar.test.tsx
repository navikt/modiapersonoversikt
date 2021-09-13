import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { aremark } from '../../../../../mock/personPdl/aremark';
import Foreldreansvar from './Foreldreansvar';

test('viser foreldreansvar', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <Foreldreansvar foreldreansvar={aremark.foreldreansvar} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
