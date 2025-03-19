import type { Faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker';

export function getSistOppdatert() {
    return dayjs(navfaker.dato.forÅrSiden(5)).toISOString();
}

export function vektetSjanse(seededFaker: Faker, vekt: number) {
    return seededFaker.datatype.boolean(vekt);
}

export function fyllRandomListe<T>(dataGen: (i?: number) => T, max: number, kanVæreTom?: boolean): Array<T> {
    const liste = [];
    const n = navfaker.random.integer(max) || (kanVæreTom === true ? 0 : 1);
    for (let i = 0; i < n; i++) {
        liste.push(dataGen(i));
    }
    return liste;
}
