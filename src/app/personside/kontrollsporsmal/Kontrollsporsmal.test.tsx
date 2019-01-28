import { mount } from 'enzyme';
import * as React from 'react';
import Kontrollsporsmal from './Kontrollsporsmal';
import TestProvider from '../../../test/Testprovider';
import { createStore } from 'redux';
import reducers from '../../../redux/reducers';

test('Smoketest kontrollspørsmål', () => {
    const store = createStore(reducers);

    const kontrollspørsmål = mount(
        <TestProvider customStore={store}>
            <Kontrollsporsmal/>
        </TestProvider>);

    expect(kontrollspørsmål).toExist();
});