import FakerStatic = Faker.FakerStatic;

export function lagNavn(faker: FakerStatic) {
    const fornavn = faker.name.firstName();
    const etternavn = faker.name.lastName();
    const mellomnavn = '';

    return {
        fornavn: fornavn,
        etternavn: etternavn,
        mellomnavn: mellomnavn,
        sammensatt: `${fornavn} ${mellomnavn} ${etternavn}`
    };
}