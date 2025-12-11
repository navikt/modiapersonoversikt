import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';
import type { Utbetalingsperioder } from 'src/generated/modiapersonoversikt-api';
import { statiskSykepengerSpokelseMock } from 'src/mock/ytelse/statiskSykepengerSpokelseMock';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';

export function getMockSykpengerSpokelseResponse(fnr: string): Utbetalingsperioder {
    if (fnr === aremark.personIdent) {
        return statiskSykepengerSpokelseMock;
    }
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}SykpengerSpokelse`);

    if (navfaker.random.vektetSjanse(0.3)) {
        return { utbetaltePerioder: [] };
    }

    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}SykpengerSpokelse`);

    const fomDato = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tomDatoForstePeriode = dayjs(fomDato).add(faker.number.int(40), 'days').format(backendDatoformat);

    const fomDatoAndrePeriode = dayjs(tomDatoForstePeriode).add(faker.number.int(40), 'days').format(backendDatoformat);
    const tomDato = dayjs(fomDatoAndrePeriode).add(faker.number.int(40), 'days').format(backendDatoformat);

    return {
        utbetaltePerioder: [
            {
                fom: fomDatoAndrePeriode,
                tom: tomDato,
                grad: 50
            },
            {
                fom: fomDato,
                tom: tomDatoForstePeriode,
                grad: 100
            }
        ]
    };
}
