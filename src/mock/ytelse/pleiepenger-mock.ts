import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import navfaker from 'nav-faker/dist/index';
import {
    Arbeidsforhold, Periode,
    Pleiepengeperiode,
    Pleiepengerettighet,
    PleiepengerResponse, Vedtak
} from '../../models/ytelse/pleiepenger';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockPleiepenger(fødselsnummer: string): PleiepengerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'pleiepenger');

    if (navfaker.random.vektetSjanse(0.3)) {
        return {
            pleiepenger: []
        };
    }

    return {
        pleiepenger: fyllRandomListe<Pleiepengerettighet>(() => getPleiepengerettighet(fødselsnummer), 3)
    };
}

function getPleiepengerettighet(fødselsnummer: string): Pleiepengerettighet {
    return {
        barnet: navfaker.personIdentifikator.fødselsnummer(),
        omsorgsperson: fødselsnummer,
        andreOmsorgsperson: navfaker.personIdentifikator.fødselsnummer(),
        restDagerFomIMorgen: navfaker.random.integer(100),
        forbrukteDagerTomIDag: navfaker.random.integer(20),
        pleiepengedager: navfaker.random.integer(200),
        restDagerAnvist: navfaker.random.integer(50),
        perioder: fyllRandomListe<Pleiepengeperiode>(() => getPleiepengeperiode(), 10)
    };
}

function getPleiepengeperiode(): Pleiepengeperiode {
    return {
        fom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        antallPleiepengedager: navfaker.random.integer(100),
        arbeidsforhold: fyllRandomListe<Arbeidsforhold>(() => getArbeidsforhold(), 10),
        vedtak: fyllRandomListe<Vedtak>(() => getVedtak(), 10)
    };
}

function getArbeidsforhold(): Arbeidsforhold {
    return {
        arbeidsgiverNavn: faker.company.companyName(),
        arbeidsgiverKontonr: Number(faker.finance.account(9)).toString(),
        inntektsperiode: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        inntektForPerioden: Number(faker.commerce.price()),
        refusjonTom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        refusjonstype: 'REFUSJONTYPE',
        arbeidsgiverOrgnr: '1234567890',
        arbeidskategori: 'ARBKAT'
    };
}

function getVedtak(): Vedtak {
    return {
        periode: getPeriode(),
        kompensasjonsgrad: navfaker.random.integer(90),
        utbetalingsgrad: navfaker.random.integer(90),
        anvistUtbetaling: 'ANVIST',
        bruttobeløp: Number(faker.commerce.price()),
        dagsats: navfaker.random.integer(70),
        pleiepengegrad: navfaker.random.integer(60)
    };
}

function getPeriode(): Periode {
    return {
        fom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        tom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand)
    };
}