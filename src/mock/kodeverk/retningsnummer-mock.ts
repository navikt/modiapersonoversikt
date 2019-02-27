import { KodeverkResponse } from '../../models/kodeverk';

export function mockRetningsnummereKodeverk(): KodeverkResponse {
    return {
        kodeverk: [
            mockRetningsnummer('Sverige', '+46'),
            mockRetningsnummer('Norge', '+47'),
            mockRetningsnummer('Storbritannia (UK)', '+44'),
            mockRetningsnummer('Argentina', '+54')
        ]
    };
}

function mockRetningsnummer(beskrivelse: string, kodeRef: string) {
    return {
        kodeRef,
        beskrivelse: beskrivelse
    };
}
