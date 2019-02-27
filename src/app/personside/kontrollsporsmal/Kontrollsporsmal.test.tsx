import { mount } from 'enzyme';
import * as React from 'react';
import Kontrollsporsmal from './Kontrollsporsmal';
import TestProvider from '../../../test/Testprovider';

test('Smoketest kontrollspørsmål', () => {
    const kontrollspørsmål = mount(
        <TestProvider>
            <Kontrollsporsmal />
        </TestProvider>
    );

    expect(kontrollspørsmål).toExist();
});
