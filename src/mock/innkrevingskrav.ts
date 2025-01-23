import { fakerNB_NO as faker } from '@faker-js/faker';
import {
    DebitorIdentType,
    type Krav,
    type KravPostering,
    KreditorIdentType
} from 'src/lib/types/modiapersonoversikt-api';
import { fyllRandomListe } from './utils/mock-utils';

export const mockInnkrevingsKrav = (kravId: string): Krav => {
    const seedNr = kravId
        .split('')
        .map((c) => c.charCodeAt(0))
        .reduce((s, c) => s + c, 0);
    faker.seed(seedNr);

    return {
        kravId,
        kravType: 'kravtype',
        kid: 'KID123455132',
        opprettetDato: faker.date.past().toUTCString(),
        posteringer: fyllRandomListe<KravPostering>(getMockKravLinje, 4),
        kreditor: {
            kreditorId: '12342341234',
            name: 'Kreditor Kretitorsen',
            ident: '1234234234',
            identType: KreditorIdentType.FNR
        },
        debitor: {
            debitorId: '2341234',
            name: 'Debitor Debitorsen',
            ident: '1234234234',
            identType: DebitorIdentType.ORG_NR
        }
    };
};

const getMockKravLinje = (): KravPostering => {
    faker.seed();
    return {
        kode: faker.lorem.words({ min: 1, max: 5 }),
        beskrivelse: faker.helpers.arrayElement(['kravLinje', 'renter']),
        opprinneligBelop: Number(faker.commerce.price()),
        gjenstaendeBelop: Number(faker.commerce.price()),
        betaltBelop: Number(faker.commerce.price()),
        opprettetDato: faker.date.past().toUTCString()
    };
};
