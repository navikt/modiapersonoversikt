import { getMockSykmelding } from 'src/mock/ytelse/sykepenger-mock';
import type { Sykmelding } from 'src/models/ytelse/sykepenger';
import { getSykemeldingPeriode } from './sykepengerUtils';

test('Finner riktig periode for sykemeldinger', () => {
    const sykemeldinger: Sykmelding[] = [
        {
            ...getMockSykmelding(),
            sykmeldt: {
                fra: '2010-10-10',
                til: '2015-10-10'
            }
        },
        {
            ...getMockSykmelding(),
            sykmeldt: {
                fra: '2012-10-10',
                til: '2018-10-10'
            }
        }
    ];

    const result = getSykemeldingPeriode(sykemeldinger);

    expect(result).toEqual({ fra: '2010-10-10', til: '2018-10-10' });
});
