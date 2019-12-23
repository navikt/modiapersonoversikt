import { Behandlingsstatus, Sakstema } from '../../models/saksoversikt/sakstema';
import { Entitet, Feilmelding, Kommunikasjonsretning } from '../../models/saksoversikt/journalpost';
import { Baksystem } from '../../models/saksoversikt/fellesSak';

export function getAremarkSakstemaListe(): Sakstema[] {
    return [
        {
            harTilgang: false,
            temakode: 'SYK',
            temanavn: 'Sykepenger',
            erGruppert: false,
            behandlingskjeder: [
                {
                    status: Behandlingsstatus.UnderBehandling,
                    sistOppdatert: { år: 2018, måned: 12, dag: 24, time: 14, minutt: 24, sekund: 51 }
                }
            ],
            journalPoster: [
                {
                    id: 'u9fcztqt',
                    retning: Kommunikasjonsretning.Intern,
                    dato: { år: 2018, måned: 8, dag: 3, time: 17, minutt: 11, sekund: 8 },
                    navn: 'Silje',
                    journalpostId: 'yna3blpi',
                    hoveddokument: {
                        tittel: 'Innhenting av opplysninger',
                        dokumentreferanse: '77tn8ir0',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: 'u87cu54s',
                            kanVises: false,
                            logiskDokument: true,
                            skjerming: null
                        },
                        {
                            tittel: 'Spørsmål via nav.no',
                            dokumentreferanse: '1s9k5q9y',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null
                        },
                        {
                            tittel: 'Inntektsopplysninger',
                            dokumentreferanse: '113o8et1',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null
                        }
                    ],
                    avsender: Entitet.Sluttbruker,
                    mottaker: Entitet.Sluttbruker,
                    tilhørendeSaksid: 'i5v4pekn',
                    tilhørendeFagsaksid: '40xxap7t',
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
                    dato: { år: 2017, måned: 2, dag: 28, time: 23, minutt: 50, sekund: 24 },
                    navn: 'Benjamin',
                    journalpostId: 'h6p0iy3l',
                    hoveddokument: {
                        tittel: 'Inntektsopplysninger',
                        dokumentreferanse: '15pdmh42',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: 'k51y90us',
                            kanVises: true,
                            logiskDokument: false,
                            skjerming: null
                        }
                    ],
                    avsender: Entitet.Sluttbruker,
                    mottaker: Entitet.EksternPart,
                    tilhørendeSaksid: 't6s7hp8k',
                    tilhørendeFagsaksid: 'q8mlv7u2',
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
                    dato: { år: 2018, måned: 12, dag: 5, time: 5, minutt: 29, sekund: 17 },
                    navn: 'Madeleine',
                    journalpostId: 'jnrrue6e',
                    hoveddokument: {
                        tittel: 'Vurdering feilutbetaling/revurdering',
                        dokumentreferanse: '7rtstmj8',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null
                    },
                    vedlegg: [],
                    avsender: Entitet.EksternPart,
                    mottaker: Entitet.EksternPart,
                    tilhørendeSaksid: 'lzp1rij0',
                    tilhørendeFagsaksid: '7181o3jv',
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
                    dato: { år: 2017, måned: 2, dag: 10, time: 10, minutt: 1, sekund: 25 },
                    navn: 'Kristine',
                    journalpostId: 'kty2aa9i',
                    hoveddokument: {
                        tittel: 'Innhenting av opplysninger',
                        dokumentreferanse: '5a2gc968',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.Nav,
                    tilhørendeSaksid: '503bv8q8',
                    tilhørendeFagsaksid: 'z0vfuifa',
                    baksystem: [Baksystem.Aktoer, Baksystem.Henvendelse],
                    temakode: 'SYK',
                    temakodeVisning: 'Sykepenger',
                    ettersending: true,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: Feilmelding.Sikkerhetsbegrensning }
                }
            ],
            tilhørendeSaker: [
                {
                    temakode: 'SYK',
                    saksid: 'c4j73hvy',
                    fagsaksnummer: 'ujowhsfk',
                    avsluttet: { år: 2018, måned: 2, dag: 15, time: 16, minutt: 34, sekund: 56 },
                    fagsystem: '2cjjq',
                    baksystem: Baksystem.Aktoer
                },
                {
                    temakode: 'SYK',
                    saksid: 'uncyau83',
                    fagsaksnummer: 'q2w4to5b',
                    avsluttet: { år: 2016, måned: 9, dag: 1, time: 16, minutt: 22, sekund: 56 },
                    fagsystem: 'q8luy',
                    baksystem: Baksystem.SakOgBehandling
                },
                {
                    temakode: 'SYK',
                    saksid: '2x49ix4k',
                    fagsaksnummer: 'i0mue5po',
                    avsluttet: { år: 2017, måned: 9, dag: 4, time: 19, minutt: 10, sekund: 16 },
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
            behandlingskjeder: [
                {
                    status: Behandlingsstatus.UnderBehandling,
                    sistOppdatert: { år: 2018, måned: 6, dag: 25, time: 6, minutt: 23, sekund: 38 }
                },
                {
                    status: Behandlingsstatus.FerdigBehandlet,
                    sistOppdatert: { år: 2017, måned: 2, dag: 4, time: 3, minutt: 51, sekund: 49 }
                },
                {
                    status: Behandlingsstatus.FerdigBehandlet,
                    sistOppdatert: { år: 2016, måned: 5, dag: 20, time: 9, minutt: 36, sekund: 9 }
                }
            ],
            journalPoster: [
                {
                    id: 'wdxbl8gq',
                    retning: Kommunikasjonsretning.Ut,
                    dato: { år: 2017, måned: 7, dag: 27, time: 14, minutt: 45, sekund: 32 },
                    navn: 'Eline',
                    journalpostId: 'fg1w15sz',
                    hoveddokument: {
                        tittel: 'Spørsmål via nav.no',
                        dokumentreferanse: 'nvqxc1ip',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.Nav,
                    tilhørendeSaksid: 'bj6vyby0',
                    tilhørendeFagsaksid: 'huuael8f',
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
                    dato: { år: 2018, måned: 3, dag: 18, time: 11, minutt: 27, sekund: 29 },
                    navn: 'Thea',
                    journalpostId: 'etcoicxr',
                    hoveddokument: {
                        tittel: 'Inntektsopplysninger',
                        dokumentreferanse: 'q90p8dnw',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: 'fbp2nc3l',
                            kanVises: false,
                            logiskDokument: false,
                            skjerming: 'Skjerming'
                        },
                        {
                            tittel: 'Referat fra samtale på telefon',
                            dokumentreferanse: 'x2njhynn',
                            kanVises: true,
                            logiskDokument: false,
                            skjerming: null
                        },
                        {
                            tittel: 'Vedtak korrigert refusjon/u bet',
                            dokumentreferanse: 'prrweqli',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null
                        }
                    ],
                    avsender: Entitet.EksternPart,
                    mottaker: Entitet.Nav,
                    tilhørendeSaksid: 'azc4yf8p',
                    tilhørendeFagsaksid: '4g9b0ecf',
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
                    dato: { år: 2017, måned: 3, dag: 17, time: 9, minutt: 21, sekund: 37 },
                    navn: 'Mari',
                    journalpostId: 'o5z5pcse',
                    hoveddokument: {
                        tittel: 'Automatisk vedtak/nyfødt barn',
                        dokumentreferanse: 'me3wv1le',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null
                    },
                    vedlegg: [
                        {
                            tittel: 'A-inntekt',
                            dokumentreferanse: '2whugwip',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null
                        }
                    ],
                    avsender: Entitet.Nav,
                    mottaker: Entitet.Nav,
                    tilhørendeSaksid: 'fsnziur5',
                    tilhørendeFagsaksid: 'chsgwugz',
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
                    dato: { år: 2016, måned: 11, dag: 15, time: 12, minutt: 5, sekund: 27 },
                    navn: 'Sebastian',
                    journalpostId: 'aamyoz7n',
                    hoveddokument: {
                        tittel: 'Innhenting av opplysninger',
                        dokumentreferanse: 'mt1cssx0',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Nav,
                    mottaker: Entitet.Nav,
                    tilhørendeSaksid: 'woy1bipx',
                    tilhørendeFagsaksid: 'j6odo6im',
                    baksystem: [Baksystem.Joark],
                    temakode: 'AAP',
                    temakodeVisning: 'Arbeidsavklaringspenger',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false, feilmelding: null }
                }
            ],
            tilhørendeSaker: [
                {
                    temakode: 'AAP',
                    saksid: 'dgc6rbip',
                    fagsaksnummer: 'zm2q8yyw',
                    avsluttet: { år: 2018, måned: 11, dag: 3, time: 7, minutt: 9, sekund: 52 },
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
            behandlingskjeder: [
                {
                    status: Behandlingsstatus.Avbrutt,
                    sistOppdatert: { år: 2018, måned: 3, dag: 20, time: 19, minutt: 27, sekund: 45 }
                }
            ],
            journalPoster: [
                {
                    id: '03fmouny',
                    retning: Kommunikasjonsretning.Intern,
                    dato: { år: 2016, måned: 5, dag: 15, time: 12, minutt: 34, sekund: 31 },
                    navn: 'Håkon',
                    journalpostId: 'cmlub095',
                    hoveddokument: {
                        tittel: 'Referat fra samtale på telefon',
                        dokumentreferanse: 'nnp1em30',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Nav,
                    mottaker: Entitet.Sluttbruker,
                    tilhørendeSaksid: 'm3yg0ll4',
                    tilhørendeFagsaksid: 'seeuzleo',
                    baksystem: [Baksystem.Kodeverk, Baksystem.JoarkSikkerhetsbegrensning, Baksystem.Pesys],
                    temakode: 'BAR',
                    temakodeVisning: 'Barnetrygd',
                    ettersending: true,
                    erJournalfort: false,
                    feil: { inneholderFeil: false, feilmelding: null }
                }
            ],
            tilhørendeSaker: [
                {
                    temakode: 'BAR',
                    saksid: '4dsigvke',
                    fagsaksnummer: 'tflo5g8a',
                    avsluttet: { år: 2017, måned: 1, dag: 17, time: 23, minutt: 58, sekund: 28 },
                    fagsystem: '4u65t',
                    baksystem: Baksystem.JoarkSikkerhetsbegrensning
                },
                {
                    temakode: 'BAR',
                    saksid: 'uk9z1jev',
                    fagsaksnummer: 'w4llob8j',
                    avsluttet: { år: 2016, måned: 9, dag: 14, time: 17, minutt: 36, sekund: 32 },
                    fagsystem: 'm0z6n',
                    baksystem: Baksystem.Kodeverk
                },
                {
                    temakode: 'BAR',
                    saksid: 'w77q6jll',
                    fagsaksnummer: '0kczk4gb',
                    avsluttet: { år: 2018, måned: 9, dag: 9, time: 9, minutt: 41, sekund: 6 },
                    fagsystem: 'ehpxy',
                    baksystem: Baksystem.JoarkSikkerhetsbegrensning
                },
                {
                    temakode: 'BAR',
                    saksid: 'wlkv3uqg',
                    fagsaksnummer: 'r5f2u28o',
                    avsluttet: { år: 2016, måned: 7, dag: 17, time: 19, minutt: 35, sekund: 55 },
                    fagsystem: 's6pl5',
                    baksystem: Baksystem.Henvendelse
                },
                {
                    temakode: 'BAR',
                    saksid: 'mbopmq2u',
                    fagsaksnummer: 'zj2fs3bp',
                    avsluttet: { år: 2018, måned: 3, dag: 8, time: 7, minutt: 45, sekund: 41 },
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
            behandlingskjeder: [
                {
                    status: Behandlingsstatus.UnderBehandling,
                    sistOppdatert: { år: 2018, måned: 1, dag: 14, time: 3, minutt: 43, sekund: 31 }
                }
            ],
            journalPoster: [
                {
                    id: '1ml24a5l',
                    retning: Kommunikasjonsretning.Ut,
                    dato: { år: 2016, måned: 12, dag: 26, time: 7, minutt: 44, sekund: 1 },
                    navn: 'Noah',
                    journalpostId: 'fhtkfp66',
                    hoveddokument: {
                        tittel: 'Vurdering feilutbetaling/revurdering',
                        dokumentreferanse: 'bjol9s20',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null
                    },
                    vedlegg: [],
                    avsender: Entitet.EksternPart,
                    mottaker: Entitet.EksternPart,
                    tilhørendeSaksid: 'qpdwqelr',
                    tilhørendeFagsaksid: 'xlseaqei',
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
                    dato: { år: 2016, måned: 12, dag: 19, time: 2, minutt: 27, sekund: 7 },
                    navn: 'Mats',
                    journalpostId: 's9765sz0',
                    hoveddokument: {
                        tittel: 'Spørsmål via nav.no',
                        dokumentreferanse: '113wxk3r',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.Ukjent,
                    tilhørendeSaksid: 'sdbr0fbp',
                    tilhørendeFagsaksid: 'chqjww4b',
                    baksystem: [Baksystem.PdfKonvertering, Baksystem.Aktoer],
                    temakode: 'IND',
                    temakodeVisning: 'Tiltakspenger',
                    ettersending: true,
                    erJournalfort: true,
                    feil: { inneholderFeil: false, feilmelding: null }
                }
            ],
            tilhørendeSaker: [
                {
                    temakode: 'IND',
                    saksid: '7sw3ysfd',
                    fagsaksnummer: 'cysvzyxl',
                    avsluttet: { år: 2017, måned: 1, dag: 16, time: 4, minutt: 6, sekund: 17 },
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
            behandlingskjeder: [],
            journalPoster: [
                {
                    id: 'afp4donc',
                    retning: Kommunikasjonsretning.Intern,
                    dato: { år: 2017, måned: 11, dag: 21, time: 17, minutt: 15, sekund: 34 },
                    navn: 'Maren',
                    journalpostId: 'lidtmy7n',
                    hoveddokument: {
                        tittel: 'Spørsmål via nav.no',
                        dokumentreferanse: '4asiwin3',
                        kanVises: false,
                        logiskDokument: false,
                        skjerming: 'POL'
                    },
                    vedlegg: [
                        {
                            tittel: 'Spørsmål via nav.no',
                            dokumentreferanse: '428dwf43',
                            kanVises: true,
                            logiskDokument: false,
                            skjerming: null
                        },
                        {
                            tittel: 'Innhenting av opplysninger',
                            dokumentreferanse: 'sw0rma45',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null
                        },
                        {
                            tittel: 'Spørsmål via nav.no',
                            dokumentreferanse: 'tdxt2vie',
                            kanVises: true,
                            logiskDokument: true,
                            skjerming: null
                        }
                    ],
                    avsender: Entitet.EksternPart,
                    mottaker: Entitet.Nav,
                    tilhørendeSaksid: 'ocrn83pf',
                    tilhørendeFagsaksid: '53kj7i18',
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
                    dato: { år: 2016, måned: 3, dag: 12, time: 8, minutt: 4, sekund: 34 },
                    navn: 'Jonathan',
                    journalpostId: 'ai9t2h2n',
                    hoveddokument: {
                        tittel: 'A-inntekt',
                        dokumentreferanse: 'gplzp0ho',
                        kanVises: true,
                        logiskDokument: true,
                        skjerming: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.Sluttbruker,
                    tilhørendeSaksid: '50ly1k4j',
                    tilhørendeFagsaksid: 'd4zxe6cm',
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
                    dato: { år: 2016, måned: 5, dag: 24, time: 6, minutt: 39, sekund: 41 },
                    navn: 'Martine',
                    journalpostId: 'wgh1hlqa',
                    hoveddokument: {
                        tittel: 'Referat fra samtale på telefon',
                        dokumentreferanse: 'zochf067',
                        kanVises: true,
                        logiskDokument: false,
                        skjerming: null
                    },
                    vedlegg: [],
                    avsender: Entitet.Ukjent,
                    mottaker: Entitet.EksternPart,
                    tilhørendeSaksid: '6299d3c8',
                    tilhørendeFagsaksid: 'ti2t0c00',
                    baksystem: [Baksystem.Pesys, Baksystem.Joark],
                    temakode: 'GEN',
                    temakodeVisning: 'Generell',
                    ettersending: false,
                    erJournalfort: false,
                    feil: { inneholderFeil: true, feilmelding: Feilmelding.Sikkerhetsbegrensning }
                }
            ],
            tilhørendeSaker: [
                {
                    temakode: 'GEN',
                    saksid: 'iyc5xe1f',
                    fagsaksnummer: '8qj6vuv6',
                    avsluttet: { år: 2016, måned: 1, dag: 18, time: 11, minutt: 25, sekund: 19 },
                    fagsystem: 'yaacv',
                    baksystem: Baksystem.SakOgBehandling
                },
                {
                    temakode: 'GEN',
                    saksid: 'bun0w6u9',
                    fagsaksnummer: 'y3a6y58z',
                    avsluttet: { år: 2018, måned: 6, dag: 14, time: 17, minutt: 34, sekund: 22 },
                    fagsystem: 'u24f2',
                    baksystem: Baksystem.Gsak
                }
            ],
            feilkoder: []
        }
    ];
}
