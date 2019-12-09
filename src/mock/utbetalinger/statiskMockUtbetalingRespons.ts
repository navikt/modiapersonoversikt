import { UtbetalingerResponse } from '../../models/utbetalinger';

export const statiskMockUtbetalingRespons: UtbetalingerResponse = {
    utbetalinger: [
        {
            utbetaltTil: 'AREMARK TESTFAMILIEN',
            erUtbetaltTilPerson: true,
            erUtbetaltTilOrganisasjon: false,
            erUtbetaltTilSamhandler: false,
            nettobeløp: 96152,
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
                            satsbeløp: 264,
                            satstype: 'Satstype',
                            satsantall: 5,
                            ytelseskomponentbeløp: 1320
                        },
                        {
                            ytelseskomponenttype: 'Ball',
                            satsbeløp: 1674,
                            satstype: 'Satstype',
                            satsantall: 8,
                            ytelseskomponentbeløp: 13392
                        },
                        {
                            ytelseskomponenttype: 'Pants',
                            satsbeløp: 876,
                            satstype: 'Satstype',
                            satsantall: 4,
                            ytelseskomponentbeløp: 3504
                        },
                        {
                            ytelseskomponenttype: 'Bacon',
                            satsbeløp: 1974,
                            satstype: 'Satstype',
                            satsantall: 9,
                            ytelseskomponentbeløp: 17766
                        },
                        {
                            ytelseskomponenttype: 'Bacon',
                            satsbeløp: 1478,
                            satstype: 'Satstype',
                            satsantall: 10,
                            ytelseskomponentbeløp: 14780
                        }
                    ],
                    ytelseskomponentersum: 50762,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [{ skattebeløp: -1906 }],
                    skattsum: -1906,
                    nettobeløp: 48856,
                    periode: { start: '2018-06-30', slutt: '2019-03-24' },
                    bilagsnummer: '0357522862',
                    arbeidsgiver: { navn: 'Fossum - Johansen', orgnr: '38223811790' }
                },
                {
                    type: 'Foreldrepenger',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Ball',
                            satsbeløp: 1572,
                            satstype: 'Satstype',
                            satsantall: 2,
                            ytelseskomponentbeløp: 3144
                        },
                        {
                            ytelseskomponenttype: 'Keyboard',
                            satsbeløp: 1114,
                            satstype: 'Satstype',
                            satsantall: 7,
                            ytelseskomponentbeløp: 7798
                        },
                        {
                            ytelseskomponenttype: 'Ball',
                            satsbeløp: 1490,
                            satstype: 'Satstype',
                            satsantall: 7,
                            ytelseskomponentbeløp: 10430
                        },
                        {
                            ytelseskomponenttype: 'Towels',
                            satsbeløp: 1926,
                            satstype: 'Satstype',
                            satsantall: 1,
                            ytelseskomponentbeløp: 1926
                        }
                    ],
                    ytelseskomponentersum: 23298,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [{ skattebeløp: -92 }],
                    skattsum: -92,
                    nettobeløp: 23206,
                    periode: { start: '2019-09-27', slutt: '2019-08-09' },
                    bilagsnummer: '6238055181',
                    arbeidsgiver: { navn: 'Aas, Østli and Arnesen', orgnr: '10992728225' }
                },
                {
                    type: 'Barnetrygd',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Car',
                            satsbeløp: 900,
                            satstype: 'Satstype',
                            satsantall: 6,
                            ytelseskomponentbeløp: 5400
                        },
                        {
                            ytelseskomponenttype: 'Gloves',
                            satsbeløp: 1300,
                            satstype: 'Satstype',
                            satsantall: 1,
                            ytelseskomponentbeløp: 1300
                        },
                        {
                            ytelseskomponenttype: 'Chair',
                            satsbeløp: 1726,
                            satstype: 'Satstype',
                            satsantall: 10,
                            ytelseskomponentbeløp: 17260
                        },
                        {
                            ytelseskomponenttype: 'Shoes',
                            satsbeløp: 26,
                            satstype: 'Satstype',
                            satsantall: 5,
                            ytelseskomponentbeløp: 130
                        }
                    ],
                    ytelseskomponentersum: 24090,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [],
                    skattsum: 0,
                    nettobeløp: 24090,
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
            nettobeløp: -1636,
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
                            satsbeløp: 1706,
                            satstype: 'Satstype',
                            satsantall: 1,
                            ytelseskomponentbeløp: 1706
                        }
                    ],
                    ytelseskomponentersum: 1706,
                    trekkListe: [
                        {
                            trekktype: 'Prosenttrekk',
                            trekkbeløp: -924,
                            kreditor: 'Wold ASA'
                        },
                        {
                            trekktype: 'Prosenttrekk',
                            trekkbeløp: -1046,
                            kreditor: 'Wold - Haugen'
                        },
                        { trekktype: 'Prosenttrekk', trekkbeløp: -1372, kreditor: null }
                    ],
                    trekksum: -3342,
                    skattListe: [],
                    skattsum: 0,
                    nettobeløp: -1636,
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
            nettobeløp: -460,
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
                            satsbeløp: 202,
                            satstype: 'Satstype',
                            satsantall: 4,
                            ytelseskomponentbeløp: 808
                        }
                    ],
                    ytelseskomponentersum: 808,
                    trekkListe: [{ trekktype: 'Prosenttrekk', trekkbeløp: -1268, kreditor: 'Østby - Mathisen' }],
                    trekksum: -1268,
                    skattListe: [],
                    skattsum: 0,
                    nettobeløp: -460,
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
            nettobeløp: 15762,
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
                            satsbeløp: 1698,
                            satstype: 'Satstype',
                            satsantall: 2,
                            ytelseskomponentbeløp: 3396
                        },
                        {
                            ytelseskomponenttype: 'Gloves',
                            satsbeløp: 850,
                            satstype: 'Satstype',
                            satsantall: 2,
                            ytelseskomponentbeløp: 1700
                        },
                        {
                            ytelseskomponenttype: 'Keyboard',
                            satsbeløp: 1296,
                            satstype: 'Satstype',
                            satsantall: 5,
                            ytelseskomponentbeløp: 6480
                        },
                        {
                            ytelseskomponenttype: 'Keyboard',
                            satsbeløp: 698,
                            satstype: 'Satstype',
                            satsantall: 3,
                            ytelseskomponentbeløp: 2094
                        },
                        {
                            ytelseskomponenttype: 'Mouse',
                            satsbeløp: 1082,
                            satstype: 'Satstype',
                            satsantall: 3,
                            ytelseskomponentbeløp: 3246
                        }
                    ],
                    ytelseskomponentersum: 16916,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [{ skattebeløp: -200 }, { skattebeløp: -954 }],
                    skattsum: -1154,
                    nettobeløp: 15762,
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
            nettobeløp: 48462,
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
                            satsbeløp: 1834,
                            satstype: 'Satstype',
                            satsantall: 6,
                            ytelseskomponentbeløp: 11004
                        },
                        {
                            ytelseskomponenttype: 'Chicken',
                            satsbeløp: 1636,
                            satstype: 'Satstype',
                            satsantall: 2,
                            ytelseskomponentbeløp: 3272
                        },
                        {
                            ytelseskomponenttype: 'Gloves',
                            satsbeløp: 318,
                            satstype: 'Satstype',
                            satsantall: 4,
                            ytelseskomponentbeløp: 1272
                        },
                        {
                            ytelseskomponenttype: 'Bike',
                            satsbeløp: 1490,
                            satstype: 'Satstype',
                            satsantall: 4,
                            ytelseskomponentbeløp: 5960
                        },
                        {
                            ytelseskomponenttype: 'Pizza',
                            satsbeløp: 1218,
                            satstype: 'Satstype',
                            satsantall: 1,
                            ytelseskomponentbeløp: 1218
                        }
                    ],
                    ytelseskomponentersum: 22726,
                    trekkListe: [{ trekktype: 'Prosenttrekk', trekkbeløp: -1892, kreditor: 'Nordskaug Gruppen' }],
                    trekksum: -1892,
                    skattListe: [],
                    skattsum: 0,
                    nettobeløp: 20834,
                    periode: { start: '2019-04-21', slutt: '2018-10-07' },
                    bilagsnummer: '9155068417',
                    arbeidsgiver: null
                },
                {
                    type: 'Alderspensjon',
                    ytelseskomponentListe: [
                        {
                            ytelseskomponenttype: 'Bike',
                            satsbeløp: 1352,
                            satstype: 'Satstype',
                            satsantall: 3,
                            ytelseskomponentbeløp: 4056
                        },
                        {
                            ytelseskomponenttype: 'Chicken',
                            satsbeløp: 914,
                            satstype: 'Satstype',
                            satsantall: 7,
                            ytelseskomponentbeløp: 6398
                        },
                        {
                            ytelseskomponenttype: 'Fish',
                            satsbeløp: 1948,
                            satstype: 'Satstype',
                            satsantall: 9,
                            ytelseskomponentbeløp: 17532
                        }
                    ],
                    ytelseskomponentersum: 27986,
                    trekkListe: [],
                    trekksum: 0,
                    skattListe: [{ skattebeløp: -358 }],
                    skattsum: -358,
                    nettobeløp: 27628,
                    periode: { start: '2018-05-12', slutt: '2019-04-10' },
                    bilagsnummer: '6162839362',
                    arbeidsgiver: null
                }
            ]
        }
    ],
    periode: { startDato: '2019-09-24', sluttDato: '2020-02-01' }
};
