import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, meldingerTest } from './utils-dyplenker-test';
import { getTestStore } from '../../../../test/testStore';
import { cache, createCacheKey } from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../api/config';
import { aremark } from '../../../../mock/persondata/aremark';
import { getMockTraader } from '../../../../mock/meldinger/meldinger-mock';

test('bytter til riktig tab og setter fokus på riktig melding ved bruk av dyplenke fra oversikt', () => {
    const store = getTestStore();
    cache.putResolved(
        createCacheKey(`${apiBaseUri}/dialog/${aremark.personIdent}/meldinger`),
        getMockTraader(aremark.personIdent)
    );
    const infoTabs = mount(
        <TestProvider customStore={store}>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS.OVERSIKT.path);

    clickOnMeldingerIOversikt(infoTabs);

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS.MELDINGER.path);

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
