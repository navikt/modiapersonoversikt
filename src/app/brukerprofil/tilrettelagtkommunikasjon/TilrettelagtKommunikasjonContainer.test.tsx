import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TilrettelagtKommunikasjonContainer from './TilrettelagtKommunikasjonContainer';
import TestProvider from '../../../test/Testprovider';
import { aremark } from '../../../mock/person/aremark';

test('Viser form for endre tilrettelagt kommunikasjon', () => {
    const endreTilrettelagtKommunikasjonForm = renderer.create(
        <TestProvider>
            <TilrettelagtKommunikasjonContainer person={aremark} />
        </TestProvider>
    );

    expect(endreTilrettelagtKommunikasjonForm.toJSON()).toMatchSnapshot();
});
