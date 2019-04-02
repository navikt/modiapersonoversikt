import { KodeverkResponse } from '../../models/kodeverk';

const mockKodeverk = [
    {
        kodeRef: 'GUL',
        beskrivelse: 'Gullmynter, Kong Salomons Rike'
    },
    {
        kodeRef: 'SPD',
        beskrivelse: 'Spesidaler'
    },
    {
        kodeRef: 'NZD',
        beskrivelse: 'New Zealand Dollar'
    },
    {
        kodeRef: 'USD',
        beskrivelse: 'Amerikanske Dollar'
    },
    {
        kodeRef: 'NOK',
        beskrivelse: 'Norske Kroner'
    }
];

export function mockValutaKodeverk(): KodeverkResponse {
    return {
        kodeverk: mockKodeverk
    };
}
