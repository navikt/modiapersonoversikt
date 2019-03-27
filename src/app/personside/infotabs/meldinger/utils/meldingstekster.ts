import { StatusKlasse, Temagruppe } from '../../../../../models/meldinger/meldinger';

export function statusKlasseTekst(klasse: StatusKlasse) {
    switch (klasse) {
        case StatusKlasse.Telefon:
            return 'Samtalereferat telefon';
        case StatusKlasse.Oppmøte:
            return 'Samtalereferat oppmøte';
        case StatusKlasse.Monolog:
            return 'Spørsmål fra NAV';
        default:
            return 'Ukjent meldingstype';
    }
}

export function temagruppeTekst(temagruppe: Temagruppe) {
    switch (temagruppe) {
        case Temagruppe.Uføretrygd:
            return 'Uføretrygd';
        case Temagruppe.Pensjon:
            return 'Pensjon';
        case Temagruppe.Arbeid:
            return 'Arbeid';
        default:
            return 'Ukjent temagruppe';
    }
}
