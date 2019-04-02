import * as React from 'react';
import { mount } from 'enzyme';

import BrukerprofilSide from './BrukerprofilSide';
import TestProvider from '../../test/Testprovider';

test('Smoketeste brukerprofil', () => {
    const brukerprofil = mount(
        <TestProvider>
            <BrukerprofilSide />
        </TestProvider>
    );

    expect(brukerprofil).toExist();
});
