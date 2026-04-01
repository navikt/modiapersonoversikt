import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';
import { type Foreldrepenger, ForeldrepengerYtelse } from 'src/generated/modiapersonoversikt-api';
import {
    statiskEngangstonadMock,
    statiskForeldrepengerMock,
    statiskSvangerskapspengerMock
} from 'src/mock/ytelse/statiskForeldrepengerMock';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockForeldrepengerResponse(fnr: string): Foreldrepenger[] {
    if (fnr === aremark.personIdent) {
        return [statiskForeldrepengerMock, statiskSvangerskapspengerMock, statiskEngangstonadMock];
    }
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}foreldrepenger`);

    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return fyllRandomListe<Foreldrepenger>(() => getMockForeldrepenger(fnr), 3);
}

function getMockForeldrepenger(fnr: string): Foreldrepenger {
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}foreldrepenger`);

    const fomDato = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tomDatoForstePeriode = dayjs(fomDato).add(faker.number.int(40), 'days').format(backendDatoformat);

    const fomDatoAndrePeriode = dayjs(tomDatoForstePeriode).add(faker.number.int(40), 'days').format(backendDatoformat);
    const tomDato = dayjs(fomDatoAndrePeriode).add(faker.number.int(40), 'days').format(backendDatoformat);

    const ytelseType = navfaker.random.arrayElement([
        ForeldrepengerYtelse.FORELDREPENGER,
        ForeldrepengerYtelse.ENGANGSST_NAD,
        ForeldrepengerYtelse.SVANGERSKAPSPENGER
    ]);

    return {
        ytelse: ytelseType,
        fom: fomDato,
        tom: tomDato,
        perioder: [
            {
                fom: fomDatoAndrePeriode,
                tom: tomDato,
                grad: 100
            },
            {
                fom: fomDato,
                tom: tomDatoForstePeriode,
                grad: 100
            }
        ],
        saksnummer: '2023123456'
    };
}
