import type { Periode } from '../../../../../../models/tid';
import type { Sykmelding } from '../../../../../../models/ytelse/sykepenger';
import { getNewestDate, getOldestDate } from '../../../../../../utils/date-utils';

export function getSykemeldingPeriode(sykmeldinger: Sykmelding[]) {
    return sykmeldinger.reduce(
        (acc: Periode, sykemelding) => ({
            fra: getOldestDate(sykemelding.sykmeldt.fra, acc.fra),
            til: getNewestDate(sykemelding.sykmeldt.til, acc.til)
        }),
        sykmeldinger[0].sykmeldt
    );
}
