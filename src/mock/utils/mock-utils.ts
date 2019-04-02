import moment from 'moment';
import navfaker from 'nav-faker';

export function getSistOppdatert() {
    return moment(navfaker.dato.forÅrSiden(5)).toISOString();
}

export function vektetSjanse(seededFaker: Faker.FakerStatic, vekt: Number) {
    const tilfeldigTall = seededFaker.random.number({
        max: 1,
        min: 0,
        precision: 1e-8
    });
    return tilfeldigTall <= vekt;
}

export function fyllRandomListe<T>(dataGen: () => T, max: number, kanVæreTom?: boolean): Array<T> {
    let liste = [];
    let n = navfaker.random.integer(max) || (kanVæreTom === true ? 0 : 1);
    for (let i = 0; i < n; i++) {
        liste.push(dataGen());
    }
    return liste;
}

export const backendDatoformat: string = 'YYYY-MM-DD';
