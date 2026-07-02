import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker';
import type {
    AggregertPeriodeArbeidssoekerregisteretDto,
    Gjeldende14aVedtak,
    MetadataArbeidssoekerregisteretDto,
    SykefravaerOppfolgingDto
} from 'src/generated/modiapersonoversikt-api';
import {
    BekreftelseArbeidssoekerregisteretDtoBekreftelsesloesning,
    BekreftelseArbeidssoekerregisteretDtoStatus,
    BekreftelseArbeidssoekerregisteretDtoType,
    BeskrivelseMedDetaljerArbeidssoekerregisteretDtoBeskrivelse,
    BrukerArbeidssoekerregisteretDtoType,
    EgenvurderingArbeidssoekerregisteretDtoEgenvurdering,
    EgenvurderingArbeidssoekerregisteretDtoProfilertTil,
    EgenvurderingArbeidssoekerregisteretDtoType,
    OpplysningerOmArbeidssoekerArbeidssoekerregisteretDtoType,
    PeriodeStartetArbeidssoekerregisteretDtoType,
    ProfileringArbeidssoekerregisteretDtoProfilertTil,
    ProfileringArbeidssoekerregisteretDtoType,
    UtdanningArbeidssoekerregisteretDtoBestaatt,
    UtdanningArbeidssoekerregisteretDtoGodkjent
} from 'src/generated/modiapersonoversikt-api';
import type {
    AnsattEnhet,
    Arbeidsoppfolging,
    Dagpenger,
    DetaljertOppfolging,
    Oppfolging,
    OppfolgingsVedtak,
    OppfolgingsYtelse,
    Saksbehandler,
    SyfoPunkt
} from '../models/oppfolging';
import { backendDatoformat } from '../utils/date-utils';
import { fyllRandomListe } from './utils/mock-utils';

export function getMockOppfolging(fodselsnummer: string): Oppfolging {
    faker.seed(Number(fodselsnummer));
    const erUnderOppfolging = faker.datatype.boolean();

    return {
        erUnderOppfolging: erUnderOppfolging,
        veileder: erUnderOppfolging ? getSaksbehandler() : null,
        enhet: erUnderOppfolging ? getAnsattEnhet() : null
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
        enhetId: 'E0001',
        navn: faker.company.name(),
        status: 'ESTAT'
    };
}

export function getMockYtelserOgKontrakter(fodselsnummer: string): DetaljertOppfolging {
    faker.seed(Number(fodselsnummer));
    navfaker.seed(`${fodselsnummer}oppf`);

    return {
        oppfolging: getMockOppfolging(fodselsnummer),
        meldeplikt: faker.datatype.boolean(),
        formidlingsgruppe: `FMGRP${faker.number.int(5)}`,
        innsatsgruppe: `INGRP${faker.number.int(10)}`,
        sykemeldtFra: dayjs(faker.date.recent({ days: 10 })).format(backendDatoformat),
        rettighetsgruppe: `RGRP${faker.number.int(10)}`,
        vedtaksdato: dayjs(faker.date.recent({ days: 10 })).format(backendDatoformat),
        sykefravaersoppfolging: fyllRandomListe(getSyfoPunkt, 5),
        ytelser: fyllRandomListe(() => faker.helpers.arrayElement([getYtelse(), getDagpenger()]), 4)
    };
}

export function getMock14aVedtak(fodselsnummer: string): Gjeldende14aVedtak {
    faker.seed(Number(fodselsnummer));
    navfaker.seed(`${fodselsnummer}oppf`);

    return {
        fattetDato: '2023-01-15',
        innsatsgruppe: {
            kode: 'INGRP3',
            beskrivelse: 'Innsatsgruppe 3'
        }
    };
}

export function getMockSykefravaersoppfolging(fodselsnummer: string): SykefravaerOppfolgingDto {
    faker.seed(Number(fodselsnummer));
    navfaker.seed(`${fodselsnummer}sykefrav`);

    return {
        sykefravaersoppfolging: fyllRandomListe(getSyfoPunkt, 5)
    };
}

