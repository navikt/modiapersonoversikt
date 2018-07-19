import { KodeverkResponse } from '../../models/kodeverk';

const mockKodeverk = [
    { kodeRef: 'COL', beskrivelse: 'COLOMBIA' },
    { kodeRef: 'USA', beskrivelse: 'USA' },
    { kodeRef: 'ESP', beskrivelse: 'SPANIA' },
    { kodeRef: 'LVS', beskrivelse: 'LANGTVEKKISTAN' },
    { kodeRef: 'BMU', beskrivelse: 'BERMUDA' },
    { kodeRef: 'MRS', beskrivelse: 'MARS' },
    { kodeRef: 'NRN', beskrivelse: 'NARNIA' },
    { kodeRef: 'NOR', beskrivelse: 'NORGE' },
    { kodeRef: 'SYD', beskrivelse: 'SYDEN' },
    { kodeRef: 'UTL', beskrivelse: 'UTLANDET' }
];

export function mockLandKodeverk(): KodeverkResponse {
    return {
        kodeverk: mockKodeverk
    };
}
