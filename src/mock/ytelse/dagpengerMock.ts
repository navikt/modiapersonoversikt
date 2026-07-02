import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';
import {
    type BeregnetDagDagpengerDto,
    BeregnetDagDagpengerDtoKilde,
    type Dagpenger
} from 'src/generated/modiapersonoversikt-api';
import { statiskPeriodeDagpengerDtoMock } from 'src/mock/ytelse/statiskPeriodeDagpengerDtoMock';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockDagpengerResponse(fnr: string): Dagpenger {
    if (fnr === aremark.personIdent) {
        return statiskPeriodeDagpengerDtoMock;
    }
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}xyzzy`);
    // sometimes we might want an empty list
    if (navfaker.random.vektetSjanse(0.3)) {
        return { perioder: [] };
    }
    const perioder = fyllRandomListe<BeregnetDagDagpengerDto>(() => getMockPeriodeDagpengerDto(fnr), 3);
    const først = perioder[0].fraOgMed;
    return {
        perioder: perioder,
        eldsteFraOgMedDato: først
    };
}

function getMockPeriodeDagpengerDto(fnr: string): BeregnetDagDagpengerDto {
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}xyzzy`); // seed again for predictability

    const fomDato = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tomDato = dayjs(fomDato).add(faker.number.int(40), 'days').format(backendDatoformat);

    const kilde = navfaker.random.arrayElement([
        BeregnetDagDagpengerDtoKilde.ARENA,
        BeregnetDagDagpengerDtoKilde.DP_SAK
    ]);

    return {
        fraOgMed: fomDato,
        tilOgMed: tomDato,
        kilde: kilde,
        sats: 100,
        gjenståendeDager: 10,
        utbetaltBeløp: 50000
    };
}
