import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../test/Testprovider';
import PersonsokResultat from './PersonsokResultat';
import PersonsokSkjema from './PersonsokSkjema';
import { setupReactQueryMocks } from '../../test/testStore';

test('viser personsøk-komponent', () => {
    setupReactQueryMocks();
    const personsokKomponentV3 = renderer.create(
        <TestProvider>
            <>
                <PersonsokSkjema setPosting={() => {}} setResponse={() => {}} />
                <PersonsokResultat posting={false} response={undefined} onClose={() => {}} />
            </>
        </TestProvider>
    );

    expect(personsokKomponentV3.toJSON()).toMatchSnapshot();
});
