import * as moment from 'moment';
import navfaker from 'nav-faker';
import FakerStatic = Faker.FakerStatic;

export function getSistOppdatert() {
    return moment(navfaker.dato.forÅrSiden(5)).toISOString();
}

export function vektetSjanse(seededFaker: FakerStatic, vekt: Number) {
    const tilfeldigTall = seededFaker.random.number({
        max: 1,
        min: 0,
        precision: 1E-8
    });
    return tilfeldigTall <= vekt;
}

export function fyllRandomListe<T>(dataGen: () => T, max: number): Array<T> {
    let liste = [];
    let n = navfaker.random.integer(max) || 1;
    for (let i = 0; i < n; i++) {
        liste.push(dataGen());
    }
    return liste;
}