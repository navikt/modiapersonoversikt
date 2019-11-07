import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../test/Testprovider';
import { aremark } from '../../../mock/person/aremark';
import EndreNavnForm from './EndreNavnForm';
import { VeilederRoller } from '../../../models/veilederRoller';
import { SaksbehandlerRoller } from '../../../utils/RollerUtils';

test('Viser form for endre navn', () => {
    const veilederRoller: VeilederRoller = { roller: [SaksbehandlerRoller.EndreNavn] };
    const endreNavn = renderer.create(
        <TestProvider>
            <EndreNavnForm person={aremark} veilederRoller={veilederRoller} />
        </TestProvider>
    );

    expect(endreNavn.toJSON()).toMatchSnapshot();
});
