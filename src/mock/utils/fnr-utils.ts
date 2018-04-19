import *  as moment from 'moment';
import { Moment } from 'moment';
import fnrGenerator from 'fnr-generator';
import * as faker from 'faker/locale/nb_NO';
import FakerStatic = Faker.FakerStatic;

export function randomFodselsnummer(): string {
    const tilfeldigDato = faker.date.past(120);
    return fnrGenerator(tilfeldigDato).next().value;
}

export function seededTilfeldigFodselsnummer(seededFaker: FakerStatic, minAlder: number, maxAlder: number) {
    const fromDate = moment().subtract(maxAlder, 'years').toDate();
    const toDate = moment().subtract(minAlder, 'years').toDate();
    const tilfeldigFødselsdato = seededFaker.date.between(fromDate, toDate);
    return fnrGenerator(tilfeldigFødselsdato).next().value;
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