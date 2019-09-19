import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, meldingerTest } from './utils';
import { getTestStore } from '../../../../test/testStore';
import { getMockTraader } from '../../../../mock/meldinger/meldinger-mock';
import { aremark } from '../../../../mock/person/aremark';

test('bytter til riktig tab og setter fokus på riktig melding ved bruk av dyplenke fra oversikt', () => {
    const store = getTestStore();
    store.dispatch(
        store.getState().restResources.tråderOgMeldinger.actions.setData(getMockTraader(aremark.fødselsnummer))
    );
    const infoTabs = mount(
        <TestProvider customStore={store}>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.OVERSIKT);

    clickOnMeldingerIOversikt(infoTabs);

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.MELDINGER);

    const activeElement = document.activeElement ? document.activeElement.innerHTML : fail('ingen elementer i fokus');
    const expectedElement = infoTabs
        .find('.' + meldingerTest.melding)
        .at(2)
        .children()
        .html();

    expect(activeElement).toEqual(expectedElement);
});

function clickOnMeldingerIOversikt(infoTabs: ReactWrapper) {
    infoTabs
        .find('.' + meldingerTest.oversikt)
        .at(2)
        .find('button')
        .simulate('click');
}
