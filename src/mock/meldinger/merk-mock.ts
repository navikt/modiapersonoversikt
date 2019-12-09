import faker from 'faker/locale/nb_NO';

export function mockTilgangTilSlett(): Boolean {
    return faker.random.boolean();
}
