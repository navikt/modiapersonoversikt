import { Sykepenger } from '../../../../../models/ytelse/sykepenger';
import { getMockSykmelding, getMockSykmepenger } from '../../../../../mock/ytelse/sykepenger-mock';
import { getSykemeldingPeriode } from './sykepengerUtils';
import { aremark } from '../../../../../mock/person/aremark';

test('Finner riktig periode for sykemeldinger', () => {
    const sykepenger: Sykepenger = getMockSykmepenger(aremark.fødselsnummer);
    sykepenger.sykmeldinger = [
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

    const result = getSykemeldingPeriode(sykepenger);

    expect(result).toEqual({ fra: '2010-10-10', til: '2018-10-10' });
});
