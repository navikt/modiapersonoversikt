import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import FortsettDialog from './FortsettDialog';
import { getTestStore } from '../../../../test/testStore';
import { setDialogpanelTraad } from '../../../../redux/oppgave/actions';
import { statiskTraadMock } from '../../../../mock/meldinger/statiskTraadMock';

test('viser fortsett dialog', () => {
    const testStore = getTestStore();
    testStore.dispatch(setDialogpanelTraad(statiskTraadMock));
    const dialogPanelBody = renderer.create(
        <TestProvider customStore={testStore}>
            <FortsettDialog />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
