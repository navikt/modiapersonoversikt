import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { getTestStore } from '../../../../test/testStore';
import { setValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { statiskTraadMock } from '../../../../mock/meldinger/statiskTraadMock';
import FortsettDialogContainer from './FortsettDialogContainer';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';

test('viser fortsett dialog', () => {
    const testStore = getTestStore();
    testStore.dispatch(setValgtTraadDialogpanel(statiskTraadMock));
    const dialogPanelBody = renderer.create(
        <TestProvider customStore={testStore}>
            <FortsettDialogContainer traad={statiskTraadMock} defaultOppgaveDestinasjon={OppgavelisteValg.MinListe} />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
