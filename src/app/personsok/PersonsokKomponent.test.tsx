import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../test/Testprovider';
import PersonsokKomponent from './PersonsokKomponent';

test('viser personsøk-komponent', () => {
    const personsokKomponent = renderer.create(
        <TestProvider>
            <PersonsokKomponent />
        </TestProvider>
    );

    expect(personsokKomponent.toJSON()).toMatchSnapshot();
});
