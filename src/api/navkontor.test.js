import { apiBaseUri} from './config';
import { getNavkontor } from './navkontor';

global.fetch = require('jest-fetch-mock');

test('Kalles uten diskresjonskode hvis diskresjonskode er undefined', () => {
    getNavkontor('1234')
        .then((data)=>{})
        .catch((data)=>{});

    const expectedArgs = apiBaseUri + '/enheter/geo/1234';
    expect(fetch).toBeCalledWith(expectedArgs);
});

test('Kalles med diskresjonskode hvis diskresjonskode er gitt', () => {
    getNavkontor('1234','kodeRØD')
        .then((data)=>{})
        .catch((data)=>{});

    const expectedArgs = apiBaseUri + '/enheter/geo/1234?dkode=kodeRØD';
    expect(fetch).toBeCalledWith(expectedArgs);
});
