import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../test/Testprovider';
import { aremark } from '../../../mock/person/aremark';
import KontaktinformasjonContainer from './KontaktinformasjonContainer';

test('Viser form for endre kontaktinformasjon', () => {

    const endreTilrettelagtKommunikasjonForm = renderer.create(
        <TestProvider>
            <KontaktinformasjonContainer person={aremark} />
        </TestProvider>
    );

    expect(endreTilrettelagtKommunikasjonForm.toJSON()).toMatchSnapshot();
});
