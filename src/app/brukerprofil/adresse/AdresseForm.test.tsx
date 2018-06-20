import * as React from 'react';
import { mount } from 'enzyme';

import AdresseContainer from './AdresseContainer';
import TestProvider from '../../../test/Testprovider';
import { aremark } from '../../../mock/person/aremark';
import AdresseForm from './AdresseForm';

test('Rendrer adresseform når postnummere er lastet', () => {
    const adresseContainer = mount(
        <TestProvider>
            <AdresseContainer person={aremark}/>
        </TestProvider>);

    expect(adresseContainer.find(AdresseForm)).toHaveLength(1);
});