import { DittNavEvent, Kanal, Varsel } from '../../models/varsel';

export const statiskVarselMock: Varsel[] = [
    {
        varselType: 'IkkeLevMeldekortNO',
        mottattTidspunkt: '2019-03-28',
        erRevarsling: false,
        meldingListe: [
            {
                kanal: Kanal.SMS,
                innhold: 'Meldingsinnhold',
                mottakerInformasjon: 'mottakerinfo',
                utsendingsTidspunkt: '2019-01-24',
                feilbeskrivelse: 'Feil',
                epostemne: 'Epostemne',
                url: 'http://test.com',
                erRevarsel: false
            },
            {
                kanal: Kanal.EPOST,
                innhold: 'Meldingsinnhold',
                mottakerInformasjon: 'mottakerinfo',
                utsendingsTidspunkt: '2019-03-01',
                feilbeskrivelse: 'Feil',
                epostemne: 'Epostemne',
                url: 'http://test.com',
                erRevarsel: false
            }
        ]
    },
    {
        varselType: 'IkkeLevMeldekortNO',
        mottattTidspunkt: '2019-01-10',
        erRevarsling: true,
        meldingListe: [
            {
                kanal: Kanal.EPOST,
                innhold: 'Meldingsinnhold',
                mottakerInformasjon: 'mottakerinfo',
                utsendingsTidspunkt: '2019-02-02',
                feilbeskrivelse: 'Feil',
                epostemne: 'Epostemne',
                url: 'http://test.com',
                erRevarsel: true
            }
        ]
    }
];

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
                { tidspunkt: '2023-01-01T00:00:00.000Z', feilmelding: 'Feil telefonummer', kanal: 'SMS' }
            ],
            feilteRevarslinger: [{ tidspunkt: '2023-08-11T11:11:11.000Z', feilmelding: 'Feil epost', kanal: 'EPOST' }]
        }
    }
];
