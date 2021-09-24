import { mount } from 'enzyme';
import * as React from 'react';
import Kontrollsporsmal from './Kontrollsporsmal';
import TestProvider from '../../../test/Testprovider';

test('Smoketest kontrollspørsmål', () => {
    const kontrollsporsmal = mount(
        <TestProvider>
            <Kontrollsporsmal />
        </TestProvider>
    );

    expect(kontrollsporsmal).toExist();
});
