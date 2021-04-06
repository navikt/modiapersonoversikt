import { INFOTABS, InfotabsType } from './InfoTabEnum';
import { getOpenTabFromRouterPath } from './utils/useOpenTab';

test('henter riktig tab fra routerpath', () => {
    const path =
        'http://localhost:7777/modiapersonoversikt/person/1000000000/' + INFOTABS[InfotabsType.UTBETALING].path + '/';

    const apenLamell: InfotabsType = getOpenTabFromRouterPath(path);

    expect(apenLamell.toLowerCase()).toEqual(INFOTABS[InfotabsType.UTBETALING].path);
});

test('åpner oversikt som default hvis url ikke matcher en infotab', () => {
    const path = 'http://localhost:7777/modiapersonoversikt/person/1000000000/' + 'tull&tøys' + '/';

    const apenLamell: InfotabsType = getOpenTabFromRouterPath(path);

    expect(apenLamell.toLowerCase()).toEqual(INFOTABS[InfotabsType.OVERSIKT].path);
});
