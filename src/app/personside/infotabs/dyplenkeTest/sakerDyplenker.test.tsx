import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, sakerTest } from './utils';

test('bytter til riktig tab og setter riktig sakstema ved bruk av dyplenke fra oversikt', () => {
    const infoTabs = mount(
        <TestProvider>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS.OVERSIKT.toLowerCase());

    const expectedSak = infoTabs
        .find('.' + sakerTest.oversikt)
        .first()
        .text();

    clickOnSak(infoTabs);

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS.SAKER.toLowerCase());

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
