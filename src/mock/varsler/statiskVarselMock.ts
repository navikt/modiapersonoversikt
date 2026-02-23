import type { Varsel } from 'src/lib/types/modiapersonoversikt-api';

export const statiskVarselMock: Varsel[] = [
    {
        type: 'OPPGAVE',
        varselId: '2',
        aktiv: true,
        produsent: 'sf-brukernotifikasjon',
        sensitivitet: 'high',
        innhold: {
            tekst: 'Et nytt samtalereferat er tilgjengelig i din innboks',
            link: 'https://innboks.nav.no'
        },
        eksternVarsling: {
            sendt: true,
            sendtTidspunkt: '2026-01-05T08:17:32.000Z',
            renotifikasjonSendt: true,
            renotifikasjonTidspunkt: '2026-01-12T08:17:32.000Z',
            sendteKanaler: ['SMS', 'EPOST'],
            feilhistorikk: [
                {
                    tidspunkt: '2026-01-05T08:17:32.000Z',
                    feilmelding: 'Det oppsto en feil'
                }
            ],
            sistOppdatert: '2026-01-12T08:17:32.000Z'
        },
        opprettet: '2026-01-05T08:17:32.000Z'
    }
];
