import { KodeverkResponse } from '../../models/kodeverk';

const mockKodeverk = [
    {
        kodeRef: 'FJD',
        beskrivelse: 'Dollars Fiji'
    }, {
        kodeRef: 'IDR',
        beskrivelse: 'Indonesia'
    }, {
        kodeRef: 'NZD',
        beskrivelse: 'New Zealand Dollar'
    }, {
        kodeRef: 'USD',
        beskrivelse: 'Amerikanske Dollar'
    }
];

export function mockValutaKodeverk(): KodeverkResponse {
    return {
        kodeverk: mockKodeverk
    };
}
