import { VedtakDTOKilde, VedtakDTORettighet } from 'src/generated/modiapersonoversikt-api';

export const statiskTiltakspengerMock = {
    periode: {
        fraOgMed: '2020-01-10',
        tilOgMed: '2020-02-21'
    },
    kilde: VedtakDTOKilde.TPSAK,
    rettighet: VedtakDTORettighet.TILTAKSPENGER,
    vedtakId: '987sdfklo',
    barnetillegg: {
        perioder: [
            {
                periode: {
                    fraOgMed: '2020-01-20',
                    tilOgMed: '2020-02-21'
                },
                antallBarn: 1
            }
        ]
    }
};
