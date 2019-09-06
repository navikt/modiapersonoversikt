import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, sakerDyplenkeTestSelectorer } from './utils';

test('bytter til riktig tab og setter fokus på riktig sak ved bruk av dyplenke fra oversikt', () => {
    const infoTabs = mount(
        <TestProvider>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.OVERSIKT);

    const expectedSak = infoTabs
        .find('.' + sakerDyplenkeTestSelectorer.saksnavoversikt)
        .first()
        .text();

    clickOnSak(infoTabs);

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.SAKER);

    const valgtSak = infoTabs
        .find('.' + sakerDyplenkeTestSelectorer.saksnavncontainter)
        .first()
        .text();

    expect(expectedSak).toEqual(valgtSak);
});

function clickOnSak(infoTabs: ReactWrapper) {
    infoTabs
        .find('.' + sakerDyplenkeTestSelectorer.saksnavnknapp)
        .first()
        .find('button')
        .simulate('click');
}
