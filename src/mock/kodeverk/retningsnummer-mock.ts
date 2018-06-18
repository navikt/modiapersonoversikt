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

function mockRetningsnummer(value: string, kodeRef: string) {
    return {
        value,
        kodeRef,
        beskrivelse: value,
        gyldig: true
    };
}