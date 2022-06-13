import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../test/Testprovider';
import PersonsokResultat from './PersonsokResultat';
import PersonsokSkjemaV3 from './PersonsokSkjemaV3';

test('viser personsøkV3-komponent', () => {
    const personsokKomponentV3 = renderer.create(
        <TestProvider>
            <>
                <PersonsokSkjemaV3 setPosting={() => {}} setResponse={() => {}} />
                <PersonsokResultat posting={false} response={undefined} onClose={() => {}} />
            </>
        </TestProvider>
    );

    expect(personsokKomponentV3.toJSON()).toMatchSnapshot();
});
