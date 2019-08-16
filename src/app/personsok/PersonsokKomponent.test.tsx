import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../test/Testprovider';
import Personsok from './Personsok';

test('viser personsøk-komponent', () => {
    const personsokKomponent = renderer.create(
        <TestProvider>
            <Personsok />
        </TestProvider>
    );

    expect(personsokKomponent.toJSON()).toMatchSnapshot();
});
