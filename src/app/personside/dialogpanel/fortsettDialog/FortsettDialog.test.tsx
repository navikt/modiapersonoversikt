import * as renderer from 'react-test-renderer';
import { statiskTraadMock } from '../../../../mock/meldinger/statiskTraadMock';
import { setValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import TestProvider from '../../../../test/Testprovider';
import { getTestStore } from '../../../../test/testStore';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import FortsettDialogContainer from './FortsettDialogContainer';

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
