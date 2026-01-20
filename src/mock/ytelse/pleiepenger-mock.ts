import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import navfaker from 'nav-faker/dist/index';
import { pleiepengerTestData } from 'src/app/personside/infotabs/ytelser/pleiepenger/pleiepengerTestData';
import type { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';
import type {
    Periode,
    Pleiepengeperiode,
    Pleiepengerettighet,
    PleiepengerResponse,
    Vedtak
} from 'src/models/ytelse/pleiepenger';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';
import { lagPerson } from '../persondata/persondata';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockPleiepenger(fødselsnummer: string): PleiepengerResponse {
    if (fødselsnummer === aremark.personIdent) {
        return {
            pleiepenger: [
                {
                    ...pleiepengerTestData,
                    barnet: lagPerson('12345678910').personIdent
                }
            ]
        };
    }

    faker.seed(Number(fødselsnummer));
    navfaker.seed(`${fødselsnummer}pleiepenger`);

    if (navfaker.random.vektetSjanse(0.3)) {
        return {
            pleiepenger: null
        };
    }

    return {
        pleiepenger: fyllRandomListe<Pleiepengerettighet>(() => getMockPleiepengerettighet(fødselsnummer), 2)
    };
}

export function getMockPleiepengerettighet(fødselsnummer: string): Pleiepengerettighet {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(`${fødselsnummer}pleiepenger`);

    const pleiepengeDager = 1300;
    const forbrukteDager = navfaker.random.integer(pleiepengeDager);
    const restDager = pleiepengeDager - forbrukteDager;
    return {
        barnet: navfaker.personIdentifikator.fødselsnummer(),
        omsorgsperson: fødselsnummer,
        andreOmsorgsperson: navfaker.personIdentifikator.fødselsnummer(),
        restDagerFomIMorgen: restDager,
        forbrukteDagerTomIDag: forbrukteDager,
        pleiepengedager: pleiepengeDager,
        restDagerAnvist: restDager,
        perioder: fyllRandomListe<Pleiepengeperiode>(() => getPleiepengeperiode(), 10)
    };
}

function getPleiepengeperiode(): Pleiepengeperiode {
    return {
        fom: dayjs(faker.date.past({ years: 2 })).format(backendDatoformat),
        antallPleiepengedager: navfaker.random.integer(20),
        arbeidsforhold: fyllRandomListe<Arbeidsforhold>(() => getArbeidsforhold(), 2),
        vedtak: fyllRandomListe<Vedtak>(() => getVedtak(), 3)
    };
}

function getArbeidsforhold(): Arbeidsforhold {
    return {
        arbeidsgiverNavn: faker.company.name(),
        arbeidsgiverKontonr: Number(faker.finance.accountNumber(11)).toString(),
        inntektsperiode: 'Månedssats',
        inntektForPerioden: Math.round(Number(faker.finance.amount({ min: 5000, max: 50000 }))),
        refusjonTom: dayjs(faker.date.past({ years: 2 })).format(backendDatoformat),
        refusjonstype: 'Ikke refusjon',
        arbeidsgiverOrgnr: '1234567890',
        arbeidskategori: 'Arbeidstaker',
        sykepengerFom: null
    };
}

function getVedtak(): Vedtak {
    return {
        periode: getPeriode(),
        kompensasjonsgrad: navfaker.random.vektetSjanse(0.5) ? 100 : navfaker.random.integer(100),
        utbetalingsgrad: navfaker.random.vektetSjanse(0.5) ? 100 : navfaker.random.integer(100),
        anvistUtbetaling: dayjs(faker.date.past({ years: 2 })).format(backendDatoformat),
        bruttobelop: Number(faker.commerce.price()),
        dagsats: navfaker.random.integer(70),
        pleiepengegrad: navfaker.random.integer(100)
    };
}

function getPeriode(): Periode {
    const fom = dayjs(faker.date.past({ years: 2 }));
    const tom = dayjs(fom).add(faker.number.int(40), 'days');
    return {
        fom: fom.format(backendDatoformat),
        tom: tom.format(backendDatoformat)
    };
}
