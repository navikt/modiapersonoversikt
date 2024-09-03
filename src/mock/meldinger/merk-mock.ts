import { fakerNB_NO as faker } from '@faker-js/faker';

export function mockTilgangTilSlett(): Boolean {
    return faker.random.boolean();
}
