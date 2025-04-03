import type { DetaljertOppfolging } from '../models/oppfolging';

export const statiskOppfolgingMock: DetaljertOppfolging = {
    oppfolging: {
        erUnderOppfolging: false,
        veileder: { ident: 'Z0000001', navn: 'Testident Testidentesen' },
        enhet: { enhetId: 'E0001', navn: 'Tangen AS', status: 'ESTAT' }
    },
    meldeplikt: false,
    formidlingsgruppe: 'FMGRP2',
    innsatsgruppe: 'INGRP10',
    sykemeldtFra: '2019-04-24',
    rettighetsgruppe: 'RGRP8',
    vedtaksdato: '2019-04-24',
    sykefravaersoppfolging: [
        {
            dato: '2019-01-27',
            fastOppfolgingspunkt: true,
            status: 'Ferdig behandlet',
            syfoHendelse: 'nostrum sunt quia mollitia impedit sint'
        },
        {
            dato: '2019-04-10',
            fastOppfolgingspunkt: false,
            status: 'Ferdig behandlet',
            syfoHendelse: 'vel expedita dolore excepturi est alias'
        },
        {
            dato: '2019-02-12',
            fastOppfolgingspunkt: true,
            status: 'Ferdig behandlet',
            syfoHendelse: 'illo repellendus ad iste neque maxime'
        }
    ],
    ytelser: [
        {
            datoKravMottatt: '2019-04-28',
            fom: '2019-04-14',
            tom: '2019-05-01',
            status: 'Avsluttet',
            type: 'Dagpenger',
            vedtak: [
                {
                    aktivFra: '2019-04-04',
                    aktivTil: '2019-04-24',
                    aktivitetsfase: 'Ikke spesif. aktivitetsfase',
                    vedtakstatus: 'Avsluttet',
                    vedtakstype: 'Ordinære dagpenger'
                },
                {
                    aktivFra: '2019-04-10',
                    aktivTil: '2019-04-19',
                    aktivitetsfase: 'Ikke spesif. aktivitetsfase',
                    vedtakstatus: 'Avsluttet',
                    vedtakstype: 'Ordinære dagpenger'
                },
                {
                    aktivFra: '2019-04-27',
                    aktivTil: '2019-05-01',
                    aktivitetsfase: 'Ikke spesif. aktivitetsfase',
                    vedtakstatus: 'Iverksatt',
                    vedtakstype: 'Ordinære dagpenger'
                }
            ],
            dagerIgjenMedBortfall: 46,
            ukerIgjenMedBortfall: 8,
            dagerIgjen: 28,
            ukerIgjen: 10,
            dagerIgjenPermittering: 0,
            ukerIgjenPermittering: 0
        }
    ]
};
