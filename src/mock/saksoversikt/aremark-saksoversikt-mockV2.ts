import {
    DokumentDokumentStatus,
    DokumentmetadataAvsender,
    DokumentmetadataBaksystem,
    DokumentmetadataMottaker,
    DokumentmetadataRetning,
    FeilFeilmelding
} from 'src/generated/modiapersonoversikt-api';
import type { SakstemaSoknadsstatus } from 'src/models/saksoversikt/sakstema';

export function getAremarkSakstemaListeV2(): SakstemaSoknadsstatus[] {
    return [
        {
            harTilgang: false,
            temakode: 'SYK',
            temanavn: 'Sykepenger',
            erGruppert: false,
            soknadsstatus: {
                avbrutt: 0,
                ferdigBehandlet: 0,
                underBehandling: 1,
                sistOppdatert: '2018-12-24T14:24:51.000'
            },
            dokumentMetadata: [
                {
                    id: 'u9fcztqt',
                    retning: DokumentmetadataRetning.INTERN,
                    dato: '2018-08-03T17:11:08.000',
                    navn: 'Silje',
                    journalpostId: 'yna3blpi',
                    hoveddokument: {
                        tittel: 'Innhenting av opplysninger',
                        dokumentreferanse: '77tn8ir0',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: false
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: 'u87cu54s',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: true
                        },
                        {
                            tittel: 'Spørsmål via nav.no',
                            dokumentreferanse: '1s9k5q9y',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: true
                        },
                        {
                            tittel: 'Inntektsopplysninger',
                            dokumentreferanse: '113o8et1',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: true
                        }
                    ],
                    avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                    mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                    tilhorendeSaksid: 'i5v4pekn',
                    tilhorendeFagsaksid: '40xxap7t',
                    baksystem: [DokumentmetadataBaksystem.SAK_OG_BEHANDLING],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: false,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: FeilFeilmelding.SIKKERHETSBEGRENSNING }
                },
                {
                    id: 'jg2nbv00',
                    retning: DokumentmetadataRetning.INN,
                    dato: '2017-02-28T23:50:24.000',
                    navn: 'Benjamin',
                    journalpostId: 'h6p0iy3l',
                    hoveddokument: {
                        tittel: 'Inntektsopplysninger',
                        dokumentreferanse: '15pdmh42',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: false
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: 'k51y90us',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: false
                        }
                    ],
                    avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                    mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                    tilhorendeSaksid: 't6s7hp8k',
                    tilhorendeFagsaksid: 'q8mlv7u2',
                    baksystem: [DokumentmetadataBaksystem.GSAK, DokumentmetadataBaksystem.KODEVERK],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: false,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: FeilFeilmelding.SIKKERHETSBEGRENSNING }
                },
                {
                    id: 'jg2nbv00_null',
                    retning: DokumentmetadataRetning.INN,
                    journalpostId: 'test',
                    dato: '2017-02-28T23:50:24.000',
                    navn: 'Benjamin',
                    hoveddokument: {
                        tittel: 'Inntektsopplysninger',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: false
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: false
                        }
                    ],
                    avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                    mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                    tilhorendeSaksid: 't6s7hp8k',
                    tilhorendeFagsaksid: 'q8mlv7u2',
                    baksystem: [DokumentmetadataBaksystem.GSAK, DokumentmetadataBaksystem.KODEVERK],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: false,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: FeilFeilmelding.SIKKERHETSBEGRENSNING }
                },
                {
                    id: 'odiio5ou',
                    retning: DokumentmetadataRetning.INTERN,
                    dato: '2018-12-05T05:29:17.000',
                    navn: 'Madeleine',
                    journalpostId: 'jnrrue6e',
                    hoveddokument: {
                        tittel: 'Vurdering feilutbetaling/revurdering',
                        dokumentreferanse: '7rtstmj8',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: true
                    },
                    vedlegg: [],
                    avsender: DokumentmetadataAvsender.EKSTERN_PART,
                    mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                    tilhorendeSaksid: 'lzp1rij0',
                    tilhorendeFagsaksid: '7181o3jv',
                    baksystem: [DokumentmetadataBaksystem.HENVENDELSE],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: true, feilmelding: FeilFeilmelding.SIKKERHETSBEGRENSNING }
                },
                {
                    id: 'qsoer38m',
                    retning: DokumentmetadataRetning.INN,
                    dato: '2017-02-10T10:01:25.000',
                    navn: 'Kristine',
                    journalpostId: 'kty2aa9i',
                    hoveddokument: {
                        tittel: 'Innhenting av opplysninger',
                        dokumentreferanse: '5a2gc968',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: true
                    },
                    vedlegg: [],
                    avsender: DokumentmetadataAvsender.UKJENT,
                    mottaker: DokumentmetadataMottaker.NAV,
                    tilhorendeSaksid: '503bv8q8',
                    tilhorendeFagsaksid: 'z0vfuifa',
                    baksystem: [DokumentmetadataBaksystem.AKTOER, DokumentmetadataBaksystem.HENVENDELSE],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: true,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: FeilFeilmelding.SIKKERHETSBEGRENSNING }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'SYK',
                    saksid: 'c4j73hvy',
                    fagsaksnummer: 'ujowhsfk',
                    avsluttet: '2018-02-15T16:34:56.000',
                    fagsystem: '2cjjq',
                    baksystem: DokumentmetadataBaksystem.AKTOER
                },
                {
                    temakode: 'SYK',
                    saksid: 'uncyau83',
                    fagsaksnummer: 'q2w4to5b',
                    avsluttet: '2016-09-01T16:22.56.000',
                    fagsystem: 'q8luy',
                    baksystem: DokumentmetadataBaksystem.SAK_OG_BEHANDLING
                },
                {
                    temakode: 'SYK',
                    saksid: '2x49ix4k',
                    fagsaksnummer: 'i0mue5po',
                    avsluttet: '2017-09-0419:10:16.000',
                    fagsystem: '8gpzp',
                    baksystem: DokumentmetadataBaksystem.GSAK
                }
            ],
            feilkoder: []
        },
        {
            harTilgang: true,
            temakode: 'AAP',
            temanavn: 'Arbeidsavklaringspenger',
            erGruppert: true,
            soknadsstatus: {
                underBehandling: 1,
                ferdigBehandlet: 2,
                avbrutt: 0,
                sistOppdatert: '2018-06-25T06:23:38.000'
            },
            dokumentMetadata: [
                {
                    id: 'wdxbl8gq',
                    retning: DokumentmetadataRetning.UT,
                    dato: '2017-07-27T14:45:32.000',
                    lestDato: new Date('2017-07-27').toISOString(),
                    navn: 'Eline',
                    journalpostId: 'fg1w15sz',
                    hoveddokument: {
                        tittel: 'Spørsmål via nav.no',
                        dokumentreferanse: 'nvqxc1ip',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: true
                    },
                    vedlegg: [],
                    avsender: DokumentmetadataAvsender.UKJENT,
                    mottaker: DokumentmetadataMottaker.NAV,
                    tilhorendeSaksid: 'bj6vyby0',
                    tilhorendeFagsaksid: 'huuael8f',
                    baksystem: [DokumentmetadataBaksystem.PESYS],
                    temakode: 'AAP',
                    temakodeVisning: 'Arbeidsavklaringspenger',
                    ettersending: false,
                    erJournalfort: true,
                    feil: { inneholderFeil: false }
                },
                {
                    id: '44i6gvf6',
                    retning: DokumentmetadataRetning.INN,
                    dato: '2018-03-18T11:27:29.000',
                    navn: 'Thea',
                    journalpostId: 'etcoicxr',
                    hoveddokument: {
                        tittel: 'Inntektsopplysninger',
                        dokumentreferanse: 'q90p8dnw',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: false
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: 'fbp2nc3l',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: false,
                            skjerming: 'Skjerming'
                        },
                        {
                            tittel: 'Referat fra samtale på telefon',
                            dokumentreferanse: 'x2njhynn',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: false
                        },
                        {
                            tittel: 'Vedtak korrigert refusjon/u bet',
                            dokumentreferanse: 'prrweqli',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: true
                        }
                    ],
                    avsender: DokumentmetadataAvsender.EKSTERN_PART,
                    mottaker: DokumentmetadataMottaker.NAV,
                    tilhorendeSaksid: 'azc4yf8p',
                    tilhorendeFagsaksid: '4g9b0ecf',
                    baksystem: [DokumentmetadataBaksystem.AKTOER, DokumentmetadataBaksystem.JOARK],
                    temakode: 'AAP',
                    temakodeVisning: 'Arbeidsavklaringspenger',
                    ettersending: true,
                    erJournalfort: false,
                    feil: { inneholderFeil: false }
                },
                {
                    id: '9mwcks8v',
                    retning: DokumentmetadataRetning.INTERN,
                    dato: '2017-03-17T09:21:37.000',
                    navn: 'Mari',
                    journalpostId: 'o5z5pcse',
                    hoveddokument: {
                        tittel: 'Automatisk vedtak/nyfødt barn',
                        dokumentreferanse: 'me3wv1le',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: false
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: '2whugwip',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: true,
                            dokumentStatus: DokumentDokumentStatus.KASSERT
                        }
                    ],
                    avsender: DokumentmetadataAvsender.NAV,
                    mottaker: DokumentmetadataMottaker.NAV,
                    tilhorendeSaksid: 'fsnziur5',
                    tilhorendeFagsaksid: 'chsgwugz',
                    baksystem: [DokumentmetadataBaksystem.AKTOER, DokumentmetadataBaksystem.JOARK],
                    temakode: 'AAP',
                    temakodeVisning: 'Arbeidsavklaringspenger',
                    ettersending: false,
                    erJournalfort: true,
                    feil: { inneholderFeil: false }
                },
                {
                    id: 'uja0czql',
                    retning: DokumentmetadataRetning.INN,
                    dato: '2016-11-15T12:05:27.000',
                    navn: 'Sebastian',
                    journalpostId: 'aamyoz7n',
                    hoveddokument: {
                        tittel: 'Innhenting av opplysninger',
                        dokumentreferanse: 'mt1cssx0',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: true
                    },
                    vedlegg: [],
                    avsender: DokumentmetadataAvsender.NAV,
                    mottaker: DokumentmetadataMottaker.NAV,
                    tilhorendeSaksid: 'woy1bipx',
                    tilhorendeFagsaksid: 'j6odo6im',
                    baksystem: [DokumentmetadataBaksystem.JOARK],
                    temakode: 'AAP',
                    temakodeVisning: 'Arbeidsavklaringspenger',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'AAP',
                    saksid: 'dgc6rbip',
                    fagsaksnummer: 'zm2q8yyw',
                    avsluttet: '2018-01-03T07:09:52.000',
                    fagsystem: '4xzex',
                    baksystem: DokumentmetadataBaksystem.AKTOER
                }
            ],
            feilkoder: []
        },
        {
            harTilgang: true,
            temakode: 'BAR',
            temanavn: 'Barnetrygd',
            erGruppert: false,
            soknadsstatus: {
                ferdigBehandlet: 0,
                underBehandling: 0,
                avbrutt: 1,
                sistOppdatert: '2018-03-20T19:27:45.000'
            },
            dokumentMetadata: [
                {
                    id: '03fmouny',
                    retning: DokumentmetadataRetning.INTERN,
                    dato: '2016-05-15T12:34:31.000',
                    navn: 'Håkon',
                    journalpostId: 'cmlub095',
                    hoveddokument: {
                        tittel: 'Referat fra samtale på telefon',
                        dokumentreferanse: 'nnp1em30',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: false
                    },
                    vedlegg: [],
                    avsender: DokumentmetadataAvsender.NAV,
                    mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                    tilhorendeSaksid: 'm3yg0ll4',
                    tilhorendeFagsaksid: 'seeuzleo',
                    baksystem: [
                        DokumentmetadataBaksystem.KODEVERK,
                        DokumentmetadataBaksystem.JOARK_SIKKERHETSBEGRENSNING,
                        DokumentmetadataBaksystem.PESYS
                    ],
                    temakode: 'BAR',
                    temakodeVisning: 'Barnetrygd',
                    ettersending: true,
                    erJournalfort: false,
                    feil: { inneholderFeil: false }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'BAR',
                    saksid: '4dsigvke',
                    fagsaksnummer: 'tflo5g8a',
                    avsluttet: '2017-01-17T23:58:28.000',
                    fagsystem: '4u65t',
                    baksystem: DokumentmetadataBaksystem.JOARK_SIKKERHETSBEGRENSNING
                },
                {
                    temakode: 'BAR',
                    saksid: 'uk9z1jev',
                    fagsaksnummer: 'w4llob8j',
                    avsluttet: '2016-09-14T17:36:32.000',
                    fagsystem: 'm0z6n',
                    baksystem: DokumentmetadataBaksystem.KODEVERK
                },
                {
                    temakode: 'BAR',
                    saksid: 'w77q6jll',
                    fagsaksnummer: '0kczk4gb',
                    avsluttet: '2018-09-09T09:41:06.000',
                    fagsystem: 'ehpxy',
                    baksystem: DokumentmetadataBaksystem.JOARK_SIKKERHETSBEGRENSNING
                },
                {
                    temakode: 'BAR',
                    saksid: 'wlkv3uqg',
                    fagsaksnummer: 'r5f2u28o',
                    avsluttet: '2016-07-17T19:35:55.000',
                    fagsystem: 's6pl5',
                    baksystem: DokumentmetadataBaksystem.HENVENDELSE
                },
                {
                    temakode: 'BAR',
                    saksid: 'mbopmq2u',
                    fagsaksnummer: 'zj2fs3bp',
                    avsluttet: '2018-03-08T09.45:41.000',
                    fagsystem: 'wlvkm',
                    baksystem: DokumentmetadataBaksystem.HENVENDELSE
                }
            ],
            feilkoder: []
        },
        {
            harTilgang: true,
            temakode: 'IND',
            temanavn: 'Tiltakspenger',
            erGruppert: false,
            soknadsstatus: {
                avbrutt: 0,
                ferdigBehandlet: 0,
                underBehandling: 1,
                sistOppdatert: '2018-01-14T03:43:31.000'
            },
            dokumentMetadata: [
                {
                    id: '1ml24a5l',
                    retning: DokumentmetadataRetning.UT,
                    dato: '2016-12-26T07:44:01.000',
                    lestDato: new Date('2016-07-27').toISOString(),
                    navn: 'Noah',
                    journalpostId: 'fhtkfp66',
                    hoveddokument: {
                        tittel: 'Vurdering feilutbetaling/revurdering',
                        dokumentreferanse: 'bjol9s20',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: true
                    },
                    vedlegg: [],
                    avsender: DokumentmetadataAvsender.EKSTERN_PART,
                    mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                    tilhorendeSaksid: 'qpdwqelr',
                    tilhorendeFagsaksid: 'xlseaqei',
                    baksystem: [DokumentmetadataBaksystem.AKTOER],
                    temakode: 'IND',
                    temakodeVisning: 'Tiltakspenger',
                    ettersending: false,
                    erJournalfort: true,
                    feil: { inneholderFeil: true, feilmelding: FeilFeilmelding.JOURNALFORT_ANNET_TEMA }
                },
                {
                    id: 'ean9mtio',
                    retning: DokumentmetadataRetning.UT,
                    dato: '2016-12-19T02:27:07.000',
                    lestDato: new Date('2016-07-27').toISOString(),
                    navn: 'Mats',
                    journalpostId: 's9765sz0',
                    hoveddokument: {
                        tittel: 'Spørsmål via nav.no',
                        dokumentreferanse: '113wxk3r',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: false
                    },
                    vedlegg: [],
                    avsender: DokumentmetadataAvsender.UKJENT,
                    mottaker: DokumentmetadataMottaker.UKJENT,
                    tilhorendeSaksid: 'sdbr0fbp',
                    tilhorendeFagsaksid: 'chqjww4b',
                    baksystem: [DokumentmetadataBaksystem.PDF_KONVERTERING, DokumentmetadataBaksystem.AKTOER],
                    temakode: 'IND',
                    temakodeVisning: 'Tiltakspenger',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'IND',
                    saksid: '7sw3ysfd',
                    fagsaksnummer: 'cysvzyxl',
                    avsluttet: '2017-01-16T04:06:17.000',
                    fagsystem: 'krpqj',
                    baksystem: DokumentmetadataBaksystem.JOARK
                }
            ],
            feilkoder: []
        },
        {
            harTilgang: true,
            temakode: 'GEN',
            temanavn: 'Generell',
            erGruppert: true,
            soknadsstatus: {
                underBehandling: 0,
                ferdigBehandlet: 0,
                avbrutt: 0
            },
            dokumentMetadata: [
                {
                    id: 'afp4donc',
                    retning: DokumentmetadataRetning.INTERN,
                    dato: '2017-11-21T17:15:34.000',
                    navn: 'Maren',
                    journalpostId: 'lidtmy7n',
                    hoveddokument: {
                        tittel: 'Spørsmål via nav.no',
                        dokumentreferanse: '4asiwin3',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: false,
                        skjerming: 'POL',
                        dokumentStatus: DokumentDokumentStatus.KASSERT
                    },
                    vedlegg: [
                        {
                            tittel: 'Spørsmål via nav.no',
                            dokumentreferanse: '428dwf43',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: false
                        },
                        {
                            tittel: 'Innhenting av opplysninger',
                            dokumentreferanse: 'sw0rma45',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: true
                        },
                        {
                            tittel: 'Spørsmål via nav.no',
                            dokumentreferanse: 'tdxt2vie',
                            saksbehandlerHarTilgang: true,
                            logiskDokument: true
                        }
                    ],
                    avsender: DokumentmetadataAvsender.EKSTERN_PART,
                    mottaker: DokumentmetadataMottaker.NAV,
                    tilhorendeSaksid: 'ocrn83pf',
                    tilhorendeFagsaksid: '53kj7i18',
                    baksystem: [
                        DokumentmetadataBaksystem.JOARK_SIKKERHETSBEGRENSNING,
                        DokumentmetadataBaksystem.SAK_OG_BEHANDLING
                    ],
                    temakode: 'GEN',
                    temakodeVisning: 'Generell',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false }
                },
                {
                    id: 'v2l20frr',
                    retning: DokumentmetadataRetning.INTERN,
                    dato: '2016-03-12T08:04:34.000',
                    navn: 'Jonathan',
                    journalpostId: 'ai9t2h2n',
                    hoveddokument: {
                        tittel: 'A-inntekt',
                        dokumentreferanse: 'gplzp0ho',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: true
                    },
                    vedlegg: [],
                    avsender: DokumentmetadataAvsender.UKJENT,
                    mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                    tilhorendeSaksid: '50ly1k4j',
                    tilhorendeFagsaksid: 'd4zxe6cm',
                    baksystem: [DokumentmetadataBaksystem.SAK_OG_BEHANDLING],
                    temakode: 'GEN',
                    temakodeVisning: 'Generell',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false }
                },
                {
                    id: 'cjfcu3p7',
                    retning: DokumentmetadataRetning.INN,
                    dato: '2016-05-24T06:39:41.000',
                    navn: 'Martine',
                    journalpostId: 'wgh1hlqa',
                    hoveddokument: {
                        tittel: 'Referat fra samtale på telefon',
                        dokumentreferanse: 'zochf067',
                        saksbehandlerHarTilgang: true,
                        logiskDokument: false
                    },
                    vedlegg: [],
                    avsender: DokumentmetadataAvsender.UKJENT,
                    mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                    tilhorendeSaksid: '6299d3c8',
                    tilhorendeFagsaksid: 'ti2t0c00',
                    baksystem: [DokumentmetadataBaksystem.PESYS, DokumentmetadataBaksystem.JOARK],
                    temakode: 'GEN',
                    temakodeVisning: 'Generell',
                    ettersending: false,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: FeilFeilmelding.SIKKERHETSBEGRENSNING }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'GEN',
                    saksid: 'iyc5xe1f',
                    fagsaksnummer: '8qj6vuv6',
                    avsluttet: '2016-01-18T11:25:19.000',
                    fagsystem: 'yaacv',
                    baksystem: DokumentmetadataBaksystem.SAK_OG_BEHANDLING
                },
                {
                    temakode: 'GEN',
                    saksid: 'bun0w6u9',
                    fagsaksnummer: 'y3a6y58z',
                    avsluttet: '2018-06-14T17:34:22.000',
                    fagsystem: 'u24f2',
                    baksystem: DokumentmetadataBaksystem.GSAK
                }
            ],
            feilkoder: []
        },
        {
            harTilgang: true,
            temakode: 'BID',
            temanavn: 'Bidrag',
            erGruppert: false,
            soknadsstatus: {
                avbrutt: 0,
                ferdigBehandlet: 0,
                underBehandling: 0
            },
            dokumentMetadata: [],
            tilhorendeSaker: [],
            feilkoder: []
        }
    ];
}
