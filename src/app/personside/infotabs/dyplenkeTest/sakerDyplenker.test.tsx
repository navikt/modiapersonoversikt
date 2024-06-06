import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, sakerTest } from './utils-dyplenker-test';
import { setupReactQueryMocks } from '../../../../test/testStore';

test('bytter til riktig tab og setter riktig sakstema ved bruk av dyplenke fra oversikt', () => {
    setupReactQueryMocks();
    const infoTabs = mount(
        <TestProvider>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS.OVERSIKT.path);

    const expectedSak = infoTabs
        .find('.' + sakerTest.oversikt)
        .first()
        .text();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    clickOnSak(infoTabs);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS.SAKER.path);

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
