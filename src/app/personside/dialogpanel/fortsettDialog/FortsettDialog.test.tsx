import { act } from '@testing-library/react';
import { statiskTraadMock } from '../../../../mock/meldinger/statiskTraadMock';
import { setValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { renderWithProviders } from '../../../../test/Testprovider';
import { getTestStore } from '../../../../test/testStore';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import FortsettDialogContainer from './FortsettDialogContainer';

test('viser fortsett dialog', async () => {
    const testStore = getTestStore();
    testStore.dispatch(setValgtTraadDialogpanel(statiskTraadMock));
    const dialogPanelBody = await act(() =>
        renderWithProviders(
            <FortsettDialogContainer traad={statiskTraadMock} defaultOppgaveDestinasjon={OppgavelisteValg.MinListe} />
        )
    );

    expect(dialogPanelBody.asFragment()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
