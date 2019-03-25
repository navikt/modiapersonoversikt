import { Sykmelding } from '../../../../../models/ytelse/sykepenger';
import { Periode } from '../../../../../models/periode';
import { getNewestDate, getOldestDate } from '../../../../../utils/dateUtils';

export function getSykemeldingPeriode(sykmeldinger: Sykmelding[]) {
    return sykmeldinger.reduce(
        (acc: Periode, sykemelding) => ({
            fra: getOldestDate(sykemelding.sykmeldt.fra, acc.fra),
            til: getNewestDate(sykemelding.sykmeldt.til, acc.til)
        }),
        sykmeldinger[0].sykmeldt
    );
}
