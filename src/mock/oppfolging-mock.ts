import faker from 'faker/locale/nb_NO';
import {
    AnsattEnhet,
    DetaljertOppfolging,
    Oppfolging,
    OppfolgingsVedtak,
    OppfolgingsYtelse,
    Saksbehandler,
    SyfoPunkt
} from '../models/oppfolging';
import { backendDatoformat } from './utils/mock-utils';
import navfaker from 'nav-faker';
import moment from 'moment';

export function getMockOppfølging(fødselsnummer: string): Oppfolging {
    faker.seed(Number(fødselsnummer));

    return {
        erUnderOppfølging: faker.random.boolean(),
        veileder: getSaksbehandler(),
        enhet: getAnsattEnhet()
    };
}

function getSaksbehandler(): Saksbehandler {
    return {
        ident: 'Z0000001',
        navn: 'Testident Testidentesen'
    };
}

function getAnsattEnhet(): AnsattEnhet {
    return {
        id: 'E0001',
        navn: faker.company.companyName(),
        status: 'ESTAT'
    };
}

export function getMockYtelserOgKontrakter(fødselsnummer: string): DetaljertOppfolging {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'oppf');

    return {
        oppfølging: getMockOppfølging(fødselsnummer),
        meldeplikt: faker.random.boolean(),
        formidlingsgruppe: 'FMGRP' + faker.random.number(5),
        innsatsgruppe: 'INGRP' + faker.random.number(10),
        sykemeldtFra: moment(faker.date.recent(10)).format(backendDatoformat),
        rettighetsgruppe: 'RGRP' + faker.random.number(10),
        vedtaksdato: moment(faker.date.recent(10)).format(backendDatoformat),
        sykefraværsoppfølging: Array(navfaker.random.integer(10, 1))
            .fill(null)
            .map(() => getSyfoPunkt()),
        ytelser: Array(navfaker.random.integer(10, 1))
            .fill(null)
            .map(() => getYtelse())
    };
}

function getSyfoPunkt(): SyfoPunkt {
    return {
        dato: moment(faker.date.recent(100)).format(backendDatoformat),
        fastOppfølgingspunkt: faker.random.boolean(),
        status: 'Ferdig behandlet',
        syfoHendelse: faker.lorem.words(6)
    };
}

function getYtelse(): OppfolgingsYtelse {
    return {
        dagerIgjen: faker.random.number(30),
        ukerIgjen: faker.random.number(10),
        datoKravMottatt: moment(faker.date.recent(30)).format(backendDatoformat),
        fom: moment(faker.date.recent(20)).format(backendDatoformat),
        tom: moment(faker.date.recent(10)).format(backendDatoformat),
        status: navfaker.random.arrayElement(['Aktiv', 'Avsluttet']),
        type: navfaker.random.arrayElement(['Dagpenger', 'Arbeidsavklaringspenger', 'Individstønad']),
        vedtak: Array(navfaker.random.integer(5, 1))
            .fill(null)
            .map(() => getVedtak())
    };
}

function getVedtak(): OppfolgingsVedtak {
    return {
        aktivFra: moment(faker.date.recent(40)).format(backendDatoformat),
        aktivTil: moment(faker.date.recent(20)).format(backendDatoformat),
        aktivitetsfase: 'Ikke spesif. aktivitetsfase',
        vedtakstatus: navfaker.random.arrayElement(['Iverksatt', 'Avsluttet']),
        vedtakstype: 'Vedtak: Ordinære dagpenger'
    };
}
