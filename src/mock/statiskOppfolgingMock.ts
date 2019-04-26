import { DetaljertOppfolging } from '../models/oppfolging';

export const statiskOppfolgingMock: DetaljertOppfolging = {
    oppfølging: {
        erUnderOppfølging: false,
        veileder: { ident: 'Z0000001', navn: 'Testident Testidentesen' },
        enhet: { id: 'E0001', navn: 'Tangen AS', status: 'ESTAT' }
    },
    meldeplikt: false,
    formidlingsgruppe: 'FMGRP2',
    innsatsgruppe: 'INGRP10',
    sykemeldtFra: '2019-04-15',
    rettighetsgruppe: 'RGRP8',
    vedtaksdato: '2019-04-15',
    sykefraværsoppfølging: [
        {
            dato: '2019-01-18',
            fastOppfølgingspunkt: true,
            status: 'Ferdig behandlet',
            syfoHendelse: 'nostrum sunt quia mollitia impedit sint'
        },
        {
            dato: '2019-04-02',
            fastOppfølgingspunkt: false,
            status: 'Ferdig behandlet',
            syfoHendelse: 'vel expedita dolore excepturi est alias'
        },
        {
            dato: '2019-03-21',
            fastOppfølgingspunkt: true,
            status: 'Ferdig behandlet',
            syfoHendelse: 'incidunt quia suscipit voluptas sequi quia'
        }
    ],
    ytelser: [
        {
            dagerIgjen: 21,
            ukerIgjen: 2,
            datoKravMottatt: '2019-04-06',
            fom: '2019-04-08',
            tom: '2019-04-21',
            status: 'Aktiv',
            type: 'Dagpenger',
            vedtak: [
                {
                    aktivFra: '2019-03-29',
                    aktivTil: '2019-04-11',
                    aktivitetsfase: 'Ikke spesif. aktivitetsfase',
                    vedtakstatus: 'Iverksatt',
                    vedtakstype: 'Ordinære dagpenger'
                },
                {
                    aktivFra: '2019-03-19',
                    aktivTil: '2019-04-19',
                    aktivitetsfase: 'Ikke spesif. aktivitetsfase',
                    vedtakstatus: 'Iverksatt',
                    vedtakstype: 'Ordinære dagpenger'
                }
            ]
        },
        {
            dagerIgjen: 26,
            ukerIgjen: 0,
            datoKravMottatt: '2019-04-09',
            fom: '2019-04-19',
            tom: '2019-04-16',
            status: 'Avsluttet',
            type: 'Individstønad',
            vedtak: [
                {
                    aktivFra: '2019-04-08',
                    aktivTil: '2019-04-13',
                    aktivitetsfase: 'Ikke spesif. aktivitetsfase',
                    vedtakstatus: 'Avsluttet',
                    vedtakstype: 'Ordinære dagpenger'
                }
            ]
        }
    ]
};
