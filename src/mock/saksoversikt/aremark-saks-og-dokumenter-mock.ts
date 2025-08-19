import {
    DokumentDokumentStatus,
    DokumentmetadataAvsender,
    DokumentmetadataBaksystem,
    DokumentmetadataMottaker,
    DokumentmetadataRetning,
    ResultatSaksDokumenterFeilendeSystemer,
    SaksDokumenterBaksystem,
    SaksDokumenterFeilendeSystemer
} from 'src/generated/modiapersonoversikt-api';

export const getAremarkSaksOgDokumenterListe = () => {
    return {
        saker: [
            {
                temakode: 'MED',
                temanavn: 'Medlemskap',
                saksid: '140261828',

                tilhorendeDokumenter: [
                    {
                        id: 'b591a83e-d673-48ff-8fd0-19a6633171d8',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-03-24T00:30:06',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453977012',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454381764',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140261828',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'MED',
                        temakodeVisning: 'Medlemskap',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '031b6e8e-d334-413f-9071-372e3a9e61c2',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-19T14:16:25',

                        navn: 'SEDAT SLØVENDE MULDVARP',
                        journalpostId: '453649830',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454031676',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140261828',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'MED',
                        temakodeVisning: 'Medlemskap',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '029948a5-0c08-4d6f-a01d-75a94a72df9e',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2019-02-11T00:00:00',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453506779',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '453885932',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140261828',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'MED',
                        temakodeVisning: 'Medlemskap',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2020-09-21T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: [SaksDokumenterFeilendeSystemer.KODEVERK]
            },
            {
                temakode: 'MOB',
                temanavn: 'Mobilitetsfremmende stønad',
                saksid: '140261829',

                tilhorendeDokumenter: [],

                opprettet: '2020-09-21T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'STO',
                temanavn: 'Regnskap/utbetaling',
                saksid: '140261830',

                tilhorendeDokumenter: [
                    {
                        id: 'f285238f-acfa-4d9e-a43c-9e4b6c9f1ce1',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-02-09T14:16:11',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453860078',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454253334',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140261830',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'STO',
                        temakodeVisning: 'Regnskap/utbetaling/årsoppgave',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '57988a10-17ec-4caf-b4bd-75fae1a517c1',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2022-11-07T11:43:49',

                        navn: 'ukjent',
                        journalpostId: '453819377',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454203319',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140261830',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'STO',
                        temakodeVisning: 'Regnskap/utbetaling/årsoppgave',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2ab39a82-61ec-48dc-b740-1704eb34a7a7',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2022-11-04T11:44:19',

                        navn: 'ukjent',
                        journalpostId: '453819320',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454203270',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140261830',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'STO',
                        temakodeVisning: 'Regnskap/utbetaling/årsoppgave',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2020-09-21T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'REH',
                temanavn: 'Rehabilitering',
                saksid: '140261831',

                tilhorendeDokumenter: [],

                opprettet: '2020-09-21T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'RVE',
                temanavn: 'Rettferdsvederlag',
                saksid: '140261832',

                tilhorendeDokumenter: [],

                opprettet: '2020-09-21T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'RPO',
                temanavn: 'Retting av personopplysninger',
                saksid: '140261833',

                tilhorendeDokumenter: [
                    {
                        id: 'cc066c0b-a85e-4224-9048-41b40e7d4b8a',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-09-04T14:37:33',

                        navn: 'VAKKER FASTTELEFONI',
                        journalpostId: '453887321',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454280980',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140261833',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'RPO',
                        temakodeVisning: 'Retting av personopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2020-09-21T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'SUP',
                temanavn: 'Supplerende stønad',
                saksid: '140262550',

                tilhorendeDokumenter: [],

                opprettet: '2020-11-03T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'TSR',
                temanavn: 'Tilleggsstønad arbeidssøkere',
                saksid: '140263466',

                tilhorendeDokumenter: [],

                opprettet: '2020-12-09T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ERS',
                temanavn: 'Erstatning',
                saksid: '140263821',
                fagsaksnummer: '0331A03',
                tilhorendeDokumenter: [
                    {
                        id: 'd82e9e4c-03f6-471c-a9bf-811d6acb58a4',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2025-06-21T00:30:26',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453998253',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454405933',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140263821',
                        tilhorendeFagsaksid: '0331A03',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ERS',
                        temakodeVisning: 'Erstatning',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd4c88d73-2eeb-4ca5-9c08-fbc119f96fe7',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-06-13T13:58:56',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453996560',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454404032',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140263821',
                        tilhorendeFagsaksid: '0331A03',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ERS',
                        temakodeVisning: 'Erstatning',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c193cf69-f940-46b7-b734-49ae60f6c6e8',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T14:51:07',

                        navn: 'NISSÉ RIMELIG',
                        journalpostId: '453901826',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454302214',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454302215',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454302216',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140263821',
                        tilhorendeFagsaksid: '0331A03',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ERS',
                        temakodeVisning: 'Erstatning',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8015c1be-c3e8-4306-b97f-d87b0023d2df',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-11-09T14:25:03',

                        navn: 'TØFFELDYR DØLL',
                        journalpostId: '453641871',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454017473',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140263821',
                        tilhorendeFagsaksid: '0331A03',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ERS',
                        temakodeVisning: 'Erstatning',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2020-12-18T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ENF',
                temanavn: 'Enslig mor eller far',
                saksid: '140264328',
                fagsaksnummer: '3014A12',
                tilhorendeDokumenter: [
                    {
                        id: '26bef0e8-8ce1-4904-bba8-64495e08b62f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-01-06T12:15:20',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453641937',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454022972',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140264328',
                        tilhorendeFagsaksid: '3014A12',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ENF',
                        temakodeVisning: 'Enslig mor eller far',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-01-06T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ENF',
                temanavn: 'Enslig mor eller far',
                saksid: '140264521',
                fagsaksnummer: '110',
                tilhorendeDokumenter: [
                    {
                        id: '71b51ddc-01f7-4721-be66-0c87c3708783',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2025-01-06T09:57:39',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453913026',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454314343',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140264521',
                        tilhorendeFagsaksid: '110',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ENF',
                        temakodeVisning: 'Enslig mor eller far',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '78294410-a7ca-4a1d-a9dd-15a3e3a1ff20',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-09-15T15:57:19',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453631203',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454011060',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140264521',
                        tilhorendeFagsaksid: '110',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ENF',
                        temakodeVisning: 'Enslig mor eller far',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '960c76c6-83a5-469a-b6ab-a9e0958614cc',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-08-28T13:29:08',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453629372',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454009014',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140264521',
                        tilhorendeFagsaksid: '110',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ENF',
                        temakodeVisning: 'Enslig mor eller far',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-01-11T00:00:00',
                fagsystem: 'EF',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'TRK',
                temanavn: 'Trekkhåndtering',
                saksid: '140266547',

                tilhorendeDokumenter: [],

                opprettet: '2021-02-26T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'SAP',
                temanavn: 'Sanksjon - Person',
                saksid: '140266805',

                tilhorendeDokumenter: [],

                opprettet: '2021-03-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'YRA',
                temanavn: 'Yrkesrettet attføring',
                saksid: '140266806',

                tilhorendeDokumenter: [],

                opprettet: '2021-03-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ENF',
                temanavn: 'Enslig mor eller far',
                saksid: '140267588',
                fagsaksnummer: '376',
                tilhorendeDokumenter: [
                    {
                        id: 'd29e409c-2720-4f2d-b1dc-8229d32902c1',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-02T09:58:53',

                        navn: 'ukjent',
                        journalpostId: '453904327',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454304779',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140267588',
                        tilhorendeFagsaksid: '376',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ENF',
                        temakodeVisning: 'Enslig mor eller far',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a6377bbf-e30f-492a-8216-91440564ffb4',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-08-27T15:30:45',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453629292',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454008915',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140267588',
                        tilhorendeFagsaksid: '376',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ENF',
                        temakodeVisning: 'Enslig mor eller far',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-03-17T00:00:00',
                fagsystem: 'EF',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140267820',
                fagsaksnummer: '3014C01',
                tilhorendeDokumenter: [
                    {
                        id: '6d5c2228-dc0f-4536-a1dd-795211c0e3e0',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-14T11:37:48',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453651065',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454033019',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140267820',
                        tilhorendeFagsaksid: '3014C01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '272f5f22-80a9-464e-8a7e-5229e3bb8d92',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-28T13:12:01',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453650283',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454032169',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140267820',
                        tilhorendeFagsaksid: '3014C01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1184f85c-d8da-48be-b553-95678118b540',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2017-09-15T17:52:58',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453495130',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '453874058',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '453874057',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140267820',
                        tilhorendeFagsaksid: '3014C01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-04-03T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'IND',
                temanavn: 'Tiltakspenger',
                saksid: '140268424',
                fagsaksnummer: '11507318',
                tilhorendeDokumenter: [
                    {
                        id: '8a7a2e06-d095-4c7c-8daf-44843861c344',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-09-23T08:37:00',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453656086',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454038626',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            },
                            {
                                tittel: '*****',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140268424',
                        tilhorendeFagsaksid: '11507318',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd254db8a-64f5-4258-9e0f-a4aa3a805a23',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-11T07:55:50',

                        navn: 'null',
                        journalpostId: '453649261',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454031054',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140268424',
                        tilhorendeFagsaksid: '11507318',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-05-10T00:00:00',
                fagsystem: 'AO01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'IND',
                temanavn: 'Tiltakspenger',
                saksid: '140268920',
                fagsaksnummer: 'TEST123',
                tilhorendeDokumenter: [
                    {
                        id: '0dea10f6-21ba-4099-b372-f9a5dd5e47eb',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-21T14:32:59',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453651497',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454033482',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140268920',
                        tilhorendeFagsaksid: 'TEST123',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '974601e0-8c10-4c55-ac64-ff473f4688ae',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-21T14:31:40',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453651496',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454033481',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140268920',
                        tilhorendeFagsaksid: 'TEST123',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '3f6dff02-5d20-47ec-8f7e-5af0e87b6209',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-25T10:38:02',

                        navn: 'null',
                        journalpostId: '453650074',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454031929',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140268920',
                        tilhorendeFagsaksid: 'TEST123',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '94feb1ec-980f-416d-bd24-5a3d9f0b26bb',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-25T09:50:41',

                        navn: 'null',
                        journalpostId: '453650072',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454031927',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140268920',
                        tilhorendeFagsaksid: 'TEST123',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '543f6ee3-8992-4c27-afb3-4a259ea9e0f4',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-08-27T10:21:42',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453629263',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454008886',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140268920',
                        tilhorendeFagsaksid: 'TEST123',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '951a685a-f560-4f54-8132-f2b0417714a1',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-08-27T10:21:41',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453629262',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454008885',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140268920',
                        tilhorendeFagsaksid: 'TEST123',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-05-25T00:00:00',
                fagsystem: 'AO01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'IND',
                temanavn: 'Tiltakspenger',
                saksid: '140269465',
                fagsaksnummer: '1234',
                tilhorendeDokumenter: [
                    {
                        id: '62980634-b06f-4ebf-a00a-c5e5b1d59f2a',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-08-24T12:09:47',

                        navn: 'TESTNAVN',
                        journalpostId: '453654534',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454036832',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140269465',
                        tilhorendeFagsaksid: '1234',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '45414eca-c915-475a-9786-3f206db6a9db',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-10T10:42:56',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453650908',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454032833',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140269465',
                        tilhorendeFagsaksid: '1234',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2cf6bc59-5c27-4e57-b7cd-6b4d3b1d908a',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-10T08:33:06',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453650902',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454032827',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140269465',
                        tilhorendeFagsaksid: '1234',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'IND',
                        temakodeVisning: 'Tiltakspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-06-10T00:00:00',
                fagsystem: 'AO01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd',
                saksid: '140273159',
                fagsaksnummer: '3014D01',
                tilhorendeDokumenter: [
                    {
                        id: '434ead73-2f08-465f-9ecd-4af4de5ba536',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-21T12:18:08',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454002082',
                        hoveddokument: {
                            tittel: 'Pågående samtale med NAV - 21.07.2025 - Barnetrygd',
                            dokumentreferanse: '454410352',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2811cd2c-1509-437a-b3d7-68f2bc4ce66a',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-07-19T00:30:18',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454002034',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 18.07.2025 - Barnetrygd',
                            dokumentreferanse: '454410303',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '5b305041-44cb-4c09-a225-dbfeb9bd3009',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-18T10:29:03',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454001948',
                        hoveddokument: {
                            tittel: 'Pågående samtale med NAV - 18.07.2025 - Barnetrygd',
                            dokumentreferanse: '454410211',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '80c0ac63-ba8e-4cf6-ba5b-99488c091175',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-03-26T08:13:35',

                        navn: 'ukjent',
                        journalpostId: '453978049',
                        hoveddokument: {
                            tittel: 'To dager til juleferie',
                            dokumentreferanse: '454382931',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0d5397b2-7987-4aac-8e81-0732a7d0cd54',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-10-15T14:02:43',

                        navn: 'ukjent',
                        journalpostId: '453891146',
                        hoveddokument: {
                            tittel: 'Barn fikk ikke penger',
                            dokumentreferanse: '454289869',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '28d51ccc-33f2-4a52-b636-38d91f467644',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-08-17T20:01:57',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453859458',
                        hoveddokument: {
                            tittel: 'vedlegg: 1',
                            dokumentreferanse: '454231282',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '608fae8d-ada9-4210-81cc-6d966e7f9c4b',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-06-01T15:37:34',

                        navn: 'ukjent',
                        journalpostId: '453837359',
                        hoveddokument: {
                            tittel: 'tekst2',
                            dokumentreferanse: '454225040',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2e19d809-f54c-4373-9d8a-12b7c189d9c1',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2023-01-31T15:48:12',

                        navn: 'NAV ACC 05',
                        journalpostId: '453826692',
                        hoveddokument: {
                            tittel: 'Svar på anmodning om informasjon',
                            dokumentreferanse: '454212390',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '29cdba5a-a334-4f17-8b55-ff1033bcb961',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-01-31T15:37:51',

                        navn: 'NAV ACC 05',
                        journalpostId: '453826689',
                        hoveddokument: {
                            tittel: 'H001',
                            dokumentreferanse: '454212384',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '86c47d90-4a79-4b62-ba96-d9df6b58d573',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-10-05T10:34:35',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453657595',
                        hoveddokument: {
                            tittel: 'NAV 33-00.09 Søknad om utvidet barnetrygd',
                            dokumentreferanse: '454040182',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273159',
                        tilhorendeFagsaksid: '3014D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-10-05T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'AAR',
                temanavn: 'Aa-registeret',
                saksid: '140273318',

                tilhorendeDokumenter: [
                    {
                        id: 'ae798442-4252-46bb-b7f1-4a1de408c58a',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-12T11:30:32',

                        navn: 'ukjent',
                        journalpostId: '453987209',
                        hoveddokument: {
                            tittel: 'Nytt testnotat',
                            dokumentreferanse: '454393336',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0fc95e7d-8091-4e35-aaa9-2336bdd7871e',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-08T10:43:17',

                        navn: 'ukjent',
                        journalpostId: '453986581',
                        hoveddokument: {
                            tittel: 'test pakker 2',
                            dokumentreferanse: '454392562',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f8044ba8-ce6d-439b-9f1e-63f80c300cb8',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-19T09:57:17',

                        navn: 'ukjent',
                        journalpostId: '453912082',
                        hoveddokument: {
                            tittel: 'Ny tittel',
                            dokumentreferanse: '454313278',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'bad1da63-325e-40e4-aebe-294a3e8377fa',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-10T15:36:16',

                        navn: 'ukjent',
                        journalpostId: '453909200',
                        hoveddokument: {
                            tittel: 'Ny støtte',
                            dokumentreferanse: '454310042',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '242b514d-680e-4597-a72a-d0d1ab24dc28',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-09T10:01:27',

                        navn: 'ukjent',
                        journalpostId: '453906108',
                        hoveddokument: {
                            tittel: 'test',
                            dokumentreferanse: '454306823',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '98736b73-21bc-4268-93ed-0808164b725c',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-05T11:13:18',

                        navn: 'ukjent',
                        journalpostId: '453905327',
                        hoveddokument: {
                            tittel: 'test',
                            dokumentreferanse: '454305989',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '97b64748-9161-4950-95f5-b86935947481',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-28T13:14:48',

                        navn: 'ukjent',
                        journalpostId: '453902028',
                        hoveddokument: {
                            tittel: 'test',
                            dokumentreferanse: '454302476',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8b51f48e-9a37-420e-a0f5-1c9392bbac08',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-13T17:07:57',

                        navn: 'ukjent',
                        journalpostId: '453898105',
                        hoveddokument: {
                            tittel: 'Test',
                            dokumentreferanse: '454297916',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '75be6bb7-1276-49ec-9f8b-4c3fbc8f319f',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-09-19T09:30:24',

                        navn: 'ukjent',
                        journalpostId: '453886046',
                        hoveddokument: {
                            tittel: 'ggg',
                            dokumentreferanse: '454283601',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '6b9bc290-f0fa-4b47-b2a6-d9a34291c646',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2022-12-19T15:40:41',

                        navn: 'ukjent',
                        journalpostId: '453822938',
                        hoveddokument: {
                            tittel: 'Test',
                            dokumentreferanse: '454203322',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140273318',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAR',
                        temakodeVisning: 'Aa-registeret',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-10-11T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'GRU',
                temanavn: 'Grunn- og hjelpestønad',
                saksid: '140274313',
                fagsaksnummer: '3014E03',
                tilhorendeDokumenter: [],

                opprettet: '2021-11-10T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'GRU',
                temanavn: 'Grunn- og hjelpestønad',
                saksid: '140274314',
                fagsaksnummer: '3014E01',
                tilhorendeDokumenter: [
                    {
                        id: '406e7e8d-efe8-4a15-9926-c9674b6e64c2',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-08T11:11:26',

                        navn: 'ukjent',
                        journalpostId: '453986571',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454392599',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274314',
                        tilhorendeFagsaksid: '3014E01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-11-10T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'AAP',
                temanavn: 'Arbeidsavklaringspenger',
                saksid: '140274458',
                fagsaksnummer: 'null',
                tilhorendeDokumenter: [
                    {
                        id: 'bb28afc9-cda8-4627-9b32-23d414dfbe57',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-16T14:37:11',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454001795',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 16.07.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454410056',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c328cbfa-8215-43aa-85bf-ab2088aa5338',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-07-16T14:37:11',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454001794',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 16.07.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454410055',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd81d0e6e-265f-496c-9b0a-625387737916',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-10T11:19:27',

                        navn: 'ukjent',
                        journalpostId: '453909065',
                        hoveddokument: {
                            tittel: 'Vurdering av beregningstidspunkt og yrkesskade',
                            dokumentreferanse: '454309792',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '55897803-8a13-43b5-8863-0dc166062223',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-10T11:11:35',

                        navn: 'ukjent',
                        journalpostId: '453909057',
                        hoveddokument: {
                            tittel: 'NAV-kontorets innstilling § 11-12',
                            dokumentreferanse: '454309854',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a8bc02fe-0a57-4970-8c1c-bf9a014887af',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-28T16:13:06',

                        navn: 'ukjent',
                        journalpostId: '453902221',
                        hoveddokument: {
                            tittel: 'Vurdering av beregningstidspunkt og yrkesskade',
                            dokumentreferanse: '454302642',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1c819cdd-c5fd-4f3c-b076-1bdc81e30ca1',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-28T13:59:32',

                        navn: 'ukjent',
                        journalpostId: '453902093',
                        hoveddokument: {
                            tittel: 'Førstegangsnotat AAP',
                            dokumentreferanse: '454302480',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '9df9ddfb-6689-42b0-a505-6e95cdb48e02',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-11-26T09:28:11',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453900405',
                        hoveddokument: {
                            tittel: 'fff',
                            dokumentreferanse: '454300642',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '270002fe-f42a-4ade-aca2-64ef7f8164ea',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-09-04T14:18:54',

                        navn: 'ukjent',
                        journalpostId: '453844184',
                        hoveddokument: {
                            tittel: 'NAV-kontorets innstilling § 11-12',
                            dokumentreferanse: '454233209',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'cf7bef82-7e83-4e30-a0f2-ecf92fad2086',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-09-04T14:16:40',

                        navn: 'ukjent',
                        journalpostId: '453844183',
                        hoveddokument: {
                            tittel: 'Førstegangsnotat AAP',
                            dokumentreferanse: '454233208',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'cda1a1d6-2e5e-4ff7-872d-fd35932b63d6',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-04-12T11:21:18',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453833204',
                        hoveddokument: {
                            tittel: 'NAV 11-13.05 Søknad om arbeidsavklaringspenger',
                            dokumentreferanse: '454220298',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '37eedd62-5f31-45d2-9f57-9c3665cb58f7',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-04-12T11:21:17',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453833202',
                        hoveddokument: {
                            tittel: 'Ref. tiltaksvariant 00/00000',
                            dokumentreferanse: '454220296',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e0c10c5c-7a92-4906-be49-c2fe403492e2',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-04-12T11:15:28',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453833182',
                        hoveddokument: {
                            tittel: 'NAV 11-13.05 Søknad om arbeidsavklaringspenger',
                            dokumentreferanse: '454220242',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'vedlegg: 1',
                                dokumentreferanse: '454220243',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 2',
                                dokumentreferanse: '454220244',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0af9eb28-ad73-4781-a588-27eee34ce83b',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2022-02-11T15:07:51',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453780459',
                        hoveddokument: {
                            tittel: 'Søknad om arbeidsavklaringspenger',
                            dokumentreferanse: '454163628',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '22879590-8dbb-4b61-ae74-73bd06959cc6',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-11-22T08:13:32',

                        navn: 'asdas',
                        journalpostId: '453759518',
                        hoveddokument: {
                            tittel: 'NAV 11-13.05 Søknad om arbeidsavklaringspenger',
                            dokumentreferanse: '454142225',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140274458',
                        tilhorendeFagsaksid: 'null',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2021-11-22T00:00:00',
                fagsystem: 'AO01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                saksid: '140275423',
                fagsaksnummer: '9744848',
                tilhorendeDokumenter: [
                    {
                        id: 'b545a406-9b84-4d26-aef8-f1ff337000ed',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-22T09:52:13',

                        navn: 'ukjent',
                        journalpostId: '453990772',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 22.05.2025 - Dagpenger',
                            dokumentreferanse: '454397568',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e89e52bc-6154-4b61-b3af-c00aaa887fa1',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-22T09:51:49',

                        navn: 'ukjent',
                        journalpostId: '453990770',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 08.04.2025 - Dagpenger',
                            dokumentreferanse: '454397566',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '12f0070c-e090-4507-a3eb-d1a8a5f11de0',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-22T09:51:49',

                        navn: 'ukjent',
                        journalpostId: '453990769',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 22.05.2025 - Dagpenger',
                            dokumentreferanse: '454397565',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '36b0a379-7f0e-4668-a525-0916e44bf37b',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-25T00:30:35',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453983617',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 24.04.2025 - Dagpenger',
                            dokumentreferanse: '454389284',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd3079607-5627-4f4f-a5b2-132484746097',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-16T00:30:07',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453982510',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 15.04.2025 - Dagpenger',
                            dokumentreferanse: '454388056',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '7e1d1cbe-5f15-4e61-b5a4-d91b1ecfa3b9',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-16T00:30:06',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453982509',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 15.04.2025 - Dagpenger',
                            dokumentreferanse: '454388055',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f59a4cd1-f436-4154-b954-124463c791ba',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-15T00:30:09',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453982414',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 14.04.2025 - Dagpenger',
                            dokumentreferanse: '454387928',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd90697f6-6e4f-4955-9c92-610ab36e8fd8',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-15T00:30:08',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453982411',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 14.04.2025 - Dagpenger',
                            dokumentreferanse: '454387925',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '839be115-1ee0-427b-bbb7-8d73e3d84317',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-03-21T15:15:47',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453976592',
                        hoveddokument: {
                            tittel: 'Pågående samtale med NAV - 21.03.2025 - Dagpenger',
                            dokumentreferanse: '454381143',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '59e671b2-7b32-4b0f-a636-c54fb6ebcccc',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2022-04-21T10:33:05',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453803267',
                        hoveddokument: {
                            tittel: 'NAV 95-20.00 Melding om bankkontonummer',
                            dokumentreferanse: '454186687',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c7278079-6505-45c7-a8d5-cacc9049554d',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-02T18:05:25',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453648857',
                        hoveddokument: {
                            tittel: 'Forespørsel om forsikringsperioder',
                            dokumentreferanse: '454030494',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275423',
                        tilhorendeFagsaksid: '9744848',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2022-02-10T00:00:00',
                fagsystem: 'AO01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'GRU',
                temanavn: 'Grunn- og hjelpestønad',
                saksid: '140275458',
                fagsaksnummer: '3014E04',
                tilhorendeDokumenter: [
                    {
                        id: '301616d3-b637-4ba6-87d9-1217af2a9443',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-10-13T16:53:06',

                        navn: 'ukjent',
                        journalpostId: '453847869',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454238110',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275458',
                        tilhorendeFagsaksid: '3014E04',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'cfe4f4b4-3171-46a8-b319-7d8359bc1e07',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-01-31T13:43:45',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453826642',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454212335',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275458',
                        tilhorendeFagsaksid: '3014E04',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2022-02-14T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                saksid: '140275596',
                fagsaksnummer: '10695768',
                tilhorendeDokumenter: [
                    {
                        id: 'c4ba0416-fa1a-4fcb-bfff-281881286670',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-03-13T10:53:21',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453972394',
                        hoveddokument: {
                            tittel: 'ff',
                            dokumentreferanse: '454376089',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140275596',
                        tilhorendeFagsaksid: '10695768',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a018b370-5556-484b-8a0f-3d182af98f40',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2022-06-15T14:34:46',

                        navn: 'ukjent',
                        journalpostId: '453807548',
                        hoveddokument: {
                            tittel: 'THIS IS A NOTAT',
                            dokumentreferanse: '454191115',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275596',
                        tilhorendeFagsaksid: '10695768',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '26af562c-3d40-476b-97a7-fa8e46367ada',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2022-02-18T09:24:37',

                        navn: 'Hansen, Per',
                        journalpostId: '453780841',
                        hoveddokument: {
                            tittel: 'Søknad om dagpenger ved permittering',
                            dokumentreferanse: '454164013',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275596',
                        tilhorendeFagsaksid: '10695768',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'de62001d-0e3e-43dd-b277-1ac5fa506336',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-08-19T09:31:21',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453654257',
                        hoveddokument: {
                            tittel: 'Arbeidsavtale',
                            dokumentreferanse: '454036531',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275596',
                        tilhorendeFagsaksid: '10695768',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '957e3dc2-96fd-4dab-8235-54392b932062',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-01T18:20:54',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453648835',
                        hoveddokument: {
                            tittel: 'Forespørsel om forsikringsperioder',
                            dokumentreferanse: '454030445',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140275596',
                        tilhorendeFagsaksid: '10695768',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2022-02-18T00:00:00',
                fagsystem: 'AO01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                saksid: '140278722',
                fagsaksnummer: 'HESTESAK',
                tilhorendeDokumenter: [
                    {
                        id: 'bf25a001-cf8b-423d-b7a3-dc8ee38fc7c5',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-04-02T13:13:37',

                        navn: 'ukjent',
                        journalpostId: '453980129',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 18.03.2025 - ',
                            dokumentreferanse: '454385360',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140278722',
                        tilhorendeFagsaksid: 'HESTESAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'af72d39b-6751-44de-b826-992bd9d30731',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-03-17T10:48:11',

                        navn: 'ukjent',
                        journalpostId: '453973449',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 18.02.2025 - ',
                            dokumentreferanse: '454377339',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140278722',
                        tilhorendeFagsaksid: 'HESTESAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4cd4b614-5a9a-48b1-a955-4b58f4f3dded',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-03-17T10:48:10',

                        navn: 'ukjent',
                        journalpostId: '453973448',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 17.03.2025 - ',
                            dokumentreferanse: '454377338',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140278722',
                        tilhorendeFagsaksid: 'HESTESAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '869f163a-daee-4c9f-9384-572ce1f42c56',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-02T19:21:39',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453648862',
                        hoveddokument: {
                            tittel: 'Forespørsel om forsikringsperioder',
                            dokumentreferanse: '454030499',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140278722',
                        tilhorendeFagsaksid: 'HESTESAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '21926584-c61b-4f2c-8cba-b8a966285146',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-02T18:11:24',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453648859',
                        hoveddokument: {
                            tittel: 'Forespørsel om forsikringsperioder',
                            dokumentreferanse: '454030496',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140278722',
                        tilhorendeFagsaksid: 'HESTESAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f3e6ebaa-bc7f-46f5-a3e7-8a763c1532ab',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-02T18:06:23',

                        navn: 'NAV ACCEPTANCE TEST 06',
                        journalpostId: '453648858',
                        hoveddokument: {
                            tittel: 'Forespørsel om forsikringsperioder',
                            dokumentreferanse: '454030495',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140278722',
                        tilhorendeFagsaksid: 'HESTESAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1328409e-44a7-4bd4-9bdb-730d1c7bc357',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-01T19:17:04',

                        navn: 'NAV ACCEPTANCE TEST 06',
                        journalpostId: '453648842',
                        hoveddokument: {
                            tittel: 'Forespørsel om forsikringsperioder',
                            dokumentreferanse: '454030452',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140278722',
                        tilhorendeFagsaksid: 'HESTESAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a3d35aea-ae5d-4009-bbf6-79e979759870',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-01T18:55:59',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453648839',
                        hoveddokument: {
                            tittel: 'Forespørsel om forsikringsperioder',
                            dokumentreferanse: '454030449',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140278722',
                        tilhorendeFagsaksid: 'HESTESAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '23237901-ee8c-4551-ba79-3f8cb79ce401',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-01T18:08:53',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453648834',
                        hoveddokument: {
                            tittel: 'Forespørsel om forsikringsperioder',
                            dokumentreferanse: '454030444',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140278722',
                        tilhorendeFagsaksid: 'HESTESAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2022-07-06T00:00:00',
                fagsystem: 'AO11',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BID',
                temanavn: 'Bidrag',
                saksid: '140279294',

                tilhorendeDokumenter: [
                    {
                        id: 'f58813b1-3d4d-4b6b-a14c-ea555ba1cf5d',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-07-16T14:38:03',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454001796',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454410057',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140279294',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BID',
                        temakodeVisning: 'Bidrag',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2022-08-19T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140280288',
                fagsaksnummer: ';)',
                tilhorendeDokumenter: [],

                opprettet: '2022-10-11T00:00:00',
                fagsystem: 'OEBS',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ENF',
                temanavn: 'Enslig mor eller far',
                saksid: '140280758',
                fagsaksnummer: '3014A07',
                tilhorendeDokumenter: [
                    {
                        id: '5d1376ad-f027-45c2-a4f6-09de0408079e',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-06T15:38:53',

                        navn: 'ukjent',
                        journalpostId: '453905851',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454306561',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140280758',
                        tilhorendeFagsaksid: '3014A07',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ENF',
                        temakodeVisning: 'Enslig mor eller far',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a360bcea-9502-48f1-9055-01b33d6b0236',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-21T13:27:09',

                        navn: '123',
                        journalpostId: '453649982',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454031839',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140280758',
                        tilhorendeFagsaksid: '3014A07',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ENF',
                        temakodeVisning: 'Enslig mor eller far',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2022-10-27T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'KON',
                temanavn: 'Kontantstøtte',
                saksid: '140282622',
                fagsaksnummer: '1203A01',
                tilhorendeDokumenter: [
                    {
                        id: '98f6cfbc-3fd4-4beb-a4fe-c3a0d59377c2',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-01-09T12:14:36',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453823858',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454208376',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140282622',
                        tilhorendeFagsaksid: '1203A01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'KON',
                        temakodeVisning: 'Kontantstøtte',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-01-09T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'FOR',
                temanavn: 'Foreldre- og svangerskapspenger',
                saksid: '140283298',
                fagsaksnummer: '1203B01',
                tilhorendeDokumenter: [
                    {
                        id: '880d3356-035e-47fa-98d5-0f0a82639cf8',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2025-05-27T15:15:04',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453992281',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454399271',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283298',
                        tilhorendeFagsaksid: '1203B01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '9ee322a4-528e-4801-8a84-6ea1392a511f',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-04-16T14:34:55',

                        navn: 'NAV ACC 05',
                        journalpostId: '453866187',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454260636',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140283298',
                        tilhorendeFagsaksid: '1203B01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'bd189e20-8240-44a4-b894-e6ff23ee7b02',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-04-16T14:01:32',

                        navn: 'NAV ACC 05',
                        journalpostId: '453866176',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454260667',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283298',
                        tilhorendeFagsaksid: '1203B01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-01-23T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'FIP',
                temanavn: 'Fiskerpensjon',
                saksid: '140283821',

                tilhorendeDokumenter: [],

                opprettet: '2023-02-06T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ARS',
                temanavn: 'Arbeidsrådgivning skjermet',
                saksid: '140283846',

                tilhorendeDokumenter: [
                    {
                        id: '293988f5-c1bf-4fb8-8884-8e3aba09eb2e',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-11T14:17:06',

                        navn: 'ukjent',
                        journalpostId: '453909528',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454310356',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283846',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ARS',
                        temakodeVisning: 'Arbeidsrådgivning – skjermet',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'bcfb1ae8-8bf8-47bb-99f5-ea50ad1890bb',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-10T15:46:41',

                        navn: 'ukjent',
                        journalpostId: '453909207',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454310049',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283846',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ARS',
                        temakodeVisning: 'Arbeidsrådgivning – skjermet',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd4255087-ceaf-4168-a4c5-0177c9d3a594',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-02T11:29:53',

                        navn: 'ukjent',
                        journalpostId: '453904397',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454304906',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283846',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ARS',
                        temakodeVisning: 'Arbeidsrådgivning – skjermet',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e9a277ea-5d84-404e-b710-4c6bd1166e00',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-28T15:29:23',

                        navn: 'ukjent',
                        journalpostId: '453902147',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454302569',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283846',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ARS',
                        temakodeVisning: 'Arbeidsrådgivning – skjermet',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c75e4c98-4cb8-45fd-a5d6-e7f83529e2e6',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-26T13:12:50',

                        navn: 'ukjent',
                        journalpostId: '453900539',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454300789',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283846',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ARS',
                        temakodeVisning: 'Arbeidsrådgivning – skjermet',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '30c76fc4-912c-42c2-97e8-eb4dc0701e56',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-05-14T12:58:00',

                        navn: 'Test Testesen',
                        journalpostId: '453883602',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454266485',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283846',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ARS',
                        temakodeVisning: 'Arbeidsrådgivning – skjermet',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ARS',
                temanavn: 'Arbeidsrådgivning skjermet',
                saksid: '140283847',

                tilhorendeDokumenter: [],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ARP',
                temanavn: 'Arbeidsrådgivning psykologtester',
                saksid: '140283848',

                tilhorendeDokumenter: [
                    {
                        id: 'b353e242-93fb-4a0b-9022-f329546eaa4d',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-08T13:08:39',

                        navn: 'MADS VALVIK',
                        journalpostId: '453889619',
                        hoveddokument: {
                            tittel: 'Test mottaker',
                            dokumentreferanse: '454288013',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140283848',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ARP',
                        temakodeVisning: 'Arbeidsrådgivning – psykologtester',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '24166884-9689-4af6-aa42-70205adf1115',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-06-15T10:15:27',

                        navn: 'ukjent',
                        journalpostId: '453838542',
                        hoveddokument: {
                            tittel: 'Husk å tilby psykologitest til Aremark. Det å stenge bilvaskesentrene hans kan ha gått hardt inn på han. ',
                            dokumentreferanse: '454226407',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283848',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ARP',
                        temakodeVisning: 'Arbeidsrådgivning – psykologtester',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'AGR',
                temanavn: 'Ajourhold - Grunnopplysninger',
                saksid: '140283856',

                tilhorendeDokumenter: [
                    {
                        id: '7a7c7a12-6a15-42ab-9c9e-b86faea2117d',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-03T09:07:08',

                        navn: 'ukjent',
                        journalpostId: '454000509',
                        hoveddokument: {
                            tittel: 'juletest fsdfdsfsdfsdfsdf',
                            dokumentreferanse: '454408573',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '7c0a9e80-0666-44f0-af3d-32484f95a203',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-03T09:06:54',

                        navn: 'ukjent',
                        journalpostId: '454000508',
                        hoveddokument: {
                            tittel: 'julaften er på en tirsdag',
                            dokumentreferanse: '454408572',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '592c1487-75c3-4b61-b411-b84de52556a2',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-06-19T10:47:58',

                        navn: 'ukjent',
                        journalpostId: '453997691',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 22.05.2025 - ',
                            dokumentreferanse: '454405293',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '35a2451d-62ce-4cf0-9dd3-fa9d5ef04c94',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-05-02T15:43:57',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453985020',
                        hoveddokument: {
                            tittel: 'Vedtak om ytelse',
                            dokumentreferanse: '454390896',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '9aeb5bd4-3442-49f0-8457-0ccf4c8ace0d',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-03-20T15:39:54',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453976493',
                        hoveddokument: {
                            tittel: 'gg',
                            dokumentreferanse: '454380862',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Førstegangsnotat AAP',
                                dokumentreferanse: '454313336',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'ff',
                                dokumentreferanse: '454343710',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Førstesideark',
                                dokumentreferanse: '454343740',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'o-brev',
                                dokumentreferanse: '454347075',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'testing',
                                dokumentreferanse: '454351118',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '060296d4-a9a8-4352-8b3a-1415a26c9dbb',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-02-24T12:31:04',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453949546',
                        hoveddokument: {
                            tittel: 'fldkf',
                            dokumentreferanse: '454352620',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Førstegangsnotat AAP',
                                dokumentreferanse: '454313336',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c073f909-e95a-4784-9a66-6c4d9e8424c3',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-01-29T08:53:59',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453930792',
                        hoveddokument: {
                            tittel: 'ccxc',
                            dokumentreferanse: '454332794',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'NAV - Førsteside (5)',
                                dokumentreferanse: '454332795',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '3d936133-753f-4413-9f65-82d112617ac5',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-17T11:56:46',

                        navn: 'ukjent',
                        journalpostId: '453910666',
                        hoveddokument: {
                            tittel: 'Bedre tittel',
                            dokumentreferanse: '454311723',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '25ae4900-ea10-481c-a95f-90c54bf1c2c5',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-09T11:45:31',

                        navn: 'ukjent',
                        journalpostId: '453906132',
                        hoveddokument: {
                            tittel: 'Testing',
                            dokumentreferanse: '454306848',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '719196b7-29ed-4c4c-a9c4-f0e00f55bb4a',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-28T16:13:22',

                        navn: 'ukjent',
                        journalpostId: '453902222',
                        hoveddokument: {
                            tittel: 'Bruker fikk 1 million ekstra, følg opp',
                            dokumentreferanse: '454302643',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c3ace6f2-5662-4f34-9248-d44be517be0d',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-28T14:21:14',

                        navn: 'ukjent',
                        journalpostId: '453902096',
                        hoveddokument: {
                            tittel: ' cvcvcvcxv',
                            dokumentreferanse: '454302484',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a0392dc1-7b50-415c-b2c7-37ad304d37dd',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-28T11:57:55',

                        navn: 'ukjent',
                        journalpostId: '453902003',
                        hoveddokument: {
                            tittel: 'test',
                            dokumentreferanse: '454302421',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '6c927f99-7a67-462c-b02c-6325df6ed157',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T15:17:52',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453901848',
                        hoveddokument: {
                            tittel: 'Adresseendring for bruker bosatt i utlandet',
                            dokumentreferanse: '454302238',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '011b6692-3175-4810-a096-437a710e15e8',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T15:17:52',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453901846',
                        hoveddokument: {
                            tittel: 'Kontonummer bidragsgjeld',
                            dokumentreferanse: '454302236',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Adresseendring for bruker bosatt i utlandet',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '251ca4ec-71b8-4102-81f9-bb3698d69373',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T15:17:52',

                        navn: 'SKOLÊ KVADRATISK',
                        journalpostId: '453901845',
                        hoveddokument: {
                            tittel: 'Adresseendring for bruker bosatt i utlandet',
                            dokumentreferanse: '454302235',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Ny avsender valgt org',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '6e66d438-3395-416b-8f6a-41093decffc6',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T15:17:50',

                        navn: 'SKOLÉ TØRR',
                        journalpostId: '453901844',
                        hoveddokument: {
                            tittel: 'Adresseendring for bruker bosatt i utlandet',
                            dokumentreferanse: '454302234',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'fb2b9ef4-c289-4935-9ab8-9383c9b58ccb',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T15:17:52',

                        navn: 'Finner på noe',
                        journalpostId: '453901809',
                        hoveddokument: {
                            tittel: 'Adresseendring for bruker bosatt i utlandet',
                            dokumentreferanse: '454302194',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '05116770-5d45-4843-995e-8ac1999a70ac',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-26T14:06:58',

                        navn: 'ukjent',
                        journalpostId: '453900563',
                        hoveddokument: {
                            tittel: 'fdfd',
                            dokumentreferanse: '454300820',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8bf1b6d0-f1bc-4769-82cf-f75f9e01f102',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-11T13:20:29',

                        navn: 'ukjent',
                        journalpostId: '453897139',
                        hoveddokument: {
                            tittel: 'fdfdf',
                            dokumentreferanse: '454296888',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f1c71e4b-3838-4f8d-bdb0-a9e7da1afc44',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-29T10:59:18',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453894604',
                        hoveddokument: {
                            tittel: 'Test ',
                            dokumentreferanse: '454293918',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'NAV 14-04.10 Søknad om svangerskapspenger til selvstendig næringsdrivende og frilanser',
                                dokumentreferanse: '454292952',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c7210fcf-ee7f-44b6-b53f-03477f29bcb3',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-25T10:56:43',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453893177',
                        hoveddokument: {
                            tittel: 'fdfdf',
                            dokumentreferanse: '454292496',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1c481e4e-3393-4a2f-8ace-d2d213b0ceb9',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-22T14:58:42',

                        navn: 'FORNUFTIG PUSLETE KATT ADVOKAT',
                        journalpostId: '453892561',
                        hoveddokument: {
                            tittel: 'test10',
                            dokumentreferanse: '454291559',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0452c4ed-8195-4bbf-98b0-74f063b94805',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-22T14:56:48',

                        navn: 'FORNUFTIG PUSLETE KATT ADVOKAT',
                        journalpostId: '453892560',
                        hoveddokument: {
                            tittel: 'test',
                            dokumentreferanse: '454291558',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'skdgbjdkfbgjk',
                                dokumentreferanse: '454288496',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'test',
                                dokumentreferanse: '454289684',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Barn fikk ikke penger',
                                dokumentreferanse: '454289869',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8fca9ac1-fb9f-4c7c-83b6-35c78ead5b32',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-21T10:48:33',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453891913',
                        hoveddokument: {
                            tittel: 'test',
                            dokumentreferanse: '454290781',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'GEN NOT!!',
                                dokumentreferanse: '454192839',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Serviceklage',
                                dokumentreferanse: '454280980',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Test av Hest&Fest',
                                dokumentreferanse: '454287981',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'okeiiii',
                                dokumentreferanse: '454288012',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Test status 1',
                                dokumentreferanse: '454289962',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '29cc6840-5d43-46b3-be6a-f250560990fd',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-16T12:23:22',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453891353',
                        hoveddokument: {
                            tittel: 'test19',
                            dokumentreferanse: '454290106',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Barn fikk ikke penger',
                                dokumentreferanse: '454289869',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '9630c6ae-a7b1-49ea-94fa-cbca6501320d',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-15T15:30:41',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453891192',
                        hoveddokument: {
                            tittel: 'fff',
                            dokumentreferanse: '454289927',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Labels min versjon',
                                dokumentreferanse: '454289928',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Labels min versjon',
                                dokumentreferanse: '454289929',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Labels min versjon',
                                dokumentreferanse: '454289930',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4027bb4e-f6f0-46f1-87d4-9779d11f3caf',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-15T09:25:21',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453891036',
                        hoveddokument: {
                            tittel: 'test',
                            dokumentreferanse: '454289684',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '68aa0e83-bc1e-424f-b2a1-25ebf7fced1c',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-09-20T13:49:45',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453886390',
                        hoveddokument: {
                            tittel: 'test',
                            dokumentreferanse: '454283962',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Beregninger',
                                dokumentreferanse: '454282265',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Metr',
                                dokumentreferanse: '454283647',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'ccxccd',
                                dokumentreferanse: '454283651',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e263f224-3f95-4da5-92df-5977aee68df7',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-09-18T10:49:06',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453885862',
                        hoveddokument: {
                            tittel: 'test2',
                            dokumentreferanse: '454283355',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Vedtak om mye penger',
                                dokumentreferanse: '454278376',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Innhenting av kontoopplysninger',
                                dokumentreferanse: '454282807',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0e551d02-c921-4cd6-8254-083e1054489a',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-08-20T09:23:12',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453881430',
                        hoveddokument: {
                            tittel: 'Vedtak om mye penger',
                            dokumentreferanse: '454278376',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c0c4eb90-6efd-4d44-8263-62afa873554d',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-06-27T14:57:05',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453876897',
                        hoveddokument: {
                            tittel: 'NAV 11-13.05 Søknad om arbeidsavklaringspenger',
                            dokumentreferanse: '454272615',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '595bfe73-bdfa-4abb-92f5-d6dd02c7cb46',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-08-17T20:01:57',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453859465',
                        hoveddokument: {
                            tittel: 'vedlegg: 2',
                            dokumentreferanse: '454231283',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4e7b70a6-4741-46e0-9978-c1d049e54b19',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-04-12T10:56:43',

                        navn: 'Haile Vetle Tore',
                        journalpostId: '453833161',
                        hoveddokument: {
                            tittel: 'NAV 95-00.06 Skjema for bankopplysninger - USA',
                            dokumentreferanse: '454220220',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8e16a692-93c4-48f7-96dc-af9c3692ad75',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2022-02-11T15:28:03',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453780467',
                        hoveddokument: {
                            tittel: 'NAV 90-00.08 K Klage',
                            dokumentreferanse: '454163637',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'vedlegg: 1',
                                dokumentreferanse: '454163636',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e1367a44-8bbf-4d50-a3d1-17263e0f1c8d',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-11-10T10:40:24',

                        navn: 'SKOLÊ KVADRATISK',
                        journalpostId: '453753186',
                        hoveddokument: {
                            tittel: 'NAV 95-20.00 Melding om bankkontonummer',
                            dokumentreferanse: '454135872',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'bf57c64d-df40-49c7-9127-cd31947ca1e7',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-11-10T10:40:24',

                        navn: 'JULSUNDET SKOLE',
                        journalpostId: '453753183',
                        hoveddokument: {
                            tittel: 'NAV 95-20.00 Melding om bankkontonummer',
                            dokumentreferanse: '454135869',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '12730b03-09af-49e9-89c7-e44c4a7b7d4c',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-09-07T12:57:08',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453655247',
                        hoveddokument: {
                            tittel: 'NAV 95-20.00 Melding om bankkontonummer',
                            dokumentreferanse: '454037602',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283856',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'KLL',
                temanavn: 'Klage lønnsgaranti',
                saksid: '140283864',

                tilhorendeDokumenter: [
                    {
                        id: '961dc7cd-527b-4885-abba-9c2d44b22cc6',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-05-14T12:58:00',

                        navn: 'Test Testesen',
                        journalpostId: '453883601',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454266485',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283864',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'KLL',
                        temakodeVisning: 'Klage – lønnsgaranti',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'ARS',
                temanavn: 'Arbeidsrådgivning skjermet',
                saksid: '140283887',

                tilhorendeDokumenter: [],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd',
                saksid: '140283888',

                tilhorendeDokumenter: [
                    {
                        id: '1b0b12b7-3cfc-4cb4-bbfd-b7e3e4f6b587',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-08-17T20:01:57',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453859464',
                        hoveddokument: {
                            tittel: 'vedlegg: 2',
                            dokumentreferanse: '454231283',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283888',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1865fe31-e0b2-4ed6-a89c-c8c5b4368fe4',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2023-05-15T09:13:50',

                        navn: 'FORNUFTIG PUSLETE KATT ADVOKAT',
                        journalpostId: '453835732',
                        hoveddokument: {
                            tittel: 'Min nye fine tittel :)',
                            dokumentreferanse: '454223205',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140283888',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e9202c4b-ebbf-4295-b6b1-2cc5ea925b60',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-10-21T17:52:35',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453739526',
                        hoveddokument: {
                            tittel: 'EØS-dokument',
                            dokumentreferanse: '454122134',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283888',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'eb16cdb3-72f0-48fb-b7b9-fec74842a076',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-10-20T10:17:43',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453733459',
                        hoveddokument: {
                            tittel: 'NAV 33-00.07 Søknad om ordinær barnetrygd',
                            dokumentreferanse: '454116060',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283888',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '3fb7b794-e5e9-4cc0-8ea5-28e28445b66b',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-03-04T09:11:52',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453645031',
                        hoveddokument: {
                            tittel: 'NAV 33-00.07 Søknad om ordinær barnetrygd',
                            dokumentreferanse: '454026277',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283888',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4caadc3c-2cea-4bb8-ae7c-0513f0006573',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-08-26T13:15:23',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453629151',
                        hoveddokument: {
                            tittel: 'NAV 33-00.07 Søknad om ordinær barnetrygd',
                            dokumentreferanse: '454008783',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283888',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'FIP',
                temanavn: 'Fiskerpensjon',
                saksid: '140283889',

                tilhorendeDokumenter: [],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'ARS',
                temanavn: 'Arbeidsrådgivning skjermet',
                saksid: '140283890',

                tilhorendeDokumenter: [],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'FIP',
                temanavn: 'Fiskerpensjon',
                saksid: '140283891',

                tilhorendeDokumenter: [],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'AGR',
                temanavn: 'Ajourhold - Grunnopplysninger',
                saksid: '140283892',

                tilhorendeDokumenter: [
                    {
                        id: '6b812bef-716b-4927-9267-5c3171464115',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-01-09T12:59:13',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453859801',
                        hoveddokument: {
                            tittel: 'vedlegg: 1',
                            dokumentreferanse: '454249480',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283892',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '5ef8592b-b5a1-4d51-9f22-f587f3e0e9b1',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-07T20:46:24',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453650729',
                        hoveddokument: {
                            tittel: 'NAV 10-07.03 Søknad om hjelpemidler',
                            dokumentreferanse: '454032645',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283892',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '961118cc-f839-42c1-99a0-e54e95b7f472',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-19T14:18:00',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453649881',
                        hoveddokument: {
                            tittel: 'NAV 08-20.12 Krav fra arbeidsgiveren om refusjon av sykepenger utbetalt til en arbeidstaker som er unntatt fra bestemmelsene om arbeidsgiveransvar',
                            dokumentreferanse: '454031727',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140283892',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AGR',
                        temakodeVisning: 'Ajourhold – grunnopplysninger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'BID',
                temanavn: 'Bidrag',
                saksid: '140283893',

                tilhorendeDokumenter: [],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'FIP',
                temanavn: 'Fiskerpensjon',
                saksid: '140283896',

                tilhorendeDokumenter: [],

                opprettet: '2023-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'AAP',
                temanavn: 'Arbeidsavklaringspenger',
                saksid: '140284921',

                tilhorendeDokumenter: [
                    {
                        id: '530e32d2-f8da-437f-89ef-457759d2683a',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-01-08T15:43:58',

                        navn: 'ukjent',
                        journalpostId: '453856630',
                        hoveddokument: {
                            tittel: 'runetest2',
                            dokumentreferanse: '454249375',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '72b70d3f-7170-41b5-bcd6-9329570b50fc',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-01-08T15:36:31',

                        navn: 'ukjent',
                        journalpostId: '453856628',
                        hoveddokument: {
                            tittel: 'runetest2',
                            dokumentreferanse: '454249373',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2d9a3f81-42b0-4ee5-9cdd-6c44dbbf661f',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-01-08T15:18:22',

                        navn: 'ukjent',
                        journalpostId: '453856625',
                        hoveddokument: {
                            tittel: 'runetest2',
                            dokumentreferanse: '454249370',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f63b62f7-c877-4243-9995-2638d51b0f94',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-09-04T15:25:54',

                        navn: 'ukjent',
                        journalpostId: '453844195',
                        hoveddokument: {
                            tittel: 'NAV-kontorets innstilling § 11-12',
                            dokumentreferanse: '454233220',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'ef158dec-6b69-4017-bc4e-d9bdd1dae529',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2023-06-30T11:17:47',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453839842',
                        hoveddokument: {
                            tittel: 'Orientering om rett til tilsvar i ankesak',
                            dokumentreferanse: '454227923',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f3e3f1bd-ceb8-4982-9df4-ec4d8d37f5c6',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2023-06-02T13:43:32',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453837477',
                        hoveddokument: {
                            tittel: 'Vedtak cc',
                            dokumentreferanse: '454225168',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e9a67ce2-111c-49f5-ac54-3475aa911a0f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-05-12T15:22:25',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453835722',
                        hoveddokument: {
                            tittel: 'UTL Brev - utland',
                            dokumentreferanse: '454223197',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f8268bf7-f529-4aef-8527-74b87789b1ce',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-08-25T13:04:48',

                        navn: 'gfdsgd',
                        journalpostId: '453654612',
                        hoveddokument: {
                            tittel: 'NAV 11-12.05 Søknad om reisestønad',
                            dokumentreferanse: '454036919',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '92d3fe02-1634-4d47-a3c8-40e0b84e2eca',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-08-19T11:23:10',

                        navn: 'test',
                        journalpostId: '453654271',
                        hoveddokument: {
                            tittel: 'NAV 11-12.05 Søknad om reisestønad',
                            dokumentreferanse: '454036547',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'daffb71b-602d-4b8d-9fbf-b6207ad0f498',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-08-19T11:13:50',

                        navn: 'TESTNAVN',
                        journalpostId: '453654269',
                        hoveddokument: {
                            tittel: 'NAV 11-12.05 Søknad om reisestønad',
                            dokumentreferanse: '454036545',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1ddcc30a-7649-4489-a370-49fc40f19d6f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-10T07:50:10',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453650899',
                        hoveddokument: {
                            tittel: 'NAV 95-00.05 Skjema for bankopplysninger Europa',
                            dokumentreferanse: '454032824',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '6bece69c-ffc0-4b73-819e-5927d55ebff9',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-07T20:22:18',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453650728',
                        hoveddokument: {
                            tittel: 'NAV 11-13.05 Søknad om arbeidsavklaringspenger',
                            dokumentreferanse: '454032644',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '399487b4-bdf8-4378-85fd-f548d6d75217',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-20T09:51:02',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453649919',
                        hoveddokument: {
                            tittel: 'NAV 11-03.08 Egenerklæring AAP-EØS',
                            dokumentreferanse: '454031768',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '281c2e09-9002-4776-be03-0023ad5880f0',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-05-19T14:19:19',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453649882',
                        hoveddokument: {
                            tittel: 'NAV 08-47.05 Søknad om sykepenger - midlertidig ute av inntektsgivende arbeid',
                            dokumentreferanse: '454031728',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284921',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-03-13T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'BIL',
                temanavn: 'Bil',
                saksid: '140284923',

                tilhorendeDokumenter: [
                    {
                        id: '70f74118-073a-4b91-95f7-07a96f22a27d',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-09-07T12:57:47',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453655255',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454037610',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140284923',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BIL',
                        temakodeVisning: 'Bil',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-03-13T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'SYK',
                temanavn: 'Sykepenger',
                saksid: '140285019',

                tilhorendeDokumenter: [
                    {
                        id: '524e8767-b068-4825-b7dd-2b7f118d2534',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-07-10T14:38:51',

                        navn: 'NAV ACC 05',
                        journalpostId: '453840242',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454228425',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140285019',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SYK',
                        temakodeVisning: 'Sykepenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4158b025-7b86-4022-a79d-e033d34a454c',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-07-10T14:37:52',

                        navn: 'NAV ACC 05',
                        journalpostId: '453840241',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454228424',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140285019',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SYK',
                        temakodeVisning: 'Sykepenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '86b5d26e-d0c4-446c-8266-cee8b79e6f95',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-08-25T14:04:51',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453654619',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454036926',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            },
                            {
                                tittel: '*****',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140285019',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SYK',
                        temakodeVisning: 'Sykepenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0057c6f1-cc3a-408b-903a-e6865d80c00f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-14T11:21:58',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453651063',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454033017',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140285019',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SYK',
                        temakodeVisning: 'Sykepenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a57b7f70-bbe8-436e-8221-2f3bae2f605e',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-14T11:21:57',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453651062',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454033016',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140285019',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SYK',
                        temakodeVisning: 'Sykepenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '62c59f5c-bac0-4a26-8a38-abc2f54a4334',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-14T11:11:37',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453651060',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454033014',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140285019',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SYK',
                        temakodeVisning: 'Sykepenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-03-15T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ENF',
                temanavn: 'Enslig mor eller far',
                saksid: '140286000',

                tilhorendeDokumenter: [],

                opprettet: '2023-04-12T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                saksid: '140286322',

                tilhorendeDokumenter: [],

                opprettet: '2023-04-19T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'GEN',
                temanavn: 'Generell',
                saksid: '140286393',

                tilhorendeDokumenter: [
                    {
                        id: '6890ef0b-9135-48d0-9519-757e3a03e743',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-01-09T12:59:13',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453856696',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454249479',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454249480',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454249481',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286393',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GEN',
                        temakodeVisning: 'Generell',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '6bf046ff-0ea6-4d50-b3bc-30fafe616f94',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-01-09T12:59:12',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453856695',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454249476',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454249477',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454249478',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286393',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GEN',
                        temakodeVisning: 'Generell',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8babd775-4358-4dfe-a392-ee1885bc1793',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-08-17T20:01:57',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453842639',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454231281',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454231282',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454231283',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286393',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GEN',
                        temakodeVisning: 'Generell',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'cac4207a-a500-400c-95ef-4c3de052160f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-08-17T14:39:35',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453842611',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454231248',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454231249',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454231250',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454231251',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286393',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GEN',
                        temakodeVisning: 'Generell',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '550ed9a6-06ac-4d9f-adeb-d283311a6826',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-08-17T14:31:25',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453842609',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454231243',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454231244',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454231245',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286393',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GEN',
                        temakodeVisning: 'Generell',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd18d050d-1940-4d67-aaae-c335d80829ab',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-09-07T12:57:29',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453655253',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454037608',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286393',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GEN',
                        temakodeVisning: 'Generell',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'be19ee35-dee2-4222-8923-4fb42c153fc9',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-10T07:00:09',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453650898',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454032823',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286393',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GEN',
                        temakodeVisning: 'Generell',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-04-20T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'PEN',
                temanavn: 'Pensjon',
                saksid: '140286394',

                tilhorendeDokumenter: [
                    {
                        id: 'acc18c41-37d4-4271-bddf-64b18c25d75b',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-04-20T14:26:24',

                        navn: 'ukjent',
                        journalpostId: '453833952',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454203322',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286394',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'PEN',
                        temakodeVisning: 'Pensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-04-20T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140286402',

                tilhorendeDokumenter: [],

                opprettet: '2023-04-20T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'IND',
                temanavn: 'Tiltakspenger',
                saksid: '140286736',

                tilhorendeDokumenter: [],

                opprettet: '2023-05-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'GRA',
                temanavn: 'Gravferdsstønad',
                saksid: '140286737',

                tilhorendeDokumenter: [
                    {
                        id: 'e7f84806-69ca-4fb6-916e-4dea12b61a0b',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-08T10:59:18',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453650761',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454032677',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286737',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRA',
                        temakodeVisning: 'Gravferdsstønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-05-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'OPP',
                temanavn: 'Oppfølging',
                saksid: '140286887',

                tilhorendeDokumenter: [],

                opprettet: '2023-05-05T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'OPP',
                temanavn: 'Oppfølging',
                saksid: '140286888',

                tilhorendeDokumenter: [],

                opprettet: '2023-05-05T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'FEI',
                temanavn: 'Feilutbetaling',
                saksid: '140286889',

                tilhorendeDokumenter: [
                    {
                        id: '8c350d80-1bd5-44a2-9bbb-01dddc96fae5',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-06-13T09:28:21',

                        navn: 'ukjent',
                        journalpostId: '453838321',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454226158',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140286889',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FEI',
                        temakodeVisning: 'Feilutbetaling',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-05-05T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'KON',
                temanavn: 'Kontantstøtte',
                saksid: '140287126',

                tilhorendeDokumenter: [
                    {
                        id: 'c3953117-f461-4548-98a8-2100cd3cee84',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-08-27T10:21:41',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453629261',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454008884',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140287126',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'KON',
                        temakodeVisning: 'Kontantstøtte',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-05-11T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'KTR',
                temanavn: 'Kontroll',
                saksid: '140287170',

                tilhorendeDokumenter: [
                    {
                        id: '6f7b5d0c-b0dd-4e7a-b165-2cc5cee2c7ee',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-09-29T10:22:15',

                        navn: 'ukjent',
                        journalpostId: '453846511',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454236382',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140287170',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'KTR',
                        temakodeVisning: 'Kontroll',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-05-12T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'SAK',
                temanavn: 'Saksomkostninger',
                saksid: '140287171',

                tilhorendeDokumenter: [],

                opprettet: '2023-05-12T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'FOR',
                temanavn: 'Foreldre- og svangerskapspenger',
                saksid: '140287771',

                tilhorendeDokumenter: [],

                opprettet: '2023-06-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'FOS',
                temanavn: 'Forsikring',
                saksid: '140287772',

                tilhorendeDokumenter: [],

                opprettet: '2023-06-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'GRU',
                temanavn: 'Grunn- og hjelpestønad',
                saksid: '140287773',

                tilhorendeDokumenter: [],

                opprettet: '2023-06-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HEL',
                temanavn: 'Helsetjenester og ortopediske hjelpemidler',
                saksid: '140287774',

                tilhorendeDokumenter: [],

                opprettet: '2023-06-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'OMS',
                temanavn: 'Omsorgspenger, Pleiepenger og opplæringspenger',
                saksid: '140287775',

                tilhorendeDokumenter: [],

                opprettet: '2023-06-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'YRK',
                temanavn: 'Yrkesskade og menerstatning',
                saksid: '140287776',

                tilhorendeDokumenter: [
                    {
                        id: 'cf8dfe94-f9fd-4068-ac51-63919aefc50d',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-08-26T13:28:27',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453629156',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454008788',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140287776',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'YRK',
                        temakodeVisning: 'Yrkesskade og menerstatning',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-06-02T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'OPA',
                temanavn: 'Oppfølging - arbeidsgiver',
                saksid: '140288539',

                tilhorendeDokumenter: [],

                opprettet: '2023-06-28T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'SYM',
                temanavn: 'Sykmelding',
                saksid: '140288806',

                tilhorendeDokumenter: [],

                opprettet: '2023-07-10T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'TRY',
                temanavn: 'Trygdeavgift',
                saksid: '140289458',

                tilhorendeDokumenter: [],

                opprettet: '2023-08-09T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'VEN',
                temanavn: 'Ventelønn',
                saksid: '140289459',

                tilhorendeDokumenter: [],

                opprettet: '2023-08-09T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'UFM',
                temanavn: 'Unntak fra medlemskap',
                saksid: '140289472',

                tilhorendeDokumenter: [],

                opprettet: '2023-08-09T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'UFO',
                temanavn: 'Uføretrygd',
                saksid: '140289473',

                tilhorendeDokumenter: [],

                opprettet: '2023-08-09T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd',
                saksid: '140289816',
                fagsaksnummer: '3012B01',
                tilhorendeDokumenter: [
                    {
                        id: '1b7704c3-c656-452e-9c98-33179ada8c85',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-03-10T15:33:33',

                        navn: 'NAV ACC 05',
                        journalpostId: '453970273',
                        hoveddokument: {
                            tittel: 'Anmodning om avgjørelse av kompetanse',
                            dokumentreferanse: '454373882',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140289816',
                        tilhorendeFagsaksid: '3012B01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-08-21T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140290294',
                fagsaksnummer: 'NEW_SAK',
                tilhorendeDokumenter: [
                    {
                        id: '54a55fa9-bb1c-4b39-af67-45d2ea8b065f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-10-28T12:11:35',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453739925',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454122544',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140290294',
                        tilhorendeFagsaksid: 'NEW_SAK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-09-04T00:00:00',
                fagsystem: 'OEBS',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140290308',
                fagsaksnummer: 'OEBS',
                tilhorendeDokumenter: [
                    {
                        id: '98c26415-47ac-48e0-a605-99ca5df3f5bc',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-10-28T13:16:49',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453739933',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454122556',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140290308',
                        tilhorendeFagsaksid: 'OEBS',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-09-04T00:00:00',
                fagsystem: 'OEBS',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140290336',
                fagsaksnummer: '(づ๑•ᴗ•๑)づ',
                tilhorendeDokumenter: [
                    {
                        id: '93a31ce2-41f9-4c98-9608-e6fef3bd539b',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-09T15:25:00',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453650836',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454032758',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140290336',
                        tilhorendeFagsaksid: '(づ๑•ᴗ•๑)づ',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-09-05T00:00:00',
                fagsystem: 'OEBS',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140290337',
                fagsaksnummer: '¯\\_(ツ)_/¯',
                tilhorendeDokumenter: [
                    {
                        id: '2a998470-6bf9-4189-96bc-6b7b911fb752',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-05-02T11:35:15',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453870141',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454264969',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454249479',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454255619',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454255620',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140290337',
                        tilhorendeFagsaksid: '¯\\_(ツ)_/¯',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-09-05T00:00:00',
                fagsystem: 'OEBS',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140290338',
                fagsaksnummer: '1337',
                tilhorendeDokumenter: [],

                opprettet: '2023-09-05T00:00:00',
                fagsystem: 'OEBS',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'GRA',
                temanavn: 'Gravferdsstønad',
                saksid: '140290403',
                fagsaksnummer: '3014B01',
                tilhorendeDokumenter: [
                    {
                        id: 'c3f48429-b6a6-45c5-af02-d187b659aab4',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2022-04-21T10:31:04',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453803259',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454186679',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140290403',
                        tilhorendeFagsaksid: '3014B01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRA',
                        temakodeVisning: 'Gravferdsstønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-09-06T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140290404',
                fagsaksnummer: 'Tull22',
                tilhorendeDokumenter: [
                    {
                        id: '61f1c9b1-83bc-48fc-a296-58da427d856f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-06-14T11:29:10',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453651064',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454033018',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140290404',
                        tilhorendeFagsaksid: 'Tull22',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-09-06T00:00:00',
                fagsystem: 'OEBS',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'GRU',
                temanavn: 'Grunn- og hjelpestønad',
                saksid: '140291718',
                fagsaksnummer: '3014E05',
                tilhorendeDokumenter: [
                    {
                        id: '5f7f3b2b-ff5b-4d6c-a3b7-52b60b0de6c4',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-01T10:45:35',

                        navn: 'ukjent',
                        journalpostId: '453999989',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454407980',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291718',
                        tilhorendeFagsaksid: '3014E05',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f7277a0e-a32d-459e-be7f-2ba3dc43127d',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-12T10:16:41',

                        navn: 'ukjent',
                        journalpostId: '453987183',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454393280',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291718',
                        tilhorendeFagsaksid: '3014E05',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '19d98b5a-c027-465b-ac0c-2a041f806448',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-08T11:24:35',

                        navn: 'ukjent',
                        journalpostId: '453986604',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454392585',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291718',
                        tilhorendeFagsaksid: '3014E05',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '13dd356f-f7e9-4527-94eb-f3902c42eca1',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T15:06:40',

                        navn: 'NISSÈ SNAKKESALIG',
                        journalpostId: '453901806',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454302191',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291718',
                        tilhorendeFagsaksid: '3014E05',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8388857f-9ddf-4a4f-a847-6afbb4f518c5',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T14:54:52',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453901804',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454302187',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454302188',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454302189',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291718',
                        tilhorendeFagsaksid: '3014E05',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '83dbaf4e-fc83-45b4-97df-e9cebb670a7a',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-10-13T16:57:52',

                        navn: 'ukjent',
                        journalpostId: '453847871',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454238112',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291718',
                        tilhorendeFagsaksid: '3014E05',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '9da7e880-3995-4e23-a9a5-c13bf0cb70ca',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-10-13T16:52:07',

                        navn: 'ukjent',
                        journalpostId: '453847868',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454238109',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291718',
                        tilhorendeFagsaksid: '3014E05',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '72c4af49-4167-4a6d-85ff-700d6423ca25',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-10-13T16:49:25',

                        navn: 'ukjent',
                        journalpostId: '453847867',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454238108',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291718',
                        tilhorendeFagsaksid: '3014E05',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-10-13T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'GRU',
                temanavn: 'Grunn- og hjelpestønad',
                saksid: '140291719',
                fagsaksnummer: '3014E02',
                tilhorendeDokumenter: [
                    {
                        id: '81aefb94-e069-40b4-a385-d19afe1a84e9',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-04-11T11:10:56',

                        navn: 'ukjent',
                        journalpostId: '453982086',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454387578',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291719',
                        tilhorendeFagsaksid: '3014E02',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a41ef4c8-2ad7-4437-a64d-d6e44a717c3e',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-04-11T09:54:10',

                        navn: 'ukjent',
                        journalpostId: '453982056',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454387524',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291719',
                        tilhorendeFagsaksid: '3014E02',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f905de02-da6e-42d2-9e4c-164892b738a1',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-11T13:21:26',

                        navn: 'ukjent',
                        journalpostId: '453897140',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454296889',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291719',
                        tilhorendeFagsaksid: '3014E02',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '3a99b9e6-84d1-40e7-a4fa-c47c8a8711af',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-11T12:58:59',

                        navn: 'ukjent',
                        journalpostId: '453897076',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454296831',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291719',
                        tilhorendeFagsaksid: '3014E02',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '98090fb3-e12d-45dc-8e75-9140350b7581',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2023-10-13T16:56:59',

                        navn: 'ukjent',
                        journalpostId: '453847870',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454238111',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140291719',
                        tilhorendeFagsaksid: '3014E02',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'GRU',
                        temakodeVisning: 'Grunn- og hjelpestønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-10-13T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'EYB',
                temanavn: 'Barnepensjon',
                saksid: '140293243',

                tilhorendeDokumenter: [
                    {
                        id: '068a0fd8-ebd3-4106-b1a7-e7e85d8a266d',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2023-11-30T18:29:28',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453853571',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454245288',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140293243',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-11-21T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'EYO',
                temanavn: 'Omstillingsstønad',
                saksid: '140293585',

                tilhorendeDokumenter: [
                    {
                        id: 'd55c5141-5eb3-4ca5-b519-022f74abe4fe',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2023-11-30T18:30:43',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453853572',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454245289',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140293585',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYO',
                        temakodeVisning: 'Omstillingsstønad',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2023-11-30T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd',
                saksid: '140294393',
                fagsaksnummer: '200069353',
                tilhorendeDokumenter: [
                    {
                        id: '95ca1e4d-c7e9-42fc-878b-1c2296b88177',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-21T12:20:01',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454002083',
                        hoveddokument: {
                            tittel: 'Pågående samtale med NAV - 21.07.2025 - Barnetrygd',
                            dokumentreferanse: '454410353',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140294393',
                        tilhorendeFagsaksid: '200069353',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a1ce1a3c-703c-478a-82fa-7688bf370ed1',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-21T10:17:24',

                        navn: 'ukjent',
                        journalpostId: '454002053',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 21.07.2025 - ',
                            dokumentreferanse: '454410322',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140294393',
                        tilhorendeFagsaksid: '200069353',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '365e7314-ab93-41b3-b299-3a90a634e777',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-09-04T14:37:33',

                        navn: 'VAKKER FASTTELEFONI',
                        journalpostId: '453886822',
                        hoveddokument: {
                            tittel: 'Serviceklage',
                            dokumentreferanse: '454280980',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140294393',
                        tilhorendeFagsaksid: '200069353',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '974802b2-b05d-486c-8c28-33e3f5214efc',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-08-30T15:37:43',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453883264',
                        hoveddokument: {
                            tittel: 'fdfdf',
                            dokumentreferanse: '454280395',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140294393',
                        tilhorendeFagsaksid: '200069353',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f4a74808-eb6b-4494-8930-f4586270a1d7',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-08-30T11:47:05',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453883190',
                        hoveddokument: {
                            tittel: 'tttrt',
                            dokumentreferanse: '454280345',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140294393',
                        tilhorendeFagsaksid: '200069353',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'b683d537-7456-43e0-9d65-0884d5b33eaf',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-01-09T12:59:13',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453859800',
                        hoveddokument: {
                            tittel: 'VANL Brev',
                            dokumentreferanse: '454249479',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140294393',
                        tilhorendeFagsaksid: '200069353',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-01-08T00:00:00',
                fagsystem: 'BA',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'TSO',
                temanavn: 'Tilleggsstønad',
                saksid: '140294536',

                tilhorendeDokumenter: [],

                opprettet: '2024-01-11T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'OPP',
                temanavn: 'Oppfølging',
                saksid: '140294943',
                fagsaksnummer: '10695768',
                tilhorendeDokumenter: [
                    {
                        id: 'f781705e-b770-4b1c-9d52-c053ab64be60',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T14:51:07',

                        navn: 'SKOLÉ TØRR',
                        journalpostId: '453901825',
                        hoveddokument: {
                            tittel: 'Søknad om gjenopptak av arbeidsavklaringspenger',
                            dokumentreferanse: '454302211',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'vedlegg: 1',
                                dokumentreferanse: '454302212',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 2',
                                dokumentreferanse: '454302213',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140294943',
                        tilhorendeFagsaksid: '10695768',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'OPP',
                        temakodeVisning: 'Oppfølging',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f969cc20-f6c3-41f8-b61b-1bd45fde36ff',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-04T14:21:57',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453896011',
                        hoveddokument: {
                            tittel: 'Aktivitetsplan',
                            dokumentreferanse: '454295636',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140294943',
                        tilhorendeFagsaksid: '10695768',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'OPP',
                        temakodeVisning: 'Oppfølging',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-01-23T00:00:00',
                fagsystem: 'AO01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'FUL',
                temanavn: 'Fullmakt',
                saksid: '140295395',

                tilhorendeDokumenter: [],

                opprettet: '2024-02-07T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'YRK',
                temanavn: 'Yrkesskade og menerstatning',
                saksid: '140295566',
                fagsaksnummer: '1203C01',
                tilhorendeDokumenter: [
                    {
                        id: 'b8a1130b-a9e4-4700-b460-4bd3760286b5',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-04-12T11:15:29',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453833186',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454220254',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454220255',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',
                                dokumentreferanse: '454220256',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140295566',
                        tilhorendeFagsaksid: '1203C01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'YRK',
                        temakodeVisning: 'Yrkesskade og menerstatning',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-02-14T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'FOS',
                temanavn: 'Forsikring',
                saksid: '140296225',
                fagsaksnummer: '1203D01',
                tilhorendeDokumenter: [
                    {
                        id: '9d42e5e2-97c7-4aea-aac7-b57b0f611d20',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-16T14:43:02',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454001819',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454410082',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140296225',
                        tilhorendeFagsaksid: '1203D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOS',
                        temakodeVisning: 'Forsikring',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '442e56a1-908c-4576-a4cf-332c60c7cb80',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-07-16T14:43:02',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454001818',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454410081',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140296225',
                        tilhorendeFagsaksid: '1203D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOS',
                        temakodeVisning: 'Forsikring',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'cc6b4982-c325-41aa-ab9a-dff21ad9240c',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-02-28T12:30:08',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453862063',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454255619',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454255620',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '*****',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140296225',
                        tilhorendeFagsaksid: '1203D01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOS',
                        temakodeVisning: 'Forsikring',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-02-28T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140297177',
                fagsaksnummer: '1203E01',
                tilhorendeDokumenter: [
                    {
                        id: '44dadac0-934a-471d-b51e-a23457a4bbde',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-04-12T11:21:17',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453833199',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454220293',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140297177',
                        tilhorendeFagsaksid: '1203E01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-04-02T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'SER',
                temanavn: 'Serviceklager',
                saksid: '140300104',

                tilhorendeDokumenter: [
                    {
                        id: 'fc2c2399-283a-4776-bce6-87c541979bfd',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-07T09:55:55',

                        navn: 'Blomstrede Byregion',
                        journalpostId: '453889283',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454287622',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140300104',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SER',
                        temakodeVisning: 'Serviceklager',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4770ae39-2f3b-428b-a2b0-cea204887d94',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-09-04T14:37:33',

                        navn: 'VAKKER FASTTELEFONI',
                        journalpostId: '453883721',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454280980',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140300104',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SER',
                        temakodeVisning: 'Serviceklager',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a6069abd-d1f5-4a0d-9df7-f39f73fbeffe',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-05-14T12:58:00',

                        navn: 'Test Testesen',
                        journalpostId: '453871546',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454266485',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140300104',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SER',
                        temakodeVisning: 'Serviceklager',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '01bdf54f-8ffa-4bae-94ef-19da1aa0bc62',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-05-08T15:24:51',

                        navn: 'Meg Selv',
                        journalpostId: '453870667',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454265560',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140300104',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SER',
                        temakodeVisning: 'Serviceklager',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'fd8b17fd-e5fe-4bbd-b2fc-e753adadbfd9',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-05-08T14:40:58',

                        navn: 'Meg Selv',
                        journalpostId: '453870658',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454265551',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140300104',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SER',
                        temakodeVisning: 'Serviceklager',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e9e997f6-e6a3-4c9f-ac3b-c20e0b0df35d',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-05-08T14:23:13',

                        navn: 'Meg Selv',
                        journalpostId: '453870650',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454265543',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140300104',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SER',
                        temakodeVisning: 'Serviceklager',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-05-08T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ERS',
                temanavn: 'Erstatning',
                saksid: '140301950',

                tilhorendeDokumenter: [],

                opprettet: '2024-06-10T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'ERS',
                temanavn: 'Erstatning',
                saksid: '140301965',
                fagsaksnummer: '0441A08',
                tilhorendeDokumenter: [
                    {
                        id: '39dd42dd-4cc4-4e51-8936-7db1eb7bbd82',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-18T13:13:50',

                        navn: 'ukjent',
                        journalpostId: '453898785',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454298737',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140301965',
                        tilhorendeFagsaksid: '0441A08',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ERS',
                        temakodeVisning: 'Erstatning',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0da02c50-55d0-46ce-95ce-bbb76585f03f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-05-14T12:58:00',

                        navn: 'Test Testesen',
                        journalpostId: '453874922',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454266485',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140301965',
                        tilhorendeFagsaksid: '0441A08',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'ERS',
                        temakodeVisning: 'Erstatning',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-06-10T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'AAP',
                temanavn: 'Arbeidsavklaringspenger',
                saksid: '140302830',
                fagsaksnummer: '4LDSUJK',
                tilhorendeDokumenter: [
                    {
                        id: '5a7b819e-969e-43a9-9c15-1c202cc09788',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-08-12T11:44:40',

                        navn: 'ukjent',
                        journalpostId: '454005817',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 12.08.2025 - ',
                            dokumentreferanse: '454414636',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '65dd5379-39bb-4388-9474-7e95b7c7d294',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-08-12T11:43:40',

                        navn: 'ukjent',
                        journalpostId: '454005816',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 12.08.2025 - ',
                            dokumentreferanse: '454414635',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0a513e78-3f03-47cc-8746-7f672f09cd40',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-21T10:14:41',

                        navn: 'ukjent',
                        journalpostId: '454002052',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 21.07.2025 - ',
                            dokumentreferanse: '454410321',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'b5aefee5-fbbf-4940-8d42-b76083ae5a42',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-16T14:42:04',

                        navn: 'ukjent',
                        journalpostId: '454001817',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 16.07.2025 - ',
                            dokumentreferanse: '454410080',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '143879a3-8bff-4db2-874b-c65dc9469d59',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-16T14:42:04',

                        navn: 'ukjent',
                        journalpostId: '454001816',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 16.07.2025 - ',
                            dokumentreferanse: '454410079',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '53bf0118-5de2-4772-bf8f-8b6681c57f8b',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-07-02T00:30:17',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454000207',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 01.07.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454408207',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a485d018-1d1e-4feb-a917-d1c4ee5058d7',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-01T11:09:36',

                        navn: 'ukjent',
                        journalpostId: '454000015',
                        hoveddokument: {
                            tittel: 'Førstegangsnotat AAP',
                            dokumentreferanse: '454407969',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '09387307-8477-46b7-aaea-3d628caeb26d',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-01T09:33:01',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453999949',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 01.07.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454407927',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1d8db010-340e-42ce-a077-40c78c5a3cc2',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-07-01T09:33:01',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453999948',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 01.07.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454407926',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'ab5ef46f-a70f-4e5c-af18-5cbeb6fe4430',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-01T09:21:52',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453999945',
                        hoveddokument: {
                            tittel: 'Pågående samtale med NAV - 01.07.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454407923',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e9f18ec0-b25d-4160-b498-13acc368c5c6',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-02-05T16:40:42',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453941649',
                        hoveddokument: {
                            tittel: 'ff',
                            dokumentreferanse: '454343710',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Førstesideark',
                                dokumentreferanse: '454343740',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c20761a9-1c33-4da6-a775-247b2a144d18',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-01-30T10:20:10',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453932485',
                        hoveddokument: {
                            tittel: 'fff',
                            dokumentreferanse: '454334521',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Anmodning om avgjørelse av kompetanse',
                                dokumentreferanse: '453846356',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Søknad om inkluderingstilskudd',
                                dokumentreferanse: '453874168',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Uttalelse tilbakekreving',
                                dokumentreferanse: '453874169',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a504374a-63b9-43e9-849d-83ebe95877ce',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-18T12:52:42',

                        navn: 'ukjent',
                        journalpostId: '453911934',
                        hoveddokument: {
                            tittel: 'Vurdering av barnets beste',
                            dokumentreferanse: '454313072',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a387161c-132b-410c-96c5-f339afde080e',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-09T10:02:21',

                        navn: 'ukjent',
                        journalpostId: '453906109',
                        hoveddokument: {
                            tittel: 'Vurdering av barnets beste',
                            dokumentreferanse: '454306824',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1f8e5f6e-7eb8-4d8c-989d-dd91fa5c222c',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-28T13:59:49',

                        navn: 'ukjent',
                        journalpostId: '453902094',
                        hoveddokument: {
                            tittel: 'test 2811 ',
                            dokumentreferanse: '454302481',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'fdf02298-8ff8-48f6-88fe-774092afe5d2',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T14:51:07',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453901803',
                        hoveddokument: {
                            tittel: 'Søknad om gjenopptak av arbeidsavklaringspenger',
                            dokumentreferanse: '454302184',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'vedlegg: 1',
                                dokumentreferanse: '454302185',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 2',
                                dokumentreferanse: '454302186',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '6c38ac80-c88f-4f1a-8ed9-7d063d65e913',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-11-26T09:19:42',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453900402',
                        hoveddokument: {
                            tittel: 'O-brev',
                            dokumentreferanse: '454300639',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4bd94531-b288-4efa-b338-b5b90a31984c',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-11-20T09:17:58',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453899128',
                        hoveddokument: {
                            tittel: 'Melding om vedtak',
                            dokumentreferanse: '454299207',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Førstegangsnotat AAP',
                                dokumentreferanse: '454296891',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '7c03d6b2-215f-4fe2-9b5e-745b72b6a600',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-11T13:22:21',

                        navn: 'ukjent',
                        journalpostId: '453897142',
                        hoveddokument: {
                            tittel: 'Førstegangsnotat AAP',
                            dokumentreferanse: '454296891',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '43546ab7-ff63-4ec9-95e7-c240ca71dcdb',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-08T09:16:37',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453896791',
                        hoveddokument: {
                            tittel: 'Søknad om gjenopptak av arbeidsavklaringspenger',
                            dokumentreferanse: '454296502',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'vedlegg: 1',
                                dokumentreferanse: '454296503',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 2',
                                dokumentreferanse: '454296504',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Inntektsopplysninger',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '355f6cef-574d-4565-92cb-ff6fdc82d2d9',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-11-04T08:43:35',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453895778',
                        hoveddokument: {
                            tittel: 'Foreleggelse ROL',
                            dokumentreferanse: '454295411',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Vedtak test',
                                dokumentreferanse: '454293563',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '67ad5a79-03fa-41ae-b165-d69fc0d93d4f',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-28T15:02:35',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453894334',
                        hoveddokument: {
                            tittel: 'Vedtak test',
                            dokumentreferanse: '454293563',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1df7cb4f-d97a-4004-9746-50392549509b',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-25T11:02:15',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453893344',
                        hoveddokument: {
                            tittel: 'Test',
                            dokumentreferanse: '454292492',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '7de1a2eb-4f80-4951-909b-1e3372581862',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-08T13:04:32',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453889618',
                        hoveddokument: {
                            tittel: 'okeiiii',
                            dokumentreferanse: '454288012',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Serviceklage',
                                dokumentreferanse: '454280980',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Test av Hest&Fest',
                                dokumentreferanse: '454287981',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8367d8db-7457-4e50-8926-cf290d561ed4',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-08T11:20:12',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453889563',
                        hoveddokument: {
                            tittel: 'jhgf',
                            dokumentreferanse: '454287955',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Vedtak om mye penger',
                                dokumentreferanse: '454278376',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'test',
                                dokumentreferanse: '454282256',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Beregninger',
                                dokumentreferanse: '454282265',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'test dist',
                                dokumentreferanse: '454282266',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'jajaja så er vi her igjen Aremark',
                                dokumentreferanse: '454282301',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'test send',
                                dokumentreferanse: '454282407',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'sender brev!',
                                dokumentreferanse: '454282410',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Se pao PDF',
                                dokumentreferanse: '454282445',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Innhenting av kontoopplysninger',
                                dokumentreferanse: '454282807',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'tester editor feilmelding',
                                dokumentreferanse: '454283333',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'test2',
                                dokumentreferanse: '454283355',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'ggg',
                                dokumentreferanse: '454283601',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Metr',
                                dokumentreferanse: '454283647',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'ccxccd',
                                dokumentreferanse: '454283651',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'tittel test',
                                dokumentreferanse: '454283942',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'test',
                                dokumentreferanse: '454283962',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: '   vvv',
                                dokumentreferanse: '454284232',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'test notat abcde',
                                dokumentreferanse: '454284364',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'ldkfldkflkd',
                                dokumentreferanse: '454284677',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'TEST av vedtak',
                                dokumentreferanse: '454287954',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'ca88f1b9-66a1-453e-bd0c-1485f62ab593',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-09-24T14:23:17',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453886938',
                        hoveddokument: {
                            tittel: 'ldkfldkflkd',
                            dokumentreferanse: '454284677',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Serviceklage',
                                dokumentreferanse: '454280980',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'test notat abcde',
                                dokumentreferanse: '454284364',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '3edbeb9a-0d5c-4a5b-ae8c-d79cd18a9b98',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-09-23T13:43:47',

                        navn: 'ukjent',
                        journalpostId: '453886587',
                        hoveddokument: {
                            tittel: '   vvv',
                            dokumentreferanse: '454284232',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '54c7560b-bc23-4d74-a70e-2e6b5101c5a2',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-08-30T12:32:07',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453883143',
                        hoveddokument: {
                            tittel: 'Vedtak',
                            dokumentreferanse: '454280269',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '894b870d-bb42-4491-bd90-6faa3541701d',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-08-26T13:50:49',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453882351',
                        hoveddokument: {
                            tittel: 'Vedtak',
                            dokumentreferanse: '454279391',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'adf50715-d5b4-45b7-83c9-674651034426',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-08-22T16:04:35',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453881910',
                        hoveddokument: {
                            tittel: 'Test3',
                            dokumentreferanse: '454278949',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4ea002a0-d884-4787-a215-e33674a62012',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-01-18T10:06:50',

                        navn: 'GLOBUS BLAUT',
                        journalpostId: '453857882',
                        hoveddokument: {
                            tittel: 'Søknad om parykk',
                            dokumentreferanse: '454250771',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2fed2f0a-a3b9-4b79-9463-f3c0ff4873ca',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-01-15T14:24:51',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453857134',
                        hoveddokument: {
                            tittel: 'Rettsavgjørelse',
                            dokumentreferanse: '454249988',
                            kanVises: true,
                            logiskDokument: false,
                            skjerming: 'POL',
                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c1798b49-3bee-4e30-a430-6bbc01631b4b',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-11-22T08:30:15',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453759520',
                        hoveddokument: {
                            tittel: 'Medisinske opplysninger',
                            dokumentreferanse: '454142227',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'bb14ea72-5220-4b6d-925f-14f3202b0639',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-08-25T15:21:14',

                        navn: 'NR',
                        journalpostId: '453654631',
                        hoveddokument: {
                            tittel: 'Faktura',
                            dokumentreferanse: '454036938',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140302830',
                        tilhorendeFagsaksid: '4LDSUJK',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-06-27T00:00:00',
                fagsystem: 'KELVIN',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                saksid: '140304863',
                fagsaksnummer: '1/2024',
                tilhorendeDokumenter: [],

                opprettet: '2024-08-30T00:00:00',
                fagsystem: 'NEESSI',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                saksid: '140304864',
                fagsaksnummer: '2/2024',
                tilhorendeDokumenter: [
                    {
                        id: '60bec0c3-dae2-4372-a156-4ad41aaa5e1c',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-08T11:16:35',

                        navn: 'ukjent',
                        journalpostId: '453986606',
                        hoveddokument: {
                            tittel: 'Vurdering av barnets beste',
                            dokumentreferanse: '454392604',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140304864',
                        tilhorendeFagsaksid: '2/2024',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-08-30T00:00:00',
                fagsystem: 'NEESSI',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'AAP',
                temanavn: 'Arbeidsavklaringspenger',
                saksid: '140307910',
                fagsaksnummer: '4LQVB9S',
                tilhorendeDokumenter: [
                    {
                        id: '8797f978-bf4f-4ca3-98e3-1ca5fb3d499c',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2025-06-05T09:21:54',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453994022',
                        hoveddokument: {
                            tittel: 'Søknad om arbeidsavklaringspenger (AAP)',
                            dokumentreferanse: '454401258',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '585d621b-e4d7-4ed4-8e74-c3a32449e352',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2025-03-11T13:13:25',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453971628',
                        hoveddokument: {
                            tittel: 'Overføring av opplysninger om arbeidsavklaringspenger fra NAV til offentlig tjenestepensjonsordning',
                            dokumentreferanse: '454375233',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e05f95f9-3d9d-4710-9b4b-a3941df9067d',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-12-16T10:50:30',

                        navn: 'VÅKEN UINSPIRERT AÐVOKAT',
                        journalpostId: '453910424',
                        hoveddokument: {
                            tittel: 'test',
                            dokumentreferanse: '454311412',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Førstegangsnotat AAP',
                                dokumentreferanse: '454310323',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '70380c5c-a3c4-465e-bc5a-a05c7c2bf19d',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-09T09:01:13',

                        navn: 'ukjent',
                        journalpostId: '453906032',
                        hoveddokument: {
                            tittel: 'bb',
                            dokumentreferanse: '454306744',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2cfb4e34-4197-4dd8-9852-4cd071f2eee7',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-06T15:30:56',

                        navn: 'ukjent',
                        journalpostId: '453905848',
                        hoveddokument: {
                            tittel: 'test 612',
                            dokumentreferanse: '454306558',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd84a9811-592c-43a8-8450-7497e6c5cd3f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-12-05T10:19:56',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453905342',
                        hoveddokument: {
                            tittel: 'Ettersendelse til Søknad om reisestønad (Arbeidsavklaringspenger)',
                            dokumentreferanse: '454305953',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '55473020-2d47-4f73-b177-bbb7db483aba',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-28T14:08:59',

                        navn: 'ukjent',
                        journalpostId: '453902081',
                        hoveddokument: {
                            tittel: 'test 2811 2',
                            dokumentreferanse: '454302524',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '68ca8454-60aa-403a-867a-db30e2eedcfe',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T14:51:07',

                        navn: 'NISSÉ RIMELIG',
                        journalpostId: '453901824',
                        hoveddokument: {
                            tittel: 'Søknad om gjenopptak av arbeidsavklaringspenger',
                            dokumentreferanse: '454302208',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'vedlegg: 1',
                                dokumentreferanse: '454302209',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 2',
                                dokumentreferanse: '454302210',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0e0ea5de-2017-49eb-a37f-317c51a5fb54',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T14:51:07',

                        navn: 'NISSÉ RIMELIG',
                        journalpostId: '453901823',
                        hoveddokument: {
                            tittel: 'Søknad om gjenopptak av arbeidsavklaringspenger',
                            dokumentreferanse: '454302205',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'vedlegg: 1',
                                dokumentreferanse: '454302206',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 2',
                                dokumentreferanse: '454302207',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2eb3ca41-990e-4ffb-bcfc-7757d493f4be',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-27T14:51:05',

                        navn: 'TÉST STOLT',
                        journalpostId: '453901802',
                        hoveddokument: {
                            tittel: 'Søknad om gjenopptak av arbeidsavklaringspenger',
                            dokumentreferanse: '454302181',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'vedlegg: 1',
                                dokumentreferanse: '454302182',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 2',
                                dokumentreferanse: '454302183',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'b1ebf226-38f2-4485-9f54-f1d501550e67',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-26T13:02:45',

                        navn: 'ukjent',
                        journalpostId: '453900535',
                        hoveddokument: {
                            tittel: 'TITTEL',
                            dokumentreferanse: '454300781',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '1d7d3156-4665-4fea-8021-7577187bcafd',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-18T10:22:04',

                        navn: 'ukjent',
                        journalpostId: '453898695',
                        hoveddokument: {
                            tittel: 'Vurdering av barnets beste',
                            dokumentreferanse: '454298601',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '142c4fc8-0147-44e4-a532-ccf7c62a158f',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-10-16T09:27:12',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453891252',
                        hoveddokument: {
                            tittel: 'Test status 1',
                            dokumentreferanse: '454289962',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '57e48bd9-c0be-480a-9823-22799833783d',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-09-11T12:59:49',

                        navn: 'AHMAD PETTER',
                        journalpostId: '453884848',
                        hoveddokument: {
                            tittel: 'Kontoopplysninger',
                            dokumentreferanse: '454282258',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140307910',
                        tilhorendeFagsaksid: '4LQVB9S',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-10-14T00:00:00',
                fagsystem: 'KELVIN',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HEL',
                temanavn: 'Helsetjenester og ortopediske hjelpemidler',
                saksid: '140308033',
                fagsaksnummer: '1203G01',
                tilhorendeDokumenter: [],

                opprettet: '2024-10-15T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd',
                saksid: '140308818',
                fagsaksnummer: '200085205',
                tilhorendeDokumenter: [
                    {
                        id: 'c83816e1-3e48-43fc-b7ff-e4fec58092d3',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-12-06T15:33:07',

                        navn: 'ukjent',
                        journalpostId: '453905849',
                        hoveddokument: {
                            tittel: 'Vurdering av barnets beste',
                            dokumentreferanse: '454306559',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140308818',
                        tilhorendeFagsaksid: '200085205',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4db003a3-0f23-466b-9a76-ba34bb0cc21e',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2024-11-18T10:41:01',

                        navn: 'ukjent',
                        journalpostId: '453898717',
                        hoveddokument: {
                            tittel: 'Vurdering av barnets beste',
                            dokumentreferanse: '454298649',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140308818',
                        tilhorendeFagsaksid: '200085205',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a0a98201-446e-4a9c-bfcc-24bffc65349f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-04-12T10:55:51',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453833155',
                        hoveddokument: {
                            tittel: 'NAV 90-00.08 K Klage',
                            dokumentreferanse: '454220214',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140308818',
                        tilhorendeFagsaksid: '200085205',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'dc295e8e-e7ce-4e91-96df-439c10862cf2',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-11-06T10:22:27',

                        navn: 'RANDABERG KOMMUNE SKOLE',
                        journalpostId: '453636937',
                        hoveddokument: {
                            tittel: 'NAV 11-13.06 Søknad om gjenopptak av arbeidsavklaringspenger',
                            dokumentreferanse: '454017193',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'vedlegg: 3',
                                dokumentreferanse: '454017192',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 4',
                                dokumentreferanse: '454017194',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 1',
                                dokumentreferanse: '454017195',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 5',
                                dokumentreferanse: '454017196',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'vedlegg: 2',
                                dokumentreferanse: '454017197',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            },
                            {
                                tittel: 'Bekreftelse på utenlandsopphold',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140308818',
                        tilhorendeFagsaksid: '200085205',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-10-24T00:00:00',
                fagsystem: 'BA',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'FOR',
                temanavn: 'Foreldre- og svangerskapspenger',
                saksid: '140309012',
                fagsaksnummer: '352018938',
                tilhorendeDokumenter: [
                    {
                        id: 'e175f5e8-f1d9-4ab0-9bae-8a8e2bec9ce4',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:42',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893775',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292953',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'df68498a-c2ff-405a-8342-e85f6c77e4e4',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:35',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893774',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292952',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c027b570-0e77-4e8d-905c-79fe6ce04f35',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:30',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893773',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292951',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e634ab3a-b501-4c0d-88dc-90a0f0058f5d',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:30',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893772',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292950',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '7c955ef3-6804-4754-adc3-d3a1cb871038',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:30',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893771',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292949',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'e5cc1466-8c96-49a6-800b-9ee0ac618b6c',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:29',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893769',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292947',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'dd9f5a29-77a5-4cdf-a01f-0dc987ac5565',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:29',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893768',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292946',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '69f7b7fe-fa59-47f9-9fee-785addb95db6',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:28',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893767',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292945',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0bc68cbf-c9f6-40c6-b7bd-f31253be79d2',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:26',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893766',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292944',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '661bc9e9-4aab-4f84-a840-5bc437d43b8f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:37',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893738',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292903',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a97c5bd2-4770-4d2d-830e-dde85da5aa62',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T15:39:23',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893737',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292902',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '75c66c02-fa7f-4caa-911f-0c14931cdc47',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:40:26',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893518',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292701',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a6c49263-9d1a-4e32-9b41-79eab52940d0',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:40:24',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893517',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292700',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f67a8064-0ae7-48b6-8c1d-90d81e5bf7ec',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:40:23',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893516',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292699',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '966c6c26-93ce-4a7c-b444-0a5aa5998121',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:40:21',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893515',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292698',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'b7f5cb23-4666-4b81-91c8-689f721a66a0',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:26',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893514',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292697',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '154253e6-da89-4379-bc26-4e4e08af8d34',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:25',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893513',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292696',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'b12d361c-27ef-477e-b399-398dc12c6586',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:25',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893512',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292695',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '135f3ee2-09e3-425e-9933-0088c0648bd5',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:23',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893511',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292694',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4d06c7b4-3b7a-468b-91ca-39b78da540fa',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:22',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893510',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292693',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd1f98fd9-b244-4b29-8daf-f7b35ce17bd0',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:19',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893509',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292692',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'c18da72c-7612-47fb-8968-d77a91a98d71',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:15',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893508',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292691',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f7e880ea-5296-4a3d-93be-e007b5e0d48a',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:11',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893507',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292690',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4128b2c3-1027-4170-b83f-a1eff9694adf',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:11',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893506',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292689',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f0f84774-dbbe-4fa5-b143-a8c569077fec',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:10',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893505',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292688',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8e57338d-d9d9-4b73-9c60-00ec533c8b83',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:10',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893504',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292687',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'db7520d2-918b-47ce-9d46-d246e9454205',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:09',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893503',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292686',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd567a084-9bb6-4849-aecb-baa4962155f8',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:31:25',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893480',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292633',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '23d09eaa-0eb4-4be8-b237-8dfb715a5646',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:31:23',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893479',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292632',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '4f96b70e-6f13-4f09-bc2b-e71fb6237837',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:31:23',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893478',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292631',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'bb0c333b-9d5b-44f6-9234-b3c050171275',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:26',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893418',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292648',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '9ec3d9bb-d6e3-4ff2-9074-15e8908a62d5',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:39:25',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893417',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292647',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'de2115f8-233c-467f-841d-7eff84120108',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:31:23',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893415',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292645',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '089743af-6772-420f-97a1-15036e1b7c5a',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-25T12:31:22',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453893414',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454292644',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140309012',
                        tilhorendeFagsaksid: '352018938',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'FOR',
                        temakodeVisning: 'Foreldre- og svangerskapspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-10-25T00:00:00',
                fagsystem: 'FS36',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                saksid: '140312944',
                fagsaksnummer: '3/2024',
                tilhorendeDokumenter: [
                    {
                        id: 'd754bd20-ba66-4637-8853-f2af631c7a4a',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-07-07T12:08:45',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454001015',
                        hoveddokument: {
                            tittel: 'U1 Perioder av betydning for retten til dagpenger',
                            dokumentreferanse: '454409130',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140312944',
                        tilhorendeFagsaksid: '3/2024',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '72f0fe3e-901d-4946-8bb8-6dcacd0ad76d',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-06-03T16:28:42',

                        navn: 'ukjent',
                        journalpostId: '453993581',
                        hoveddokument: {
                            tittel: 'Vurdering av barnets beste',
                            dokumentreferanse: '454400819',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140312944',
                        tilhorendeFagsaksid: '3/2024',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2024-12-09T00:00:00',
                fagsystem: 'NEESSI',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'EYB',
                temanavn: 'Barnepensjon',
                saksid: '140328769',
                fagsaksnummer: '8897',
                tilhorendeDokumenter: [
                    {
                        id: '9387287b-c78e-46bd-aca3-75b3023b9ad7',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-08-12T14:59:04',

                        navn: 'ukjent',
                        journalpostId: '454005990',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454414778',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140328769',
                        tilhorendeFagsaksid: '8897',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2e1688fd-35f9-4ef3-9f50-07d4bc135b01',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-08-12T15:00:47',

                        navn: 'ukjent',
                        journalpostId: '454005963',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454414833',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140328769',
                        tilhorendeFagsaksid: '8897',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a6b1a056-109f-45d7-840e-e375806f717e',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-08-06T14:52:22',

                        navn: 'ukjent',
                        journalpostId: '454004963',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454413615',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140328769',
                        tilhorendeFagsaksid: '8897',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2d5c32d9-1e5d-496a-9aab-77e8034acebf',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-18T10:28:28',

                        navn: 'ukjent',
                        journalpostId: '454001947',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454410210',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140328769',
                        tilhorendeFagsaksid: '8897',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd6828bca-69b5-46aa-86b4-b5a0b7ea83f7',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-18T10:28:27',

                        navn: 'ukjent',
                        journalpostId: '454001946',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454410209',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140328769',
                        tilhorendeFagsaksid: '8897',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2aefe50a-8e1d-48f4-88c4-c6775cffa64d',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-07-01T09:34:01',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453999950',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454407928',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140328769',
                        tilhorendeFagsaksid: '8897',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '5580d0ee-8539-4a46-9a39-3e828ff178e4',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-06-21T00:30:27',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453998254',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454405964',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140328769',
                        tilhorendeFagsaksid: '8897',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '58fa8cd6-f1ab-4139-9126-6d50a9bc050d',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-06-20T15:15:10',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453998191',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454405869',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140328769',
                        tilhorendeFagsaksid: '8897',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8b7a8944-8664-4842-96ec-f91d59e7d661',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-03-17T10:46:15',

                        navn: 'ukjent',
                        journalpostId: '453973445',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454377334',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140328769',
                        tilhorendeFagsaksid: '8897',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'EYB',
                        temakodeVisning: 'Barnepensjon',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-03-17T00:00:00',
                fagsystem: 'EY',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'SYK',
                temanavn: 'Sykepenger',
                saksid: '140329413',
                fagsaksnummer: '3012F01',
                tilhorendeDokumenter: [
                    {
                        id: '1dd5f90a-84ed-407a-a6c1-e78c8e75522f',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-03-24T00:30:04',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453977009',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454381761',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140329413',
                        tilhorendeFagsaksid: '3012F01',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SYK',
                        temakodeVisning: 'Sykepenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-03-22T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd',
                saksid: '140331021',
                fagsaksnummer: '3012B07',
                tilhorendeDokumenter: [
                    {
                        id: '95b48003-d572-4000-809f-c4833a1b2aee',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-15T00:30:05',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453982375',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 14.04.2025 - Barnetrygd',
                            dokumentreferanse: '454387919',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140331021',
                        tilhorendeFagsaksid: '3012B07',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-04-15T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'AAP',
                temanavn: 'Arbeidsavklaringspenger',
                saksid: '140331022',
                fagsaksnummer: '14416026',
                tilhorendeDokumenter: [
                    {
                        id: '993acda1-cf92-4159-abbb-76faf82e8d47',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-06-21T00:30:26',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453998252',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 20.06.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454405932',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140331022',
                        tilhorendeFagsaksid: '14416026',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'deb2973b-ef80-43a3-a7a4-8b9923f72b69',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-22T09:55:55',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453990776',
                        hoveddokument: {
                            tittel: 'Pågående samtale med NAV - 22.05.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454397572',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140331022',
                        tilhorendeFagsaksid: '14416026',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'ccea6a55-ce01-47fc-9e0d-558844e70ef2',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-15T00:30:07',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453982409',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 14.04.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454387923',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140331022',
                        tilhorendeFagsaksid: '14416026',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'bb70727e-36b4-416c-97d9-a6b2ae48bc20',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-15T00:30:06',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453982406',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 14.04.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454387920',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140331022',
                        tilhorendeFagsaksid: '14416026',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'ade7a660-37bd-4299-a70e-23c847431772',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-11-16T08:43:04',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453638110',
                        hoveddokument: {
                            tittel: 'VANL Annet skjema (ikke NAV-skjema)',
                            dokumentreferanse: '454018679',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140331022',
                        tilhorendeFagsaksid: '14416026',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '20c2478c-385c-4ae4-9d31-3fd8b6222cef',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-11-09T15:44:50',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453637207',
                        hoveddokument: {
                            tittel: 'NAV 10-07.17 Søknad om refusjon av reiseutgifter - bil',
                            dokumentreferanse: '454017574',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140331022',
                        tilhorendeFagsaksid: '14416026',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-04-15T00:00:00',
                fagsystem: 'AO01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'SYK',
                temanavn: 'Sykepenger',
                saksid: '140331023',
                fagsaksnummer: '3124F81',
                tilhorendeDokumenter: [
                    {
                        id: '642acaed-8b15-46d0-80bb-cd6dcb230331',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-15T00:30:06',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453982407',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454387921',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140331023',
                        tilhorendeFagsaksid: '3124F81',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'SYK',
                        temakodeVisning: 'Sykepenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-04-15T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                saksid: '140331024',
                fagsaksnummer: '1/2021',
                tilhorendeDokumenter: [
                    {
                        id: 'bedd6038-549b-4c01-b1a5-36573ccb35ed',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-07-07T10:10:57',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454000964',
                        hoveddokument: {
                            tittel: 'U1 Perioder av betydning for retten til dagpenger',
                            dokumentreferanse: '454409099',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140331024',
                        tilhorendeFagsaksid: '1/2021',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'b07d14bb-39a5-473b-84a2-f421c8f7fa57',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-22T09:52:12',

                        navn: 'ukjent',
                        journalpostId: '453990771',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 22.05.2025 - ',
                            dokumentreferanse: '454397567',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140331024',
                        tilhorendeFagsaksid: '1/2021',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a303f14a-677d-484b-a9ba-ce063668ee85',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-05-22T09:50:17',

                        navn: 'ukjent',
                        journalpostId: '453990768',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 22.05.2025 - ',
                            dokumentreferanse: '454397564',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140331024',
                        tilhorendeFagsaksid: '1/2021',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '2111beda-cc39-4671-88f2-e4ba90f89a3d',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-04-29T12:39:28',

                        navn: 'ukjent',
                        journalpostId: '453984399',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 08.04.2025 - ',
                            dokumentreferanse: '454390134',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140331024',
                        tilhorendeFagsaksid: '1/2021',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '9693d05e-4adc-4717-abeb-adefc22a9c11',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-04-15T00:30:09',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453982412',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 14.04.2025 - Dagpenger',
                            dokumentreferanse: '454387926',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140331024',
                        tilhorendeFagsaksid: '1/2021',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-04-15T00:00:00',
                fagsystem: 'AO11',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd',
                saksid: '140331557',
                fagsaksnummer: '999951',
                tilhorendeDokumenter: [
                    {
                        id: 'e2e40033-e066-4b9f-a5cd-3bd555c4c87d',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-10-05T09:55:22',

                        navn: 'AREMARK  TESTFAMILIEN',
                        journalpostId: '453657589',
                        hoveddokument: {
                            tittel: 'NAV 33-00.09 Søknad om utvidet barnetrygd',
                            dokumentreferanse: '454040176',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140331557',
                        tilhorendeFagsaksid: '999951',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-04-24T00:00:00',
                fagsystem: 'BA',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd',
                saksid: '140331794',
                fagsaksnummer: '999952',
                tilhorendeDokumenter: [
                    {
                        id: '140ad0a5-5eae-487d-96f3-ddddae9cc53f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2021-10-19T13:18:07',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453733407',
                        hoveddokument: {
                            tittel: 'NAV 33-00.07 Søknad om ordinær barnetrygd',
                            dokumentreferanse: '454116008',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140331794',
                        tilhorendeFagsaksid: '999952',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-04-25T00:00:00',
                fagsystem: 'BA',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140332206',
                fagsaksnummer: 'hjjh',
                tilhorendeDokumenter: [
                    {
                        id: '48d38e7f-bf1a-436e-920a-b935d65ff17c',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-11-04T14:43:36',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453896016',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454295674',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140332206',
                        tilhorendeFagsaksid: 'hjjh',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'HJE',
                        temakodeVisning: 'Hjelpemidler',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-04-28T00:00:00',
                fagsystem: 'OEBS',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd',
                saksid: '140333009',
                fagsaksnummer: '1000001',
                tilhorendeDokumenter: [
                    {
                        id: '6ea6b31f-98f1-4f8f-b925-1e1a8f0d7d22',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-05-09T08:30:55',

                        navn: 'NAV ACCEPTANCE TEST 09',
                        journalpostId: '453986842',
                        hoveddokument: {
                            tittel: 'Melding/anmodning om informasjon',
                            dokumentreferanse: '454392922',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140333009',
                        tilhorendeFagsaksid: '1000001',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '03b76054-c9a3-4ef6-a466-4b42bbcfd270',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-05-09T08:33:03',

                        navn: 'NAV ACCEPTANCE TEST 09',
                        journalpostId: '453986809',
                        hoveddokument: {
                            tittel: 'Melding/anmodning om informasjon',
                            dokumentreferanse: '454392885',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '140333009',
                        tilhorendeFagsaksid: '1000001',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'd736b57d-c410-4d87-a9bf-5978d667be19',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2024-10-24T10:17:31',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453892892',
                        hoveddokument: {
                            tittel: 'NAV 33-00.15 Norsk sokkel - Årlig differanseutbetaling av barnetrygd',
                            dokumentreferanse: '454291948',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140333009',
                        tilhorendeFagsaksid: '1000001',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'BAR',
                        temakodeVisning: 'Barnetrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-05-04T00:00:00',
                fagsystem: 'BA',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'AAP',
                temanavn: 'Arbeidsavklaringspenger',
                saksid: '140334804',
                fagsaksnummer: '13722055',
                tilhorendeDokumenter: [
                    {
                        id: 'eab4ab8e-1f1d-4921-a224-6cd4c5f8db73',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-08-12T15:36:03',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454005977',
                        hoveddokument: {
                            tittel: 'Pågående samtale med NAV - 21.07.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454414877',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140334804',
                        tilhorendeFagsaksid: '13722055',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '9bf37216-98dd-4210-b464-635b39f5893e',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-25T08:44:53',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '454003097',
                        hoveddokument: {
                            tittel: 'Pågående samtale med NAV - 25.07.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454411604',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140334804',
                        tilhorendeFagsaksid: '13722055',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '8e212f41-1123-4b29-846a-6f482ed67ae7',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2025-06-24T13:16:07',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453998692',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 20.06.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454406478',
                            kanVises: true,
                            logiskDokument: false,
                            skjerming: 'POL',
                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '140334804',
                        tilhorendeFagsaksid: '13722055',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '57825dfd-ffd3-48da-a691-14a6bc512b2e',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-06-19T14:53:56',

                        navn: 'ukjent',
                        journalpostId: '453997927',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 19.06.2025 - Arbeidsavklaringspenger',
                            dokumentreferanse: '454405576',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140334804',
                        tilhorendeFagsaksid: '13722055',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f29a1651-d9ed-4018-b7d0-4418c6f05134',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2020-11-13T11:10:39',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453637821',
                        hoveddokument: {
                            tittel: 'Kontonummer',
                            dokumentreferanse: '454018370',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: 'Midlertidig adresse',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            },
                            {
                                tittel: 'Skifteattest',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            },
                            {
                                tittel: 'Legitimasjon',

                                kanVises: true,
                                logiskDokument: true,

                                erKassert: false
                            }
                        ],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140334804',
                        tilhorendeFagsaksid: '13722055',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AAP',
                        temakodeVisning: 'Arbeidsavklaringspenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-05-14T00:00:00',
                fagsystem: 'AO01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                saksid: '140335695',
                fagsaksnummer: '3014E03',
                tilhorendeDokumenter: [
                    {
                        id: 'b8c3e9a2-957d-47c7-85a8-74f600abaa8c',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-08-12T14:59:07',

                        navn: 'ukjent',
                        journalpostId: '454005991',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 12.08.2025 - Barnepensjon',
                            dokumentreferanse: '454414779',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140335695',
                        tilhorendeFagsaksid: '3014E03',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '89999c69-f257-4e73-87e4-1000cc4f420a',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-08-12T15:00:50',

                        navn: 'ukjent',
                        journalpostId: '454005964',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 12.08.2025 - Barnepensjon',
                            dokumentreferanse: '454414834',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140335695',
                        tilhorendeFagsaksid: '3014E03',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'f7e00751-b087-4c64-9a09-c3934ab211d8',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-08-06T14:52:32',

                        navn: 'ukjent',
                        journalpostId: '454004964',
                        hoveddokument: {
                            tittel: 'Samtale med NAV - 23.05.2025 - Barnepensjon',
                            dokumentreferanse: '454413616',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140335695',
                        tilhorendeFagsaksid: '3014E03',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'DAG',
                        temakodeVisning: 'Dagpenger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-05-19T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler',
                saksid: '140335712',
                fagsaksnummer: '3014E03',
                tilhorendeDokumenter: [],

                opprettet: '2025-05-19T00:00:00',
                fagsystem: 'IT01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'AKT',
                temanavn: 'AKT',
                saksid: '140341643',

                tilhorendeDokumenter: [
                    {
                        id: 'ad10ad02-4b06-4b48-b47c-981037024863',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-06-23T12:05:22',

                        navn: 'ukjent',
                        journalpostId: '453998354',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454406078',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140341643',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'AKT',
                        temakodeVisning: 'Aktivitetsplan med dialoger',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-06-23T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            },
            {
                temakode: 'PAI',
                temanavn: 'PAI',
                saksid: '140342204',

                tilhorendeDokumenter: [
                    {
                        id: '65f11b4b-3ceb-4927-850c-995bba3e25ec',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2025-07-01T10:45:12',

                        navn: 'ukjent',
                        journalpostId: '453999979',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454407963',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '140342204',

                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'PAI',
                        temakodeVisning: 'Innsyn',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2025-07-01T00:00:00',
                fagsystem: 'FS22',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: true,
                feilendeSystemer: []
            },
            {
                temakode: 'UFO',
                temanavn: 'Uføretrygd',
                saksid: '22904955',
                fagsaksnummer: '22904955',
                tilhorendeDokumenter: [
                    {
                        id: 'ed2d2107-f981-4036-a246-7f1c4322094b',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2024-12-16T11:11:13',

                        navn: 'ULYDIGROBUST UNØYAKTIG ÃDVOKAT',
                        journalpostId: '453910429',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454311419',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [
                            {
                                tittel: '*****',
                                dokumentreferanse: '454222760',
                                kanVises: true,
                                logiskDokument: false,

                                erKassert: false,
                                dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                            }
                        ],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.EKSTERN_PART,
                        tilhorendeSaksid: '22904955',
                        tilhorendeFagsaksid: '22904955',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'UFO',
                        temakodeVisning: 'Uføretrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'dee93378-76d3-4f9b-84d9-1b602cbaf25f',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-05-09T12:27:02',

                        navn: 'AREMARK TESTFAMILIEN',
                        journalpostId: '453835313',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454222760',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '22904955',
                        tilhorendeFagsaksid: '22904955',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'UFO',
                        temakodeVisning: 'Uføretrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'a22cc304-b374-4af4-a873-eff75a606a7a',
                        retning: DokumentmetadataRetning.INN,
                        dato: '2023-04-19T18:21:13',

                        navn: 'Noen',
                        journalpostId: '453833880',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454221093',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.EKSTERN_PART,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '22904955',
                        tilhorendeFagsaksid: '22904955',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'UFO',
                        temakodeVisning: 'Uføretrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: 'fc6e131e-5873-4d03-a63c-e55d488f0f35',
                        retning: DokumentmetadataRetning.INTERN,
                        dato: '2021-05-11T20:38:54',

                        navn: 'ukjent',
                        journalpostId: '453649381',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '454031193',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.NAV,
                        tilhorendeSaksid: '22904955',
                        tilhorendeFagsaksid: '22904955',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'UFO',
                        temakodeVisning: 'Uføretrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    },
                    {
                        id: '0f186cdc-4dfb-4f0c-8042-a71d88911217',
                        retning: DokumentmetadataRetning.UT,
                        dato: '2020-04-21T10:45:23',

                        navn: 'TESTFAMILIEN AREMARK',
                        journalpostId: '453503543',
                        hoveddokument: {
                            tittel: '*****',
                            dokumentreferanse: '453882632',
                            kanVises: true,
                            logiskDokument: false,

                            erKassert: false,
                            dokumentStatus: DokumentDokumentStatus.FERDIGSTILT
                        },
                        vedlegg: [],
                        avsender: DokumentmetadataAvsender.NAV,
                        mottaker: DokumentmetadataMottaker.SLUTTBRUKER,
                        tilhorendeSaksid: '22904955',
                        tilhorendeFagsaksid: '22904955',
                        baksystem: [DokumentmetadataBaksystem.SAF],
                        temakode: 'UFO',
                        temakodeVisning: 'Uføretrygd',
                        ettersending: false,
                        erJournalfort: true,
                        feil: {
                            inneholderFeil: false
                        }
                    }
                ],

                opprettet: '2016-01-01T00:00:00',
                fagsystem: 'PP01',
                baksystem: SaksDokumenterBaksystem.SAF,
                harTilgang: false,
                feilendeSystemer: []
            }
        ],
        temaer: [
            {
                temakode: 'MED',
                temanavn: 'Medlemskap'
            },
            {
                temakode: 'MOB',
                temanavn: 'Mobilitetsfremmende stønad'
            },
            {
                temakode: 'STO',
                temanavn: 'Regnskap/utbetaling'
            },
            {
                temakode: 'REH',
                temanavn: 'Rehabilitering'
            },
            {
                temakode: 'RVE',
                temanavn: 'Rettferdsvederlag'
            },
            {
                temakode: 'RPO',
                temanavn: 'Retting av personopplysninger'
            },
            {
                temakode: 'SUP',
                temanavn: 'Supplerende stønad'
            },
            {
                temakode: 'TSR',
                temanavn: 'Tilleggsstønad arbeidssøkere'
            },
            {
                temakode: 'ERS',
                temanavn: 'Erstatning'
            },
            {
                temakode: 'ENF',
                temanavn: 'Enslig mor eller far'
            },
            {
                temakode: 'TRK',
                temanavn: 'Trekkhåndtering'
            },
            {
                temakode: 'SAP',
                temanavn: 'Sanksjon - Person'
            },
            {
                temakode: 'YRA',
                temanavn: 'Yrkesrettet attføring'
            },
            {
                temakode: 'HJE',
                temanavn: 'Hjelpemidler'
            },
            {
                temakode: 'IND',
                temanavn: 'Tiltakspenger'
            },
            {
                temakode: 'BAR',
                temanavn: 'Barnetrygd'
            },
            {
                temakode: 'AAR',
                temanavn: 'Aa-registeret'
            },
            {
                temakode: 'GRU',
                temanavn: 'Grunn- og hjelpestønad'
            },
            {
                temakode: 'AAP',
                temanavn: 'Arbeidsavklaringspenger'
            },
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger'
            },
            {
                temakode: 'BID',
                temanavn: 'Bidrag'
            },
            {
                temakode: 'KON',
                temanavn: 'Kontantstøtte'
            },
            {
                temakode: 'FOR',
                temanavn: 'Foreldre- og svangerskapspenger'
            },
            {
                temakode: 'FIP',
                temanavn: 'Fiskerpensjon'
            },
            {
                temakode: 'ARS',
                temanavn: 'Arbeidsrådgivning skjermet'
            },
            {
                temakode: 'ARP',
                temanavn: 'Arbeidsrådgivning psykologtester'
            },
            {
                temakode: 'AGR',
                temanavn: 'Ajourhold - Grunnopplysninger'
            },
            {
                temakode: 'KLL',
                temanavn: 'Klage lønnsgaranti'
            },
            {
                temakode: 'BIL',
                temanavn: 'Bil'
            },
            {
                temakode: 'SYK',
                temanavn: 'Sykepenger'
            },
            {
                temakode: 'GEN',
                temanavn: 'Generell'
            },
            {
                temakode: 'PEN',
                temanavn: 'Pensjon'
            },
            {
                temakode: 'GRA',
                temanavn: 'Gravferdsstønad'
            },
            {
                temakode: 'OPP',
                temanavn: 'Oppfølging'
            },
            {
                temakode: 'FEI',
                temanavn: 'Feilutbetaling'
            },
            {
                temakode: 'KTR',
                temanavn: 'Kontroll'
            },
            {
                temakode: 'SAK',
                temanavn: 'Saksomkostninger'
            },
            {
                temakode: 'FOS',
                temanavn: 'Forsikring'
            },
            {
                temakode: 'HEL',
                temanavn: 'Helsetjenester og ortopediske hjelpemidler'
            },
            {
                temakode: 'OMS',
                temanavn: 'Omsorgspenger, Pleiepenger og opplæringspenger'
            },
            {
                temakode: 'YRK',
                temanavn: 'Yrkesskade og menerstatning'
            },
            {
                temakode: 'OPA',
                temanavn: 'Oppfølging - arbeidsgiver'
            },
            {
                temakode: 'SYM',
                temanavn: 'Sykmelding'
            },
            {
                temakode: 'TRY',
                temanavn: 'Trygdeavgift'
            },
            {
                temakode: 'VEN',
                temanavn: 'Ventelønn'
            },
            {
                temakode: 'UFM',
                temanavn: 'Unntak fra medlemskap'
            },
            {
                temakode: 'UFO',
                temanavn: 'Uføretrygd'
            },
            {
                temakode: 'EYB',
                temanavn: 'Barnepensjon'
            },
            {
                temakode: 'EYO',
                temanavn: 'Omstillingsstønad'
            },
            {
                temakode: 'TSO',
                temanavn: 'Tilleggsstønad'
            },
            {
                temakode: 'FUL',
                temanavn: 'Fullmakt'
            },
            {
                temakode: 'SER',
                temanavn: 'Serviceklager'
            },
            {
                temakode: 'AKT',
                temanavn: 'AKT'
            },
            {
                temakode: 'PAI',
                temanavn: 'PAI'
            }
        ],
        feilendeSystemer: [ResultatSaksDokumenterFeilendeSystemer.KODEVERK]
    };
};
