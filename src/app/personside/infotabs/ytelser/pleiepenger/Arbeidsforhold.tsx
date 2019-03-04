import * as React from 'react';
import { Arbeidsforhold } from '../../../../../models/ytelse/pleiepenger';
import DescriptionList from '../../../../../components/DescriptionList';
import { FormatertKontonummer } from '../../../../../utils/FormatertKontonummer';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { datoEllerNull, NOKellerNull } from '../../../../../components/descriptionListHelpers';

function ArbeidsForhold({ arbeidsforhold }: { arbeidsforhold?: Arbeidsforhold }) {
    if (!arbeidsforhold) {
        return <AlertStripeInfo>Kunne ikke finne arbeidsforhold</AlertStripeInfo>;
    }

    const arbeidsSituasjonEntries = {
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

    return <DescriptionList entries={arbeidsSituasjonEntries} />;
}

export default ArbeidsForhold;