export function getMockArbeidsoppfolging(fodselsnummer: string): Arbeidsoppfolging {
    faker.seed(Number(fodselsnummer));
    navfaker.seed(`${fodselsnummer}arbeidsopp`);

    return getArbeidsoppfolging(fodselsnummer);
}

function getSyfoPunkt(): SyfoPunkt {
    return {
        dato: dayjs(faker.date.recent({ days: 100 })).format(backendDatoformat),
        fastOppfolgingspunkt: faker.datatype.boolean(),
        status: 'Ferdig behandlet',
        syfoHendelse: faker.lorem.words(6)
    };
}

function getYtelse(): OppfolgingsYtelse {
    return {
        datoKravMottatt: dayjs(faker.date.recent({ days: 30 })).format(backendDatoformat),
        fom: dayjs(faker.date.recent({ days: 20 })).format(backendDatoformat),
        tom: dayjs(faker.date.recent({ days: 10 })).format(backendDatoformat),
        status: faker.helpers.arrayElement(['Aktiv', 'Avsluttet', 'Inaktiv', 'Lukket']),
        type: faker.helpers.arrayElement(['Arbeidsavklaringspenger', 'Individstønad']),
        vedtak: Array(navfaker.random.integer(5, 1))
            .fill(null)
            .map(() => getVedtak()),
        dagerIgjenMedBortfall: navfaker.random.integer(100, 0),
        ukerIgjenMedBortfall: navfaker.random.integer(10, 0)
    };
}

function getDagpenger(): Dagpenger {
    return {
        ...getYtelse(),
        type: 'Dagpenger',
        dagerIgjen: faker.number.int(30),
        ukerIgjen: faker.number.int(10),
        dagerIgjenPermittering: 0,
        ukerIgjenPermittering: 0
    };
}

function getVedtak(): OppfolgingsVedtak {
    return {
        aktivFra: dayjs(faker.date.recent({ days: 40 })).format(backendDatoformat),
        aktivTil: dayjs(faker.date.recent({ days: 20 })).format(backendDatoformat),
        aktivitetsfase: 'Ikke spesif. aktivitetsfase',
        vedtakstatus: faker.helpers.arrayElement(['Iverksatt', 'Avsluttet']),
        vedtakstype: 'Ordinære dagpenger'
    };
}

function getArbeidsoppfolging(fodselsnummer: string): Arbeidsoppfolging {
    return {
        oppfolging: getMockOppfolging(fodselsnummer),
        meldeplikt: faker.datatype.boolean(),
        formidlingsgruppe: `FMGRP${faker.number.int(5)}`,
        vedtaksdato: dayjs(faker.date.recent({ days: 10 })).format(backendDatoformat),
        rettighetsgruppe: `RGRP${faker.number.int(10)}`
    };
}

function getMetadata(): MetadataArbeidssoekerregisteretDto {
    return {
        tidspunkt: dayjs(faker.date.recent({ days: 30 })).toISOString(),
        utfoertAv: {
            type: faker.helpers.arrayElement([
                BrukerArbeidssoekerregisteretDtoType.SLUTTBRUKER,
                BrukerArbeidssoekerregisteretDtoType.VEILEDER,
                BrukerArbeidssoekerregisteretDtoType.SYSTEM
            ]),
            id: faker.string.uuid()
        },
        kilde: 'arbeidssokerregisteret',
        aarsak: 'Bruker registrerte seg'
    };
}

