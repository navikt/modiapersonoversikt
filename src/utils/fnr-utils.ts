import { Kjønn } from '../models/person/person';

export function getFodselsdatoFraFnr(fnr: string): Date {
    if (fnr.length !== 11) {
        throw Error('Ugyldig lengde på personIdentifikator: ' + fnr);
    }

    const dag = getDag(fnr);

    const fireSifretAr = getFiresifretAr(fnr);
    const maned = fnr.substring(2, 4);
    return new Date(`${fireSifretAr}-${maned}-${dag}`);
}

function getDag(fnr: string): string {
    let dag = Number(fnr.substring(0, 2));
    if (erDnummer(fnr)) {
        dag = dag - 40;
    } else if (dag >= 72) {
        throw Error('Fødselsnummer er av ukjent format: ' + fnr);
    }
    return dag.toString(10).padStart(2, '0');
}

function getFiresifretAr(fnr: string): number {
    const year = Number(fnr.substring(4, 6));
    const individnummer = Number(fnr.substring(6, 9));

    if (individnummer < 500) {
        return year + 1900;
    } else if (individnummer < 750 && 56 < year) {
        return year + 1800;
    } else if (individnummer < 1000 && year < 40) {
        return year + 2000;
    } else if (900 < individnummer || individnummer > 1000 || 39 >= year) {
        throw new Error('Ugyldig personIdentifikator: ' + fnr);
    } else {
        return year + 1900;
    }
}

export function utledKjønnFraFødselsnummer(fødselsnummer?: string): Kjønn {
    if (!fødselsnummer) {
        return Kjønn.Diskresjonskode;
    }
    return Number(fødselsnummer.charAt(8)) % 2 === 1 ? Kjønn.Mann : Kjønn.Kvinne;
}

export function erDnummer(fødselsnummer: string) {
    const dag = Number(fødselsnummer.substring(0, 2));
    return dag > 40 && dag <= 71;
}

export function erGydligishFnr(fnr: string) {
    const numeric = !/\D/.test(fnr);
    return fnr.length === 11 && numeric;
}
