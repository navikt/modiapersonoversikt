import { apiBaseUri} from './config';
import { getNavkontor } from './navkontor';

global.fetch = require('jest-fetch-mock');

test('Kalles uten diskresjonskode hvis diskresjonskode er undefined', () => {
    getNavkontor('1234')
        .then((data)=>{})
        .catch((data)=>{});

    const expectedArgs = [
        apiBaseUri + '/enheter?gt=1234',
        { credentials: 'include' }
    ];
    expect(fetch).toBeCalledWith(...expectedArgs);
});

test('Kalles med diskresjonskode hvis diskresjonskode er gitt', () => {
    getNavkontor('','kodeRØD')
        .then((data)=>{})
        .catch((data)=>{});

    const expectedArgs = [
        apiBaseUri + '/enheter?gt=&dkode=kodeRØD',
        { credentials: 'include' }
    ];
    expect(fetch).toBeCalledWith(...expectedArgs);
});


test('Kalles med diskresjonskode og gt hvis diskresjonskode og gt er gitt', () => {
    getNavkontor('1234','kodeRØD')
        .then((data)=>{})
        .catch((data)=>{});

    const expectedArgs = [
        apiBaseUri + '/enheter?gt=1234&dkode=kodeRØD',
        { credentials: 'include' }
    ];
    expect(fetch).toBeCalledWith(...expectedArgs);
});
