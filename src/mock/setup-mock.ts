import * as fetchMock from 'fetch-mock';
import { respondWith, delayed } from './utils';
import { apiBaseUri } from '../api/config';
import { aremark } from './person-mock';

export function setupMock() {
    console.log('### MOCK ENABLED! ###');
    /* tslint:disable-next-line */
    (fetchMock as any)._mock();

    fetchMock.get('begin:' + apiBaseUri + '/person/', respondWith(delayed(2500, aremark)));
}