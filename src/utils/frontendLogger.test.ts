import { emptyStringToUndefined } from './frontendLogger';

test('stipper ut felter som er tomme strings fordi kibana ikke håndterer det så bra', () => {
    const testVerdier = {
        skalBli: 'Hei',
        skalVekk: ''
    };
    const forventetResultat = {
        skalBli: 'Hei',
        skalVekk: undefined
    };

    const resultat = emptyStringToUndefined(testVerdier);

    expect(resultat).toEqual(forventetResultat);
});