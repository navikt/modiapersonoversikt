import { KodeverkResponse } from '../../models/kodeverk';

const mockKodeverk = [
    { kodeRef: 'COL', beskrivelse: 'COLOMBIA' },
    { kodeRef: 'USA', beskrivelse: 'USA' },
    { kodeRef: 'ESP', beskrivelse: 'SPANIA' },
    { kodeRef: 'EST', beskrivelse: 'ESTLAND' },
    { kodeRef: 'BMU', beskrivelse: 'BERMUDA' },
    { kodeRef: 'MSR', beskrivelse: 'MONSERRAT' },
    { kodeRef: 'ZMB', beskrivelse: 'ZAMBIA' }
];

export function mockLandKodeverk(): KodeverkResponse {
    return {
        kodeverk: mockKodeverk
    };
}
