import { type Representasjonsoppdrag, Skjulingsaarsak } from 'src/lib/types/modiapersonoversikt-api';

export const representasjonsoppdragMock: Representasjonsoppdrag = {
    fullmaktsgivere: [
        {
            id: '00000000-0000-4000-8000-000000000001',
            person: { ident: '19818197553', navn: { fornavn: 'Testperson', etternavn: 'Fullmaktsgiver' } },
            gyldigFraOgMed: '2020-01-01',
            leserettigheter: [{ kode: 'DAG', beskrivelse: 'Dagpenger' }],
            skriverettigheter: []
        },
        {
            id: '00000000-0000-4000-8000-000000000002',
            person: { skjulingsaarsak: Skjulingsaarsak.MANGLER_TILGANG },
            gyldigFraOgMed: '2019-01-01',
            gyldigTilOgMed: '2020-12-31',
            leserettigheter: [],
            skriverettigheter: []
        }
    ],
    vergehavere: [
        {
            id: 1,
            person: { ident: '22818098658', navn: { fornavn: 'Testperson', etternavn: 'Vergehaver' } },
            gyldigFraOgMed: '2021-01-01',
            aktivt: true,
            vergemaalstype: 'VOKSEN',
            leserettigheter: [{ kode: 'AAP', beskrivelse: 'Arbeidsavklaringspenger' }],
            skriverettigheter: [{ kode: 'AAP', beskrivelse: 'Arbeidsavklaringspenger' }]
        }
    ],
    feilendeSystemer: []
};
