import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, meldingerTest } from './utils-dyplenker-test';
import { getTestStore, setupReactQueryMocks } from '../../../../test/testStore';
import { aremark } from '../../../../mock/persondata/aremark';
import { getMockTraader } from '../../../../mock/meldinger/meldinger-mock';
import dialogResource from '../../../../rest/resources/dialogResource';

test('bytter til riktig tab og setter fokus på riktig melding ved bruk av dyplenke fra oversikt', () => {
    setupReactQueryMocks();
    (dialogResource.useFetch as jest.Mock<any>).mockImplementation(() => ({
        data: getMockTraader(aremark.personIdent)
    }));
    const store = getTestStore();
    const infoTabs = mount(
        <TestProvider customStore={store}>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS.OVERSIKT.path);

    clickOnMeldingerIOversikt(infoTabs);

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.MELDINGER.tittel);

    const checkedMelding = infoTabs.find('input[checked=true].' + meldingerTest.melding).html();
    const expectedElement = infoTabs
        .find('input[type="radio"].' + meldingerTest.melding)
        .at(1)
        .html();

    expect(checkedMelding).toEqual(expectedElement);
});

function clickOnMeldingerIOversikt(infoTabs: ReactWrapper) {
    infoTabs
        .find('.' + meldingerTest.oversikt)
        .find('button')
        .at(1)
        .simulate('click');
}
