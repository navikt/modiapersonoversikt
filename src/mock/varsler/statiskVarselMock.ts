import type { DittNavEvent } from '../../models/varsel';

export const statiskDittnavEventVarselMock: DittNavEvent[] = [
    {
        fodselsnummer: '10108000398',
        grupperingsId: '1',
        eventId: '2',
        forstBehandlet: '2023-01-01T00:00:00.000Z',
        produsent: 'sf-brukernotifikasjon',
        sikkerhetsnivaa: 4,
        sistOppdatert: '2023-08-11T11:11:11.000Z',
        tekst: 'Et nytt samtalereferat er tilgjengelig i din innboks',
        link: 'https://innboks.nav.no',
        aktiv: false,
        eksternVarslingSendt: true,
        eksternVarslingKanaler: ['SMS', 'EPOST'],
        varslingsTidspunkt: {
            sendt: true,
            tidspunkt: '2023-01-11T11:11:11.000Z',
            renotifikasjonSendt: true,
            renotifikasjonTidspunkt: '2023-08-01T00:00:00.000Z',
            sendteKanaler: ['SMS', 'EPOST'],
            renotifikasjonsKanaler: ['SMS', 'EPOST'],
            harFeilteVarslinger: true,
            harFeilteRevarslinger: true,
            feilteVarsliner: [
                {
                    tidspunkt: '2023-01-01T00:00:00.000Z',
                    feilmelding: 'Feil telefonummer',
                    kanal: 'SMS'
                }
            ],
            feilteRevarslinger: [
                {
                    tidspunkt: '2023-08-11T11:11:11.000Z',
                    feilmelding: 'Feil epost',
                    kanal: 'EPOST'
                }
            ]
        }
    }
];
