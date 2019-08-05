import { apiBaseUri } from '../../api/config';
import { getUrl } from './navkontor';

test('Kalles uten diskresjonskode hvis diskresjonskode er undefined', () => {
    const fetchURI = getUrl('1234');
    expect(fetchURI).toEqual(apiBaseUri + '/enheter?gt=1234');
});

test('Kalles med diskresjonskode hvis diskresjonskode er gitt', () => {
    const fetchURI = getUrl(undefined, { kodeRef: 'kodeRØD', beskrivelse: '' });
    expect(fetchURI).toEqual(apiBaseUri + '/enheter?gt=&dkode=kodeRØD');
});

test('Kalles med diskresjonskode og gt hvis diskresjonskode og gt er gitt', () => {
    const fetchURI = getUrl('1234', { kodeRef: 'kodeRØD', beskrivelse: '' });
    expect(fetchURI).toEqual(apiBaseUri + '/enheter?gt=1234&dkode=kodeRØD');
});
