import { KontaktInformasjon, NavKontorInterface } from '../models/navkontor';
import { UkeDag } from '../models/ukedager';

const mockKontaktInfo: KontaktInformasjon = {
        gateAdresse: {
            gatenavn: 'Islandsgate',
            husnummer: '5',
            husbokstav: 'A',
            postnummer: '0658',
            poststed: 'Oslo'
        },
        apningsTider: [
            {
                ukedag: UkeDag.LØRDAG,
                apentFra: {
                    time: '10',
                    minutt: '30',
                    sekund: '00'
                },
                apentTil: {
                    time: '15',
                    minutt: '30',
                    sekund: '00'
                }
            }
        ]
    }
;

export function getNavKontor(geografiskTilknytning: string): NavKontorInterface {
    return {
        enhetNavn: 'Nav Vålerenga',
        enhetId: '0666',
        kontaktInformasjon: [
            mockKontaktInfo
        ]
    };
}
