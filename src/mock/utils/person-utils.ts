import FakerStatic = Faker.FakerStatic;
import { vektetSjanse } from './mock-utils';

export function lagNavn(faker: FakerStatic) {
    const fornavn = faker.name.firstName();
    const etternavn = faker.name.lastName();
    const mellomnavn = vektetSjanse(faker, 0.5) ? faker.name.lastName() : '';

    return {
        fornavn: fornavn,
        etternavn: etternavn,
        mellomnavn: mellomnavn,
        sammensatt: `${mellomnavn} ${etternavn} ${fornavn} `
    };
}