import navfaker from 'nav-faker';
import { fakerNB_NO as faker } from '@faker-js/faker';
import { HttpResponseResolver, PathParams, StrictRequest } from 'msw';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';

export const STATUS_BAD_REQUEST = () => 400;
export const STATUS_OK = () => Promise.resolve(200);

export function delayed(ms: number, handler: HttpResponseResolver): HttpResponseResolver {
    return async (args) => {
        await new Promise((resolve) => setTimeout(resolve, ms));
        return handler(args);
    };
}

export function nArrayElement<T>(list: Array<T>, n: number, allowDuplicates: boolean = true): Array<T> {
    if (n > list.length && !allowDuplicates) {
        throw new Error(`Cannot generate list of size ${n} without duplicates. Max size is: ${list.length}`);
    }
    if (n === list.length && !allowDuplicates) {
        return list;
    }
    const holder: Array<T> = [];
    while (holder.length < n) {
        const element: T = faker.random.arrayElement(list);
        if (allowDuplicates || !holder.includes(element)) {
            holder.unshift(element);
        }
    }
    return holder;
}

export function randomDelay() {
    if (navfaker.random.vektetSjanse(0.05)) {
        return faker.random.number(5000);
    }
    return faker.random.number(750);
}

export const fodselsNummerErGyldigStatus = async (
    req: StrictRequest<{ fnr: string }>,
    parsedBody?: { fnr: string }
) => {
    const body = parsedBody ?? (await req.json());
    return erGyldigFødselsnummer(body.fnr) ? STATUS_OK() : STATUS_BAD_REQUEST();
};
