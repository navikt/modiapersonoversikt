import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS, InfotabsType } from '../InfoTabEnum';
import { getAktivTab, sakerTest } from './utils-dyplenker-test';

test('bytter til riktig tab og setter riktig sakstema ved bruk av dyplenke fra oversikt', () => {
    const infoTabs = mount(
        <TestProvider>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS[InfotabsType.OVERSIKT].path);

    const expectedSak = infoTabs
        .find('.' + sakerTest.oversikt)
        .first()
        .text();

    clickOnSak(infoTabs);

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS[InfotabsType.SAKER].path);

    const valgtSak = infoTabs
        .find('.' + sakerTest.dokument)
        .first()
        .text();

    expect(expectedSak).toEqual(valgtSak);
});

function clickOnSak(infoTabs: ReactWrapper) {
    infoTabs
        .find('.' + sakerTest.sakstema)
        .first()
        .find('button')
        .simulate('click');
}
