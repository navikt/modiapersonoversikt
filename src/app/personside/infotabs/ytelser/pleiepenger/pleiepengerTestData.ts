export const pleiepengerTestData = {
    barnet: '12345678910',
    omsorgsperson: '12076632144',
    andreOmsorgsperson: '26087625779',
    restDagerFomIMorgen: 678,
    forbrukteDagerTomIDag: 622,
    pleiepengedager: 1300,
    restDagerAnvist: 678,
    perioder: [
        {
            fom: '2018-11-14',
            antallPleiepengedager: 8,
            arbeidsforhold: [
                {
                    arbeidsgiverNavn: 'Andreassen ASA',
                    arbeidsgiverKontonr: '41131607047',
                    inntektsperiode: 'Månedssats',
                    inntektForPerioden: 10856,
                    refusjonTom: '2018-09-09',
                    refusjonstype: 'Ikke refusjon',
                    arbeidsgiverOrgnr: '1234567890',
                    arbeidskategori: 'Arbeidstaker',
                    sykepengerFom: null
                }
            ],
            vedtak: [
                {
                    periode: { fom: '2017-09-29', tom: '2017-10-24' },
                    kompensasjonsgrad: 63,
                    utbetalingsgrad: 100,
                    anvistUtbetaling: '2017-05-28',
                    bruttobelop: 120,
                    dagsats: 5,
                    pleiepengegrad: 66
                },
                {
                    periode: { fom: '2017-07-18', tom: '2017-07-26' },
                    kompensasjonsgrad: 83,
                    utbetalingsgrad: 100,
                    anvistUtbetaling: '2017-06-21',
                    bruttobelop: 596,
                    dagsats: 27,
                    pleiepengegrad: 58
                }
            ]
        },
        {
            fom: '2018-10-16',
            antallPleiepengedager: 13,
            arbeidsforhold: [
                {
                    arbeidsgiverNavn: 'Ryan og Sønner',
                    arbeidsgiverKontonr: '54938521445',
                    inntektsperiode: 'Månedssats',
                    inntektForPerioden: 45029,
                    refusjonTom: '2018-10-11',
                    refusjonstype: 'Ikke refusjon',
                    arbeidsgiverOrgnr: '1234567890',
                    arbeidskategori: 'Arbeidstaker',
                    sykepengerFom: null
                }
            ],
            vedtak: [
                {
                    periode: { fom: '2018-12-01', tom: '2018-12-09' },
                    kompensasjonsgrad: 100,
                    utbetalingsgrad: 100,
                    anvistUtbetaling: '2018-06-29',
                    bruttobelop: 69,
                    dagsats: 12,
                    pleiepengegrad: 92
                }
            ]
        }
    ]
};
