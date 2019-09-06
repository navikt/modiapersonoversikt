import { ReactWrapper } from 'enzyme';

export function getAktivTab(infoTabs: ReactWrapper) {
    return infoTabs.find('button[role="tab"][aria-selected=true]').text();
}

export const sakerDyplenkeTestSelectorer = {
    saksnavoversikt: 'test-saksnavnoversikt',
    saksnavncontainter: 'test-saksnavncontainer',
    saksnavnknapp: 'test-saksnavnknapp'
};
