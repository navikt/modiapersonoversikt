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

export function getPleiepenger(fødselsnummer: string): PleiepengerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer);

    return {
        pleiepenger: fyllRandomListe(() => getPleiepengerettighet(fødselsnummer), 10)
    };
}

function getPleiepengerettighet(fødselsnummer: string): Pleiepengerettighet {
    return {
        barnet: navfaker.fødselsnummer.generer(),
        omsorgsperson: fødselsnummer,
        andreOmsorgsperson: navfaker.fødselsnummer.generer(),
        restDagerFomIMorgen: navfaker.random.number(100),
        forbrukteDagerTomIDag: navfaker.random.number(20),
        pleiepengedager: navfaker.random.number(200),
        restDagerAnvist: navfaker.random.number(50),
        perioder: fyllRandomListe(() => getPleiepengeperiode(), 10)
    };
}

function getPleiepengeperiode(): Pleiepengeperiode {
    return {
        fom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        antallPleiepengedager: navfaker.random.number(100),
        arbeidsforhold: fyllRandomListe(() => getArbeidsforhold(), 10),
        vedtak: fyllRandomListe(() => getVedtak(), 10)
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
        kompensasjonsgrad: navfaker.random.number(90),
        utbetalingsgrad: navfaker.random.number(90),
        anvistUtbetaling: 'ANVIST',
        bruttobeløp: Number(faker.commerce.price()),
        dagsats: navfaker.random.number(70),
        pleiepengegrad: navfaker.random.number(60)
    };
}

function getPeriode(): Periode {
    return {
        fom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        tom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand)
    };
}