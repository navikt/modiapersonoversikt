import { Baksystem } from '../../models/saksoversikt/fellesSak';
import { DokumentStatus, Entitet, Feilmelding, Kommunikasjonsretning } from '../../models/saksoversikt/journalpost';
import type { SakstemaSoknadsstatus } from '../../models/saksoversikt/sakstema';

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
                    retning: Kommunikasjonsretning.Intern,
                    dato: '2018-08-03T17:11:08.000',
                    lestDato: null,
                    navn: 'Silje',
                    journalpostId: 'yna3blpi',
                    hoveddokument: {
                        tittel: 'Innhenting av opplysninger',
                        dokumentreferanse: '77tn8ir0',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: 'u87cu54s',
                            kanVises: false,
                            logiskDokument: true,
                            skjerming: null,
                            dokumentStatus: null
                        },
                        {
                            tittel: 'Spørsmål via nav.no',
                            dokumentreferanse: '1s9k5q9y',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null,
                            dokumentStatus: null
                        },
                        {
                            tittel: 'Inntektsopplysninger',
                            dokumentreferanse: '113o8et1',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null,
                            dokumentStatus: null
                        }
                    ],
                    avsender: Entitet.Sluttbruker,
                    mottaker: Entitet.Sluttbruker,
                    tilhorendeSaksid: 'i5v4pekn',
                    tilhorendeFagsaksid: '40xxap7t',
                    baksystem: [Baksystem.SakOgBehandling],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: false,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: Feilmelding.Sikkerhetsbegrensning }
                },
                {
                    id: 'jg2nbv00',
                    retning: Kommunikasjonsretning.Inn,
                    dato: '2017-02-28T23:50:24.000',
                    lestDato: null,
                    navn: 'Benjamin',
                    journalpostId: 'h6p0iy3l',
                    hoveddokument: {
                        tittel: 'Inntektsopplysninger',
                        dokumentreferanse: '15pdmh42',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: 'k51y90us',
                            kanVises: true,
                            logiskDokument: false,
                            skjerming: null,
                            dokumentStatus: null
                        }
                    ],
                    avsender: Entitet.Sluttbruker,
                    mottaker: Entitet.EksternPart,
                    tilhorendeSaksid: 't6s7hp8k',
                    tilhorendeFagsaksid: 'q8mlv7u2',
                    baksystem: [Baksystem.Gsak, Baksystem.Kodeverk],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: false,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: Feilmelding.Sikkerhetsbegrensning }
                },
                {
                    id: 'jg2nbv00_null',
                    retning: Kommunikasjonsretning.Inn,
                    dato: '2017-02-28T23:50:24.000',
                    lestDato: null,
                    navn: 'Benjamin',
                    journalpostId: null,
                    hoveddokument: {
                        tittel: 'Inntektsopplysninger',
                        dokumentreferanse: null,
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: null,
                            kanVises: true,
                            logiskDokument: false,
                            skjerming: null,
                            dokumentStatus: null
                        }
                    ],
                    avsender: Entitet.Sluttbruker,
                    mottaker: Entitet.EksternPart,
                    tilhorendeSaksid: 't6s7hp8k',
                    tilhorendeFagsaksid: 'q8mlv7u2',
                    baksystem: [Baksystem.Gsak, Baksystem.Kodeverk],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: false,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: Feilmelding.Sikkerhetsbegrensning }
                },
                {
                    id: 'odiio5ou',
                    retning: Kommunikasjonsretning.Intern,
                    dato: '2018-12-05T05:29:17.000',
                    lestDato: null,
                    navn: 'Madeleine',
                    journalpostId: 'jnrrue6e',
                    hoveddokument: {
                        tittel: 'Vurdering feilutbetaling/revurdering',
                        dokumentreferanse: '7rtstmj8',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [],
                    avsender: Entitet.EksternPart,
                    mottaker: Entitet.EksternPart,
                    tilhorendeSaksid: 'lzp1rij0',
                    tilhorendeFagsaksid: '7181o3jv',
                    baksystem: [Baksystem.Henvendelse],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: true, feilmelding: Feilmelding.Sikkerhetsbegrensning }
                },
                {
                    id: 'qsoer38m',
                    retning: Kommunikasjonsretning.Inn,
                    dato: '2017-02-10T10:01:25.000',
                    lestDato: null,
                    navn: 'Kristine',
                    journalpostId: 'kty2aa9i',
                    hoveddokument: {
                        tittel: 'Innhenting av opplysninger',
                        dokumentreferanse: '5a2gc968',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.Nav,
                    tilhorendeSaksid: '503bv8q8',
                    tilhorendeFagsaksid: 'z0vfuifa',
                    baksystem: [Baksystem.Aktoer, Baksystem.Henvendelse],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: true,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: Feilmelding.Sikkerhetsbegrensning }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'SYK',
                    saksid: 'c4j73hvy',
                    fagsaksnummer: 'ujowhsfk',
                    avsluttet: '2018-02-15T16:34:56.000',
                    fagsystem: '2cjjq',
                    baksystem: Baksystem.Aktoer
                },
                {
                    temakode: 'SYK',
                    saksid: 'uncyau83',
                    fagsaksnummer: 'q2w4to5b',
                    avsluttet: '2016-09-01T16:22.56.000',
                    fagsystem: 'q8luy',
                    baksystem: Baksystem.SakOgBehandling
                },
                {
                    temakode: 'SYK',
                    saksid: '2x49ix4k',
                    fagsaksnummer: 'i0mue5po',
                    avsluttet: '2017-09-0419:10:16.000',
                    fagsystem: '8gpzp',
                    baksystem: Baksystem.Gsak
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
                    retning: Kommunikasjonsretning.Ut,
                    dato: '2017-07-27T14:45:32.000',
                    lestDato: new Date('2017-07-27').toISOString(),
                    navn: 'Eline',
                    journalpostId: 'fg1w15sz',
                    hoveddokument: {
                        tittel: 'Spørsmål via nav.no',
                        dokumentreferanse: 'nvqxc1ip',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.Nav,
                    tilhorendeSaksid: 'bj6vyby0',
                    tilhorendeFagsaksid: 'huuael8f',
                    baksystem: [Baksystem.Pesys],
                    temakode: 'AAP',
                    temakodeVisning: 'Arbeidsavklaringspenger',
                    ettersending: false,
                    erJournalfort: true,
                    feil: { inneholderFeil: false, feilmelding: null }
                },
                {
                    id: '44i6gvf6',
                    retning: Kommunikasjonsretning.Inn,
                    dato: '2018-03-18T11:27:29.000',
                    lestDato: null,
                    navn: 'Thea',
                    journalpostId: 'etcoicxr',
                    hoveddokument: {
                        tittel: 'Inntektsopplysninger',
                        dokumentreferanse: 'q90p8dnw',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: 'fbp2nc3l',
                            kanVises: false,
                            logiskDokument: false,
                            skjerming: 'Skjerming',
                            dokumentStatus: null
                        },
                        {
                            tittel: 'Referat fra samtale på telefon',
                            dokumentreferanse: 'x2njhynn',
                            kanVises: true,
                            logiskDokument: false,
                            skjerming: null,
                            dokumentStatus: null
                        },
                        {
                            tittel: 'Vedtak korrigert refusjon/u bet',
                            dokumentreferanse: 'prrweqli',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null,
                            dokumentStatus: null
                        }
                    ],
                    avsender: Entitet.EksternPart,
                    mottaker: Entitet.Nav,
                    tilhorendeSaksid: 'azc4yf8p',
                    tilhorendeFagsaksid: '4g9b0ecf',
                    baksystem: [Baksystem.Aktoer, Baksystem.Joark],
                    temakode: 'AAP',
                    temakodeVisning: 'Arbeidsavklaringspenger',
                    ettersending: true,
                    erJournalfort: false,
                    feil: { inneholderFeil: false, feilmelding: null }
                },
                {
                    id: '9mwcks8v',
                    retning: Kommunikasjonsretning.Intern,
                    dato: '2017-03-17T09:21:37.000',
                    lestDato: null,
                    navn: 'Mari',
                    journalpostId: 'o5z5pcse',
                    hoveddokument: {
                        tittel: 'Automatisk vedtak/nyfødt barn',
                        dokumentreferanse: 'me3wv1le',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: '2whugwip',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null,
                            dokumentStatus: DokumentStatus.KASSERT
                        }
                    ],
                    avsender: Entitet.Nav,
                    mottaker: Entitet.Nav,
                    tilhorendeSaksid: 'fsnziur5',
                    tilhorendeFagsaksid: 'chsgwugz',
                    baksystem: [Baksystem.Aktoer, Baksystem.Joark],
                    temakode: 'AAP',
                    temakodeVisning: 'Arbeidsavklaringspenger',
                    ettersending: false,
                    erJournalfort: true,
                    feil: { inneholderFeil: false, feilmelding: null }
                },
                {
                    id: 'uja0czql',
                    retning: Kommunikasjonsretning.Inn,
                    dato: '2016-11-15T12:05:27.000',
                    lestDato: null,
                    navn: 'Sebastian',
                    journalpostId: 'aamyoz7n',
                    hoveddokument: {
                        tittel: 'Innhenting av opplysninger',
                        dokumentreferanse: 'mt1cssx0',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Nav,
                    mottaker: Entitet.Nav,
                    tilhorendeSaksid: 'woy1bipx',
                    tilhorendeFagsaksid: 'j6odo6im',
                    baksystem: [Baksystem.Joark],
                    temakode: 'AAP',
                    temakodeVisning: 'Arbeidsavklaringspenger',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false, feilmelding: null }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'AAP',
                    saksid: 'dgc6rbip',
                    fagsaksnummer: 'zm2q8yyw',
                    avsluttet: '2018-01-03T07:09:52.000',
                    fagsystem: '4xzex',
                    baksystem: Baksystem.Aktoer
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
                    retning: Kommunikasjonsretning.Intern,
                    dato: '2016-05-15T12:34:31.000',
                    lestDato: null,
                    navn: 'Håkon',
                    journalpostId: 'cmlub095',
                    hoveddokument: {
                        tittel: 'Referat fra samtale på telefon',
                        dokumentreferanse: 'nnp1em30',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Nav,
                    mottaker: Entitet.Sluttbruker,
                    tilhorendeSaksid: 'm3yg0ll4',
                    tilhorendeFagsaksid: 'seeuzleo',
                    baksystem: [Baksystem.Kodeverk, Baksystem.JoarkSikkerhetsbegrensning, Baksystem.Pesys],
                    temakode: 'BAR',
                    temakodeVisning: 'Barnetrygd',
                    ettersending: true,
                    erJournalfort: false,
                    feil: { inneholderFeil: false, feilmelding: null }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'BAR',
                    saksid: '4dsigvke',
                    fagsaksnummer: 'tflo5g8a',
                    avsluttet: '2017-01-17T23:58:28.000',
                    fagsystem: '4u65t',
                    baksystem: Baksystem.JoarkSikkerhetsbegrensning
                },
                {
                    temakode: 'BAR',
                    saksid: 'uk9z1jev',
                    fagsaksnummer: 'w4llob8j',
                    avsluttet: '2016-09-14T17:36:32.000',
                    fagsystem: 'm0z6n',
                    baksystem: Baksystem.Kodeverk
                },
                {
                    temakode: 'BAR',
                    saksid: 'w77q6jll',
                    fagsaksnummer: '0kczk4gb',
                    avsluttet: '2018-09-09T09:41:06.000',
                    fagsystem: 'ehpxy',
                    baksystem: Baksystem.JoarkSikkerhetsbegrensning
                },
                {
                    temakode: 'BAR',
                    saksid: 'wlkv3uqg',
                    fagsaksnummer: 'r5f2u28o',
                    avsluttet: '2016-07-17T19:35:55.000',
                    fagsystem: 's6pl5',
                    baksystem: Baksystem.Henvendelse
                },
                {
                    temakode: 'BAR',
                    saksid: 'mbopmq2u',
                    fagsaksnummer: 'zj2fs3bp',
                    avsluttet: '2018-03-08T09.45:41.000',
                    fagsystem: 'wlvkm',
                    baksystem: Baksystem.Henvendelse
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
                    retning: Kommunikasjonsretning.Ut,
                    dato: '2016-12-26T07:44:01.000',
                    lestDato: new Date('2016-07-27').toISOString(),
                    navn: 'Noah',
                    journalpostId: 'fhtkfp66',
                    hoveddokument: {
                        tittel: 'Vurdering feilutbetaling/revurdering',
                        dokumentreferanse: 'bjol9s20',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [],
                    avsender: Entitet.EksternPart,
                    mottaker: Entitet.EksternPart,
                    tilhorendeSaksid: 'qpdwqelr',
                    tilhorendeFagsaksid: 'xlseaqei',
                    baksystem: [Baksystem.Aktoer],
                    temakode: 'IND',
                    temakodeVisning: 'Tiltakspenger',
                    ettersending: false,
                    erJournalfort: true,
                    feil: { inneholderFeil: true, feilmelding: Feilmelding.JournalfortAnnetTema }
                },
                {
                    id: 'ean9mtio',
                    retning: Kommunikasjonsretning.Ut,
                    dato: '2016-12-19T02:27:07.000',
                    lestDato: new Date('2016-07-27').toISOString(),
                    navn: 'Mats',
                    journalpostId: 's9765sz0',
                    hoveddokument: {
                        tittel: 'Spørsmål via nav.no',
                        dokumentreferanse: '113wxk3r',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.Ukjent,
                    tilhorendeSaksid: 'sdbr0fbp',
                    tilhorendeFagsaksid: 'chqjww4b',
                    baksystem: [Baksystem.PdfKonvertering, Baksystem.Aktoer],
                    temakode: 'IND',
                    temakodeVisning: 'Tiltakspenger',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false, feilmelding: null }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'IND',
                    saksid: '7sw3ysfd',
                    fagsaksnummer: 'cysvzyxl',
                    avsluttet: '2017-01-16T04:06:17.000',
                    fagsystem: 'krpqj',
                    baksystem: Baksystem.Joark
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
                    retning: Kommunikasjonsretning.Intern,
                    dato: '2017-11-21T17:15:34.000',
                    lestDato: null,
                    navn: 'Maren',
                    journalpostId: 'lidtmy7n',
                    hoveddokument: {
                        tittel: 'Spørsmål via nav.no',
                        dokumentreferanse: '4asiwin3',
                        kanVises: false,
                        logiskDokument: false,
                        skjerming: 'POL',
                        dokumentStatus: DokumentStatus.KASSERT
                    },
                    vedlegg: [
                        {
                            tittel: 'Spørsmål via nav.no',
                            dokumentreferanse: '428dwf43',
                            kanVises: true,
                            logiskDokument: false,
                            skjerming: null,
                            dokumentStatus: null
                        },
                        {
                            tittel: 'Innhenting av opplysninger',
                            dokumentreferanse: 'sw0rma45',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null,
                            dokumentStatus: null
                        },
                        {
                            tittel: 'Spørsmål via nav.no',
                            dokumentreferanse: 'tdxt2vie',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null,
                            dokumentStatus: null
                        }
                    ],
                    avsender: Entitet.EksternPart,
                    mottaker: Entitet.Nav,
                    tilhorendeSaksid: 'ocrn83pf',
                    tilhorendeFagsaksid: '53kj7i18',
                    baksystem: [Baksystem.JoarkSikkerhetsbegrensning, Baksystem.SakOgBehandling],
                    temakode: 'GEN',
                    temakodeVisning: 'Generell',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false, feilmelding: null }
                },
                {
                    id: 'v2l20frr',
                    retning: Kommunikasjonsretning.Intern,
                    dato: '2016-03-12T08:04:34.000',
                    lestDato: null,
                    navn: 'Jonathan',
                    journalpostId: 'ai9t2h2n',
                    hoveddokument: {
                        tittel: 'A-inntekt',
                        dokumentreferanse: 'gplzp0ho',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.Sluttbruker,
                    tilhorendeSaksid: '50ly1k4j',
                    tilhorendeFagsaksid: 'd4zxe6cm',
                    baksystem: [Baksystem.SakOgBehandling],
                    temakode: 'GEN',
                    temakodeVisning: 'Generell',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false, feilmelding: null }
                },
                {
                    id: 'cjfcu3p7',
                    retning: Kommunikasjonsretning.Inn,
                    dato: '2016-05-24T06:39:41.000',
                    lestDato: null,
                    navn: 'Martine',
                    journalpostId: 'wgh1hlqa',
                    hoveddokument: {
                        tittel: 'Referat fra samtale på telefon',
                        dokumentreferanse: 'zochf067',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null,
                        dokumentStatus: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.EksternPart,
                    tilhorendeSaksid: '6299d3c8',
                    tilhorendeFagsaksid: 'ti2t0c00',
                    baksystem: [Baksystem.Pesys, Baksystem.Joark],
                    temakode: 'GEN',
                    temakodeVisning: 'Generell',
                    ettersending: false,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: Feilmelding.Sikkerhetsbegrensning }
                }
            ],
            tilhorendeSaker: [
                {
                    temakode: 'GEN',
                    saksid: 'iyc5xe1f',
                    fagsaksnummer: '8qj6vuv6',
                    avsluttet: '2016-01-18T11:25:19.000',
                    fagsystem: 'yaacv',
                    baksystem: Baksystem.SakOgBehandling
                },
                {
                    temakode: 'GEN',
                    saksid: 'bun0w6u9',
                    fagsaksnummer: 'y3a6y58z',
                    avsluttet: '2018-06-14T17:34:22.000',
                    fagsystem: 'u24f2',
                    baksystem: Baksystem.Gsak
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
