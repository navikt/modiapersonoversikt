import faker from 'faker/locale/nb_NO';
import { MockHandler } from 'yet-another-fetch-mock';

export function delayed(ms: number, handler: MockHandler): MockHandler {
    return async (req, res, ctx) => {
        await new Promise((resolve) => setTimeout(resolve, ms));
        return handler(req, res, ctx);
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
