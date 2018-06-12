import { KodeverkResponse } from '../../models/kodeverk';

export function mockRetningsnummere(): KodeverkResponse {
    return {
        kodeverk: [
            mockRetningsnummer('Norge', '+47'),
            mockRetningsnummer('Sverige', '+46'),
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