import { faker } from '@faker-js/faker';
import { Locale, type Tekster } from 'src/lib/types/skrivestotte';

const randUUID = faker.string.uuid();

const staticSkrivestotteUUID = 'b4b67323-f57d-47a2-ac19-7ba4b62fe156';

export const skrivestotteMock: Tekster = {
    [randUUID]: {
        id: randUUID,
        overskrift: faker.word.sample(),
        tags: ['eksempel'],
        innhold: {
            [Locale.nb_NO]: faker.lorem.paragraph()
        },
        vekttall: faker.number.int({ min: 0, max: 5 })
    },
    [staticSkrivestotteUUID]: {
        id: staticSkrivestotteUUID,
        overskrift: 'Hilsen',
        tags: ['mvh'],
        innhold: {
            [Locale.nb_NO]: 'Med vennlig hilsen\n[saksbehandler.navn]\n[saksbehandler.enhet]'
        },
        vekttall: 1
    }
};
