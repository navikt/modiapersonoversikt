import * as renderer from 'react-test-renderer';
import TestProvider from '../../test/Testprovider';
import { setupReactQueryMocks } from '../../test/testStore';
import PersonsokResultat from './PersonsokResultat';
import PersonsokSkjema from './PersonsokSkjema';

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
