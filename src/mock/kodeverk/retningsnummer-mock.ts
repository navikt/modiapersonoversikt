import { KodeverkResponse } from '../../models/kodeverk';

export function mockRetningsnummer(): KodeverkResponse {
    return {
        kodeverk: [
            {
                value: 'Norge',
                kodeRef: '47',
                beskrivelse: 'Norge',
                gyldig: true
            },
            {
                value: 'Sverige',
                kodeRef: '46',
                beskrivelse: 'Sverige',
                gyldig: true
            },
            {
                value: 'Storbritannia (UK)',
                kodeRef: '44',
                beskrivelse: 'Storbritannia (UK)',
                gyldig: true
            }
        ]
    };
}