import { render } from '@testing-library/react';
import TestProvider from '../../test/Testprovider';
import { setupReactQueryMocks } from '../../test/testStore';
import PersonsokResultat from './PersonsokResultat';
import PersonsokSkjema from './PersonsokSkjema';

test('viser personsøk-komponent', () => {
    setupReactQueryMocks();
    const personsokKomponentV3 = render(
        <TestProvider>
            <>
                <PersonsokSkjema setPosting={() => {}} setResponse={() => {}} />
                <PersonsokResultat posting={false} response={undefined} onClose={() => {}} />
            </>
        </TestProvider>
    );

    expect(personsokKomponentV3.asFragment()).toMatchSnapshot();
});
