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

export function fyllRandomListe<T>(dataGen: () => T, repeat: number) {
    var liste = [];
    var n = navfaker.random.integer(repeat);
    for (var i = 0; i < n; i++) {
        liste.push(dataGen());
    }
    return liste;
}