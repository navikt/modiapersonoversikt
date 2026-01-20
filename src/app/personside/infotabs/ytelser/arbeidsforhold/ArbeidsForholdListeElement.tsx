import type { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';
import { FormatertKontonummer } from 'src/utils/FormatertKontonummer';
import { datoEllerNull, NOKellerNull } from 'src/utils/string-utils';
import DescriptionList from '../../../../../components/DescriptionList';

interface Props {
    arbeidsforhold: Arbeidsforhold;
    erPleiepenger?: boolean;
}

function ArbeidsForholdListeElement({ arbeidsforhold, erPleiepenger }: Props) {
    const arbeidsForholdEntries = {
        Arbeidsgiver: arbeidsforhold.arbeidsgiverNavn,
        Kontonummer: arbeidsforhold.arbeidsgiverKontonr && (
            <FormatertKontonummer kontonummer={arbeidsforhold.arbeidsgiverKontonr} />
        ),
        Inntekstsperiode: arbeidsforhold.inntektsperiode,
        'Inntekt for perioden': NOKellerNull(arbeidsforhold.inntektForPerioden),
        Refusjonstype: arbeidsforhold.refusjonstype,
        'Refusjon til dato': datoEllerNull(arbeidsforhold.refusjonTom),
        'Sykepenger fra og med': datoEllerNull(arbeidsforhold.sykepengerFom)
    };

    const arbeidsSituasjonEntriesPleiepenger = {
        Arbeidsgiver: arbeidsforhold.arbeidsgiverNavn,
        Arbeidskategori: arbeidsforhold.arbeidskategori,
        Inntekstsperiode: arbeidsforhold.inntektsperiode,
        Kontonummer: arbeidsforhold.arbeidsgiverKontonr && (
            <FormatertKontonummer kontonummer={arbeidsforhold.arbeidsgiverKontonr} />
        ),
        Refusjonstype: arbeidsforhold.refusjonstype,
        'Inntekt for perioden': NOKellerNull(arbeidsforhold.inntektForPerioden),
        'Refusjon til dato': datoEllerNull(arbeidsforhold.refusjonTom)
    };

    return (
        <li>
            <DescriptionList entries={erPleiepenger ? arbeidsSituasjonEntriesPleiepenger : arbeidsForholdEntries} />
        </li>
    );
}

export default ArbeidsForholdListeElement;
