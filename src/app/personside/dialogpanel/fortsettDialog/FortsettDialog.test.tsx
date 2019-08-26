import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { getTestStore } from '../../../../test/testStore';
import { setDialogpanelTraad } from '../../../../redux/oppgave/actions';
import { statiskTraadMock } from '../../../../mock/meldinger/statiskTraadMock';
import FortsettDialogContainer from './FortsettDialogContainer';

test('viser fortsett dialog', () => {
    const testStore = getTestStore();
    testStore.dispatch(setDialogpanelTraad(statiskTraadMock));
    const dialogPanelBody = renderer.create(
        <TestProvider customStore={testStore}>
            <FortsettDialogContainer traad={statiskTraadMock} />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
