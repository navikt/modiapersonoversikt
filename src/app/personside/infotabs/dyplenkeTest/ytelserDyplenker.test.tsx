import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, ytelserTest } from './utils';
import { BrowserRouter } from 'react-router-dom';

test('bytter til riktig tab og åpner valgt ytelse ved bruk av dyplenke fra oversikt', () => {
    const infoTabs = mount(
        <TestProvider>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS.OVERSIKT.toLowerCase());

    clickOnYtelse(infoTabs);

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS.YTELSER.toLowerCase());

    const forventetMarkert = infoTabs
        .find('VisMerKnapp')
        .at(1)
        .find('button')
        .html()
        .includes('aria-selected="true"');

    expect(forventetMarkert);

    const ikkeMarkert = infoTabs
        .find('VisMerKnapp')
        .at(0)
        .find('button')
        .html()
        .includes('aria-selected="false"');

    expect(ikkeMarkert);
});

function clickOnYtelse(infoTabs: ReactWrapper) {
    infoTabs
        .find('.' + ytelserTest.oversikt)
        .hostNodes()
        .at(1)
        .find('button')
        .simulate('click');
}
