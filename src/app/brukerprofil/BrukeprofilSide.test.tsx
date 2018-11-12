import * as React from 'react';
import { mount } from 'enzyme';

import BrukerprofilSide from './BrukerprofilSide';
import TestProvider from '../../test/Testprovider';
import { aremark } from '../../mock/person/aremark';

test('Smoketeste brukerprofil', () => {
    const brukerprofil = mount(
        <TestProvider>
            <BrukerprofilSide fødselsnummer={aremark.fødselsnummer}/>
        </TestProvider>);

    expect(brukerprofil).toExist();
});