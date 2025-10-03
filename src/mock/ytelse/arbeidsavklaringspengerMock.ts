import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';
import { statiskArbeidsavklaringspengerMock } from 'src/mock/ytelse/statiskArbeidsavklaringspengerMock';
import type {
    Arbeidsavklaringspenger,
    ArbeidsavklaringspengerResponse
} from 'src/models/ytelse/arbeidsavklaringspenger';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockArbeidsavklaringspengerResponse(fnr: string): ArbeidsavklaringspengerResponse {
    if (fnr === aremark.personIdent) {
        return [statiskArbeidsavklaringspengerMock];
    }

    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}arbeidsavklaringspenger`);

    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return fyllRandomListe<Arbeidsavklaringspenger>(() => getMockArbeidsavklaringspenger(fnr), 3);
}

function getMockArbeidsavklaringspenger(fnr: string): Arbeidsavklaringspenger {
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}pensjon`);

    const fomDato = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tomDato = dayjs(fomDato).add(faker.number.int(40), 'days').format(backendDatoformat);

    return {
        barnMedStonad: 2,
        barnetillegg: 1500,
        beregningsgrunnlag: 30000,
        dagsats: 500,
        kildesystem: 'Arena',
        periode: {
            fraOgMedDato: fomDato,
            tilOgMedDato: tomDato
        },
        rettighetsType: 'BISTANDSBEHOV',
        saksnummer: '2023123456',
        status: 'LØPENDE',
        vedtakId: faker.number.int(100).toString(),
        vedtaksdato: '2023-02-01',
        opphorsAarsak: 'FERDIGBEHANDLET'
    };
}
