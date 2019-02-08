import * as React from 'react';
import DescriptionList from '../felles-styling/DescriptionList';
import { FormatertKontonummer } from '../../../../../utils/FormatertKontonummer';
import { formaterDato } from '../../../../../utils/dateUtils';
import { formaterNOK } from '../../utbetalinger/utils/utbetalingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Arbeidsforhold } from '../../../../../models/ytelse/foreldrepenger';

function ArbeidsForhold({ arbeidsforhold }: { arbeidsforhold?: Arbeidsforhold }) {
    if (!arbeidsforhold) {
        return <AlertStripeInfo>Kunne ikke finne arbeidsforhold</AlertStripeInfo>;
    }

    const arbeidsSituasjonEntries = {
        Arbeidsgiver: arbeidsforhold.arbeidsgiverNavn,
        Kontonummer: arbeidsforhold.arbeidsgiverKontonr && (
            <FormatertKontonummer kontonummer={arbeidsforhold.arbeidsgiverKontonr} />
        ),
        Inntekstsperiode: arbeidsforhold.inntektsperiode,
        'Inntekt for perioden':
            arbeidsforhold.inntektForPerioden && 'NOK ' + formaterNOK(arbeidsforhold.inntektForPerioden),
        Refusjonstype: arbeidsforhold.refusjonstype,
        'Refusjon til dato': arbeidsforhold.refusjonTom && formaterDato(arbeidsforhold.refusjonTom),
    };

    return <DescriptionList entries={arbeidsSituasjonEntries} />;
}

export default ArbeidsForhold;