export function getMockOppslagArbeidssoekerregisteret(
    fodselsnummer: string
): AggregertPeriodeArbeidssoekerregisteretDto {
    faker.seed(Number(fodselsnummer));

    const opplysningId = faker.string.uuid();
    const profileringId = faker.string.uuid();

    return {
        id: faker.string.uuid(),
        identitetsnummer: fodselsnummer,
        startet: {
            type: PeriodeStartetArbeidssoekerregisteretDtoType.PERIODE_STARTET_V1,
            sendtInnAv: getMetadata(),
            tidspunkt: dayjs(faker.date.recent({ days: 60 })).toISOString()
        },
        opplysning: {
            type: OpplysningerOmArbeidssoekerArbeidssoekerregisteretDtoType.OPPLYSNINGER_V4,
            id: opplysningId,
            sendtInnAv: getMetadata(),
            tidspunkt: dayjs(faker.date.recent({ days: 50 })).toISOString(),
            utdanning: {
                nus: '6',
                bestaatt: UtdanningArbeidssoekerregisteretDtoBestaatt.JA,
                godkjent: UtdanningArbeidssoekerregisteretDtoGodkjent.JA
            },
            jobbsituasjon: {
                beskrivelser: [
                    {
                        beskrivelse: faker.helpers.arrayElement([
                            BeskrivelseMedDetaljerArbeidssoekerregisteretDtoBeskrivelse.HAR_SAGT_OPP,
                            BeskrivelseMedDetaljerArbeidssoekerregisteretDtoBeskrivelse.HAR_BLITT_SAGT_OPP,
                            BeskrivelseMedDetaljerArbeidssoekerregisteretDtoBeskrivelse.VIL_BYTTE_JOBB,
                            BeskrivelseMedDetaljerArbeidssoekerregisteretDtoBeskrivelse.IKKE_VAERT_I_JOBB_SISTE_2_AAR
                        ]),
                        detaljer: {}
                    }
                ]
            }
        },
        profilering: {
            type: ProfileringArbeidssoekerregisteretDtoType.PROFILERING_V1,
            id: profileringId,
            opplysningerOmArbeidssokerId: opplysningId,
            sendtInnAv: getMetadata(),
            profilertTil: faker.helpers.arrayElement([
                ProfileringArbeidssoekerregisteretDtoProfilertTil.ANTATT_GODE_MULIGHETER,
                ProfileringArbeidssoekerregisteretDtoProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
                ProfileringArbeidssoekerregisteretDtoProfilertTil.OPPGITT_HINDRINGER
            ]),
            jobbetSammenhengendeSeksAvTolvSisteMnd: faker.datatype.boolean(),
            tidspunkt: dayjs(faker.date.recent({ days: 45 })).toISOString(),
            alder: faker.number.int({ min: 18, max: 67 })
        },
        egenvurdering: {
            type: EgenvurderingArbeidssoekerregisteretDtoType.EGENVURDERING_V1,
            id: faker.string.uuid(),
            profileringId: profileringId,
            sendtInnAv: getMetadata(),
            profilertTil: faker.helpers.arrayElement([
                EgenvurderingArbeidssoekerregisteretDtoProfilertTil.ANTATT_GODE_MULIGHETER,
                EgenvurderingArbeidssoekerregisteretDtoProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING
            ]),
            egenvurdering: faker.helpers.arrayElement([
                EgenvurderingArbeidssoekerregisteretDtoEgenvurdering.ANTATT_GODE_MULIGHETER,
                EgenvurderingArbeidssoekerregisteretDtoEgenvurdering.ANTATT_BEHOV_FOR_VEILEDNING
            ]),
            tidspunkt: dayjs(faker.date.recent({ days: 40 })).toISOString()
        },
        bekreftelse: {
            type: BekreftelseArbeidssoekerregisteretDtoType.BEKREFTELSE_V1,
            id: faker.string.uuid(),
            bekreftelsesloesning: BekreftelseArbeidssoekerregisteretDtoBekreftelsesloesning.ARBEIDSSOEKERREGISTERET,
            status: BekreftelseArbeidssoekerregisteretDtoStatus.GYLDIG,
            svar: {
                sendtInnAv: getMetadata(),
                gjelderFra: dayjs(faker.date.recent({ days: 14 })).toISOString(),
                gjelderTil: dayjs(faker.date.soon({ days: 14 })).toISOString(),
                harJobbetIDennePerioden: faker.datatype.boolean(),
                vilFortsetteSomArbeidssoeker: true
            },
            tidspunkt: dayjs(faker.date.recent({ days: 7 })).toISOString()
        }
    };
}
