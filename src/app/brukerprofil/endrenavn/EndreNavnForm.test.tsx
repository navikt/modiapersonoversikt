import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../test/Testprovider';
import { aremark } from '../../../mock/person/aremark';
import EndreNavnForm from './EndreNavnForm';
import { VeilederRoller } from '../../../models/veilederRoller';

test('Viser form for endre kontaktinformasjon', () => {

    const veilederRoller: VeilederRoller = { roller: ['0000-GA-BD06_EndreNavn']};
    const endreTilrettelagtKommunikasjonForm = renderer.create(
        <TestProvider>
            <EndreNavnForm person={aremark} veilederRoller={veilederRoller} />
        </TestProvider>
    );

    expect(endreTilrettelagtKommunikasjonForm.toJSON()).toMatchSnapshot();
});
