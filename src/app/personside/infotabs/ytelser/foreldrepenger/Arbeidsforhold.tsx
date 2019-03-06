import * as React from 'react';
import DescriptionList from '../../../../../components/DescriptionList';
import { FormatertKontonummer } from '../../../../../utils/FormatertKontonummer';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Arbeidsforhold } from '../../../../../models/ytelse/foreldrepenger';
import { datoEllerNull, NOKellerNull } from '../../../../../utils/stringFormatting';

interface Props {
    arbeidsforhold?: Arbeidsforhold;
}

function ArbeidsForhold({ arbeidsforhold }: Props) {
    if (!arbeidsforhold) {
        return <AlertStripeInfo>Kunne ikke finne arbeidsforhold</AlertStripeInfo>;
    }

    const arbeidsSituasjonEntries = {
        Arbeidsgiver: arbeidsforhold.arbeidsgiverNavn,
        Kontonummer: arbeidsforhold.arbeidsgiverKontonr && (
            <FormatertKontonummer kontonummer={arbeidsforhold.arbeidsgiverKontonr} />
        ),
        Inntekstsperiode: arbeidsforhold.inntektsperiode,
        'Inntekt for perioden': NOKellerNull(arbeidsforhold.inntektForPerioden),
        Refusjonstype: arbeidsforhold.refusjonstype,
        'Refusjon til dato': datoEllerNull(arbeidsforhold.refusjonTom)
    };

    return <DescriptionList entries={arbeidsSituasjonEntries} />;
}

export default ArbeidsForhold;
