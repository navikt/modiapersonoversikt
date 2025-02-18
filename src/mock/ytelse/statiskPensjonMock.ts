import type { Pensjon } from 'src/models/ytelse/pensjon';

export const statiskPensjonMock: Pensjon = {
    id: '1234',
    fom: '2020-01-10',
    tom: '2020-02-21',
    enhetId: '0129',
    type: { code: 'AFP', decode: 'Afp' },
    status: { code: 'OPPRETTET', decode: 'Opprettet' }
};
