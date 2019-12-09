import faker from 'faker/locale/nb_NO';
import moment from 'moment';

import navfaker from 'nav-faker/dist/index';
import {
    Arbeidsforhold,
    Periode,
    Pleiepengeperiode,
    Pleiepengerettighet,
    PleiepengerResponse,
    Vedtak
} from '../../models/ytelse/pleiepenger';
import { backendDatoformat, fyllRandomListe } from '../utils/mock-utils';
import { aremark } from '../person/aremark';
import { moss } from '../person/moss';
import { pleiepengerTestData } from '../../app/personside/infotabs/ytelser/pleiepenger/pleiepengerTestData';

export function getMockPleiepenger(fødselsnummer: string): PleiepengerResponse {
    if (fødselsnummer === aremark.fødselsnummer) {
        return {
            pleiepenger: [
                {
                    ...pleiepengerTestData,
                    barnet: moss.fødselsnummer
                }
            ]
        };
    }

    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'pleiepenger');

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
    navfaker.seed(fødselsnummer + 'pleiepenger');

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
        fom: moment(faker.date.past(2)).format(backendDatoformat),
        antallPleiepengedager: navfaker.random.integer(20),
        arbeidsforhold: fyllRandomListe<Arbeidsforhold>(() => getArbeidsforhold(), 2),
        vedtak: fyllRandomListe<Vedtak>(() => getVedtak(), 3)
    };
}

function getArbeidsforhold(): Arbeidsforhold {
    return {
        arbeidsgiverNavn: faker.company.companyName(),
        arbeidsgiverKontonr: Number(faker.finance.account(11)).toString(),
        inntektsperiode: 'Månedssats',
        inntektForPerioden: Math.round(Number(faker.finance.amount(5000, 50000))),
        refusjonTom: moment(faker.date.past(2)).format(backendDatoformat),
        refusjonstype: 'Ikke refusjon',
        arbeidsgiverOrgnr: '1234567890',
        arbeidskategori: 'Arbeidstaker'
    };
}

function getVedtak(): Vedtak {
    return {
        periode: getPeriode(),
        kompensasjonsgrad: navfaker.random.vektetSjanse(0.5) ? 100 : navfaker.random.integer(100),
        utbetalingsgrad: navfaker.random.vektetSjanse(0.5) ? 100 : navfaker.random.integer(100),
        anvistUtbetaling: moment(faker.date.past(2)).format(backendDatoformat),
        bruttobeløp: Number(faker.commerce.price()),
        dagsats: navfaker.random.integer(70),
        pleiepengegrad: navfaker.random.integer(100)
    };
}

function getPeriode(): Periode {
    const fom = moment(faker.date.past(2));
    const tom = moment(fom).add(faker.random.number(40), 'days');
    return {
        fom: fom.format(backendDatoformat),
        tom: tom.format(backendDatoformat)
    };
}
