import { UtbetalingerResponse } from '../../models/utbetalinger';

export const statiskMockUtbetalingRespons: UtbetalingerResponse = {
    utbetalinger: [
        {
            utbetaltTil: 'AREMARK TESTFAMILIEN',
            erUtbetaltTilPerson: true,
            erUtbetaltTilOrganisasjon: false,
            erUtbetaltTilSamhandler: false,
            nettobelop: 96152,
            posteringsdato: '2018-04-01',
            utbetalingsdato: null,
            forfallsdato: null,
            melding: 'Utbetalingsmelding',
            metode: 'Bankkontooverføring',
            status: 'Returnert til NAV for saksbehandling',
            konto: '14625726582',
            ytelser: [
                {
                    type: 'Barnetrygd',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Ball',
                            satsbelop: 264,
                            satstype: 'Satstype',
                            satsantall: 5,
                            ytelseskomponentbelop: 1320
                        },
                        {
                            ytelseskomponenttype: 'Ball',
                            satsbelop: 1674,
                            satstype: 'Satstype',
                            satsantall: 8,
                            ytelseskomponentbelop: 13392
                        },
                        {
                            ytelseskomponenttype: 'Pants',
                            satsbelop: 876,
                            satstype: 'Satstype',
                            satsantall: 4,
                            ytelseskomponentbelop: 3504
                        },
                        {
                            ytelseskomponenttype: 'Bacon',
                            satsbelop: 1974,
                            satstype: 'Satstype',
                            satsantall: 9,
                            ytelseskomponentbelop: 17766
                        },
                        {
                            ytelseskomponenttype: 'Bacon',
                            satsbelop: 1478,
                            satstype: 'Satstype',
                            satsantall: 10,
                            ytelseskomponentbelop: 14780
                        }
                    ],
                    ytelseskomponentersum: 50762,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [{ skattebelop: -1906 }],
                    skattsum: -1906,
                    nettobelop: 48856,
                    periode: { start: '2018-06-30', slutt: '2019-03-24' },
                    bilagsnummer: '0357522862',
                    arbeidsgiver: { navn: 'Fossum - Johansen', orgnr: '38223811790' }
                },
                {
                    type: 'Foreldrepenger',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Ball',
                            satsbelop: 1572,
                            satstype: 'Satstype',
                            satsantall: 2,
                            ytelseskomponentbelop: 3144
                        },
                        {
                            ytelseskomponenttype: 'Keyboard',
                            satsbelop: 1114,
                            satstype: 'Satstype',
                            satsantall: 7,
                            ytelseskomponentbelop: 7798
                        },
                        {
                            ytelseskomponenttype: 'Ball',
                            satsbelop: 1490,
                            satstype: 'Satstype',
                            satsantall: 7,
                            ytelseskomponentbelop: 10430
                        },
                        {
                            ytelseskomponenttype: 'Towels',
                            satsbelop: 1926,
                            satstype: 'Satstype',
                            satsantall: 1,
                            ytelseskomponentbelop: 1926
                        }
                    ],
                    ytelseskomponentersum: 23298,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [{ skattebelop: -92 }],
                    skattsum: -92,
                    nettobelop: 23206,
                    periode: { start: '2019-09-27', slutt: '2019-08-09' },
                    bilagsnummer: '6238055181',
                    arbeidsgiver: { navn: 'Aas, Østli and Arnesen', orgnr: '10992728225' }
                },
                {
                    type: 'Barnetrygd',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Car',
                            satsbelop: 900,
                            satstype: 'Satstype',
                            satsantall: 6,
                            ytelseskomponentbelop: 5400
                        },
                        {
                            ytelseskomponenttype: 'Gloves',
                            satsbelop: 1300,
                            satstype: 'Satstype',
                            satsantall: 1,
                            ytelseskomponentbelop: 1300
                        },
                        {
                            ytelseskomponenttype: 'Chair',
                            satsbelop: 1726,
                            satstype: 'Satstype',
                            satsantall: 10,
                            ytelseskomponentbelop: 17260
                        },
                        {
                            ytelseskomponenttype: 'Shoes',
                            satsbelop: 26,
                            satstype: 'Satstype',
                            satsantall: 5,
                            ytelseskomponentbelop: 130
                        }
                    ],
                    ytelseskomponentersum: 24090,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [],
                    skattsum: 0,
                    nettobelop: 24090,
                    periode: { start: '2019-06-13', slutt: '2018-05-20' },
                    bilagsnummer: '0591501736',
                    arbeidsgiver: { navn: 'Svendsen - Pedersen', orgnr: '15109208748' }
                }
            ]
        },
        {
            utbetaltTil: 'AREMARK TESTFAMILIEN',
            erUtbetaltTilPerson: true,
            erUtbetaltTilOrganisasjon: false,
            erUtbetaltTilSamhandler: false,
            nettobelop: -1636,
            posteringsdato: '2019-05-05',
            utbetalingsdato: null,
            forfallsdato: null,
            melding: 'Utbetalingsmelding',
            metode: 'Bankkontooverføring',
            status: 'Ligger hos banken',
            konto: '6058877764',
            ytelser: [
                {
                    type: 'Barnetrygd',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Car',
                            satsbelop: 1706,
                            satstype: 'Satstype',
                            satsantall: 1,
                            ytelseskomponentbelop: 1706
                        }
                    ],
                    ytelseskomponentersum: 1706,
                    trekkListe: [
                        {
                            trekktype: 'Prosenttrekk',
                            trekkbelop: -924,
                            kreditor: 'Wold ASA'
                        },
                        {
                            trekktype: 'Prosenttrekk',
                            trekkbelop: -1046,
                            kreditor: 'Wold - Haugen'
                        },
                        { trekktype: 'Prosenttrekk', trekkbelop: -1372, kreditor: null }
                    ],
                    trekksum: -3342,
                    skattListe: [],
                    skattsum: 0,
                    nettobelop: -1636,
                    periode: { start: '2018-02-13', slutt: '2018-09-20' },
                    bilagsnummer: '6778314178',
                    arbeidsgiver: { navn: 'Østby, Fredriksen and Berge', orgnr: '27597075501' }
                }
            ]
        },
        {
            utbetaltTil: 'AREMARK TESTFAMILIEN',
            erUtbetaltTilPerson: true,
            erUtbetaltTilOrganisasjon: false,
            erUtbetaltTilSamhandler: false,
            nettobelop: -460,
            posteringsdato: '2018-05-09',
            utbetalingsdato: '2018-04-05',
            forfallsdato: '2019-07-13',
            melding: 'Utbetalingsmelding',
            metode: 'Bankkontooverføring',
            status: 'Utbetalt',
            konto: '382729084',
            ytelser: [
                {
                    type: 'Alderspensjon',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Bike',
                            satsbelop: 202,
                            satstype: 'Satstype',
                            satsantall: 4,
                            ytelseskomponentbelop: 808
                        }
                    ],
                    ytelseskomponentersum: 808,
                    trekkListe: [{ trekktype: 'Prosenttrekk', trekkbelop: -1268, kreditor: 'Østby - Mathisen' }],
                    trekksum: -1268,
                    skattListe: [],
                    skattsum: 0,
                    nettobelop: -460,
                    periode: { start: '2019-09-03', slutt: '2019-03-16' },
                    bilagsnummer: '3251204321',
                    arbeidsgiver: null
                }
            ]
        },
        {
            utbetaltTil: 'AREMARK TESTFAMILIEN',
            erUtbetaltTilPerson: true,
            erUtbetaltTilOrganisasjon: false,
            erUtbetaltTilSamhandler: false,
            nettobelop: 15762,
            posteringsdato: '2018-09-15',
            utbetalingsdato: null,
            forfallsdato: null,
            melding: 'Utbetalingsmelding',
            metode: 'Bankkontooverføring',
            status: 'Returnert til NAV for saksbehandling',
            konto: '78639282070',
            ytelser: [
                {
                    type: 'Enslig forsørger',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Hat',
                            satsbelop: 1698,
                            satstype: 'Satstype',
                            satsantall: 2,
                            ytelseskomponentbelop: 3396
                        },
                        {
                            ytelseskomponenttype: 'Gloves',
                            satsbelop: 850,
                            satstype: 'Satstype',
                            satsantall: 2,
                            ytelseskomponentbelop: 1700
                        },
                        {
                            ytelseskomponenttype: 'Keyboard',
                            satsbelop: 1296,
                            satstype: 'Satstype',
                            satsantall: 5,
                            ytelseskomponentbelop: 6480
                        },
                        {
                            ytelseskomponenttype: 'Keyboard',
                            satsbelop: 698,
                            satstype: 'Satstype',
                            satsantall: 3,
                            ytelseskomponentbelop: 2094
                        },
                        {
                            ytelseskomponenttype: 'Mouse',
                            satsbelop: 1082,
                            satstype: 'Satstype',
                            satsantall: 3,
                            ytelseskomponentbelop: 3246
                        }
                    ],
                    ytelseskomponentersum: 16916,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [{ skattebelop: -200 }, { skattebelop: -954 }],
                    skattsum: -1154,
                    nettobelop: 15762,
                    periode: { start: '2018-02-01', slutt: '2017-11-22' },
                    bilagsnummer: '8569474503',
                    arbeidsgiver: null
                }
            ]
        },
        {
            utbetaltTil: 'AREMARK TESTFAMILIEN',
            erUtbetaltTilPerson: true,
            erUtbetaltTilOrganisasjon: false,
            erUtbetaltTilSamhandler: false,
            nettobelop: 48462,
            posteringsdato: '2018-05-12',
            utbetalingsdato: null,
            forfallsdato: '2018-12-17',
            melding: 'Utbetalingsmelding',
            metode: 'Bankkontooverføring',
            status: 'Ligger hos banken',
            konto: '40901796879',
            ytelser: [
                {
                    type: 'Dagpenger',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Keyboard',
                            satsbelop: 1834,
                            satstype: 'Satstype',
                            satsantall: 6,
                            ytelseskomponentbelop: 11004
                        },
                        {
                            ytelseskomponenttype: 'Chicken',
                            satsbelop: 1636,
                            satstype: 'Satstype',
                            satsantall: 2,
                            ytelseskomponentbelop: 3272
                        },
                        {
                            ytelseskomponenttype: 'Gloves',
                            satsbelop: 318,
                            satstype: 'Satstype',
                            satsantall: 4,
                            ytelseskomponentbelop: 1272
                        },
                        {
                            ytelseskomponenttype: 'Bike',
                            satsbelop: 1490,
                            satstype: 'Satstype',
                            satsantall: 4,
                            ytelseskomponentbelop: 5960
                        },
                        {
                            ytelseskomponenttype: 'Pizza',
                            satsbelop: 1218,
                            satstype: 'Satstype',
                            satsantall: 1,
                            ytelseskomponentbelop: 1218
                        }
                    ],
                    ytelseskomponentersum: 22726,
                    trekkListe: [{ trekktype: 'Prosenttrekk', trekkbelop: -1892, kreditor: 'Nordskaug Gruppen' }],
                    trekksum: -1892,
                    skattListe: [],
                    skattsum: 0,
                    nettobelop: 20834,
                    periode: { start: '2019-04-21', slutt: '2018-10-07' },
                    bilagsnummer: '9155068417',
                    arbeidsgiver: null
                },
                {
                    type: 'Alderspensjon',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Bike',
                            satsbelop: 1352,
                            satstype: 'Satstype',
                            satsantall: 3,
                            ytelseskomponentbelop: 4056
                        },
                        {
                            ytelseskomponenttype: 'Chicken',
                            satsbelop: 914,
                            satstype: 'Satstype',
                            satsantall: 7,
                            ytelseskomponentbelop: 6398
                        },
                        {
                            ytelseskomponenttype: 'Fish',
                            satsbelop: 1948,
                            satstype: 'Satstype',
                            satsantall: 9,
                            ytelseskomponentbelop: 17532
                        }
                    ],
                    ytelseskomponentersum: 27986,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [{ skattebelop: -358 }],
                    skattsum: -358,
                    nettobelop: 27628,
                    periode: { start: '2018-05-12', slutt: '2019-04-10' },
                    bilagsnummer: '6162839362',
                    arbeidsgiver: null
                }
            ]
        }
    ],
    periode: { startDato: '2019-09-24', sluttDato: '2020-02-01' }
};
