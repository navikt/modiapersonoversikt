import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';
import { statiskPensjonMock } from 'src/mock/ytelse/statiskPensjonMock';
import type { Pensjon, PensjonResource } from 'src/models/ytelse/pensjon';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockPensjon(fnr: string): PensjonResource {
    if (fnr === aremark.personIdent) {
        return [statiskPensjonMock];
    }

    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}pensjon`);

    if (navfaker.random.vektetSjanse(0.3)) {
        return null;
    }

    return fyllRandomListe<Pensjon>(() => getMockPensjonYtelser(fnr), 3);
}

export function getMockPensjonYtelser(fnr: string): Pensjon {
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}pensjon`);

    const fom = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tom = dayjs(fom).add(faker.number.int(40), 'days').format(backendDatoformat);

    return {
        id: faker.string.alphanumeric(8),
        fom,
        tom,
        enhetId: '0129',
        type: { code: 'AFP', decode: 'Afp' },
        status: { code: 'OPPRETTET', decode: 'Opprettet' }
    };
}
