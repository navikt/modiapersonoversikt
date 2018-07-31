import * as moment from 'moment';
import * as faker from 'faker/locale/nb_NO';
import FakerStatic = Faker.FakerStatic;

export function getSistOppdatert() {
    return moment(faker.date.past(5)).toISOString();
}

export function datoForÅrSiden(årSiden: number): Date {
    return moment().subtract(årSiden, 'years').toDate();
}

export function vektetSjanse(seededFaker: FakerStatic, vekt: Number) {
    const tilfeldigTall = seededFaker.random.number({
        max: 1,
        min: 0,
        precision: 1E-8
    });
    return tilfeldigTall <= vekt;
}