import *  as moment from 'moment';
import { Moment } from 'moment';
import fnrGenerator from 'fnr-generator';
import * as faker from 'faker/locale/nb_NO';
import FakerStatic = Faker.FakerStatic;
import { Kjønn } from '../../models/person';
import { utledKjønnFraFødselsnummer } from '../../utils/fnr-utils';

export function randomFodselsnummer(): string {
    const tilfeldigDato = faker.date.past(120);
    return fnrGenerator(tilfeldigDato).next().value;
}

export function seededTilfeldigFodselsnummer(seededFaker: FakerStatic,
                                             minAlder: number,
                                             maxAlder: number,
                                             kjønn?: Kjønn) {
    const fromDate = moment().subtract(maxAlder, 'years').toDate();
    const toDate = moment().subtract(minAlder, 'years').toDate();
    const tilfeldigFødselsdato = seededFaker.date.between(fromDate, toDate);

    var fnr = fnrGenerator(tilfeldigFødselsdato).next().value;
    if (kjønn != null) {
        return getRiktigKjønnPåFødslesnummer(fnr, kjønn);
    }
    return fnr;
}

export function getFodselsdato(fødselsnummer: string): Moment {
    if (fødselsnummer.length !== 11) {
        throw Error('Ugyldig lengde på fødselsnummer: ' + fødselsnummer);
    }

    const dag = getDag(fødselsnummer);
    if (Number(dag) > 40) {
        throw Error('D-nummer er ikke støttet');
    }

    const fireSifretÅr = getFiresifretÅr(fødselsnummer);
    const måned = fødselsnummer.substring(2, 4);
    return moment(`${fireSifretÅr}-${måned}-${dag}`);
}

function getDag(fødselsnummer: string) {
    return fødselsnummer.substring(0, 2);
}

function getFiresifretÅr(fødselsnummer: string) {
    const year = Number(fødselsnummer.substring(4, 6));
    const individnummer = Number(fødselsnummer.substring(6, 9));

    if (individnummer < 500) {
        return year +  1900;
    } else if (individnummer < 750 && 56 < year) {
        return year + 1800;
    } else if (individnummer < 1000 && year < 40) {
        return year + 2000;
    } else if (900 < individnummer  || individnummer > 1000 || 39 >= year) {
        throw new Error('Ugyldig fødselsnummer: ' + fødselsnummer);
    } else {
        return year + 1900;
    }

}

function getRiktigKjønnPåFødslesnummer(fødselsnummer: string, kjønn: Kjønn) {
    if (utledKjønnFraFødselsnummer(fødselsnummer) !== kjønn) {
        const tilfeldigPartall = getTilfeldigPartall().toString();
        const tilfeldigOddetall = (getTilfeldigPartall() + 1).toString();
        const kjønnsiffer = kjønn === Kjønn.Kvinne ? tilfeldigPartall : tilfeldigOddetall;

        var nyttfnr = fødselsnummer.substr(0, 8) + kjønnsiffer + fødselsnummer.substr(9, 11);
        nyttfnr = nyttfnr.substr(0, 9) + getKontrollsiffer1(nyttfnr) + nyttfnr.substr(10, 11);
        nyttfnr = nyttfnr.substr(0, 10) + getKontrollsiffer2(nyttfnr);

        return nyttfnr;
    } else {
        return fødselsnummer;
    }
}

function getTilfeldigPartall() {
    return (Math.floor(Math.random() * 4) + 1) * 2;
}

function getKontrollsiffer1(fnr: string) {
    return 11 - ((3 * d1(fnr) + 7 * d2(fnr) + 6 * m1(fnr) + 1 * m2(fnr) + 8 * å1(fnr) + 9 * å2(fnr)
        + 4 * i1(fnr) + 5 * i2(fnr) + 2 * i3(fnr)) % 11);
}

function getKontrollsiffer2(fnr: string) {
    return 11 - ((5 * d1(fnr) + 4 * d2(fnr) + 3 * m1(fnr) + 2 * m2(fnr) + 7 * å1(fnr) + 6 * å2(fnr)
        + 5 * i1(fnr) + 4 * i2(fnr) + 3 * i3(fnr) + 2 * k1(fnr)) % 11);
}

function d1(fnr: string) { return Number(fnr.charAt(0)); }

function d2(fnr: string) { return Number(fnr.charAt(1)); }

function m1(fnr: string) { return Number(fnr.charAt(2)); }

function m2(fnr: string) { return Number(fnr.charAt(3)); }

function å1(fnr: string) { return Number(fnr.charAt(4)); }

function å2(fnr: string) { return Number(fnr.charAt(5)); }

function i1(fnr: string) { return Number(fnr.charAt(6)); }

function i2(fnr: string) { return Number(fnr.charAt(7)); }

function i3(fnr: string) { return Number(fnr.charAt(8)); }

function k1(fnr: string) { return Number(fnr.charAt(9)); }