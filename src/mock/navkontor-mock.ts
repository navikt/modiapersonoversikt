import { ApningsTid, PublikumsMottak, NavKontorInterface } from '../models/navkontor';
import { GateAdresse } from '../models/gateadresse';

const mockApningsTider: Array<ApningsTid> = [{
    ukedag: 'MANDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
}, {
    ukedag: 'TIRSDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
}, {
    ukedag: 'ONSDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
}, {
    ukedag: 'TORSDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
}, {
    ukedag: 'FREDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
}];

const mockGateAdresse: GateAdresse = {
    gatenavn: 'Rådhuset',
    husnummer: '6',
    husbokstav: 'A',
    postnummer: '1798',
    poststed: 'Aremark'
};

const mockKontaktInfo: PublikumsMottak = {
    besoksadresse: mockGateAdresse,
    apningstider: mockApningsTider
};

export function getMockNavKontor(geografiskTilknytning: string): NavKontorInterface {
    return {
        enhetNavn: 'Nav Aremark',
        enhetId: geografiskTilknytning,
        publikumsmottak: [ mockKontaktInfo ]
    };
}
