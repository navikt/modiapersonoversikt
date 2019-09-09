import { ReactWrapper } from 'enzyme';

export function getAktivTab(infoTabs: ReactWrapper) {
    return infoTabs.find('button[role="tab"][aria-selected=true]').text();
}

export const sakerDyplenkeTestSelectorer = {
    saksnavnOversikt: 'test-saksnavnoversikt',
    saksDokumenter: 'test-saksdokumenter',
    sakstemaListeElement: 'test-sakstemaListeElement'
};
