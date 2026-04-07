import type { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';
import { formatertKontonummerString } from 'src/utils/FormatertKontonummer';
import { datoEllerNull, NOKellerNull } from 'src/utils/string-utils';
import DescriptionList from '../../../../../components/DescriptionList';

interface Props {
    arbeidsforhold: Arbeidsforhold;
}

function ArbeidsForholdListeElement({ arbeidsforhold }: Props) {
    const arbeidsForholdEntries = {
        Arbeidsgiver: arbeidsforhold.arbeidsgiverNavn,
        Kontonummer:
            arbeidsforhold.arbeidsgiverKontonr && formatertKontonummerString(arbeidsforhold.arbeidsgiverKontonr),
        Inntekstsperiode: arbeidsforhold.inntektsperiode,
        'Inntekt for perioden': NOKellerNull(arbeidsforhold.inntektForPerioden),
        Refusjonstype: arbeidsforhold.refusjonstype,
        'Refusjon til dato': datoEllerNull(arbeidsforhold.refusjonTom),
        'Sykepenger fra og med': datoEllerNull(arbeidsforhold.sykepengerFom)
    };

    return (
        <li>
            <DescriptionList entries={arbeidsForholdEntries} />
        </li>
    );
}

export default ArbeidsForholdListeElement;
