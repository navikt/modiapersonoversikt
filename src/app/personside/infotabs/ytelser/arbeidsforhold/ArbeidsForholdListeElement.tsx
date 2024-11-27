import { datoEllerNull, NOKellerNull } from 'src/utils/string-utils';
import { FormatertKontonummer } from 'src/utils/FormatertKontonummer';
import DescriptionList from '../../../../../components/DescriptionList';
import { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';

interface Props {
    arbeidsforhold: Arbeidsforhold;
}

function ArbeidsForholdListeElement({ arbeidsforhold }: Props) {
    const arbeidsForholdEntries = {
        Arbeidsgiver: arbeidsforhold.arbeidsgiverNavn,
        Arbeidskategori: arbeidsforhold.arbeidskategori,
        Inntekstsperiode: arbeidsforhold.inntektsperiode,
        Kontonummer: arbeidsforhold.arbeidsgiverKontonr && (
            <FormatertKontonummer kontonummer={arbeidsforhold.arbeidsgiverKontonr} />
        ),
        Refusjonstype: arbeidsforhold.refusjonstype,
        'Inntekt for perioden': NOKellerNull(arbeidsforhold.inntektForPerioden),
        'Refusjon til dato': datoEllerNull(arbeidsforhold.refusjonTom),
        'Sykepenger fra og med': datoEllerNull(arbeidsforhold.sykepengerFom),
    };

    return (
        <li>
            <DescriptionList entries={arbeidsForholdEntries} />
        </li>
    );
}

export default ArbeidsForholdListeElement;
