import * as React from 'react';
import { Arbeidsforhold } from '../../../../../models/ytelse/pleiepenger';
import DescriptionList from '../felles-styling/DescriptionList';
import { FormatertKontonummer } from '../../../../../utils/FormatertKontonummer';
import { formaterDato } from '../../../../../utils/dateUtils';
import { formaterNOK } from '../../utbetalinger/utils/utbetalingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

function ArbeidsForhold({arbeidsforhold}: {arbeidsforhold?: Arbeidsforhold}) {
    if (!arbeidsforhold) {
        return <AlertStripeInfo>Kunne ikke finne arbeidsforhold</AlertStripeInfo>;
    }

    const arbeidsSitsuasjonEntries = {
        Arbeidsgiver: arbeidsforhold.arbeidsgiverNavn,
        Arbeidskategori: arbeidsforhold.arbeidskategori,
        Inntekstsperiode: arbeidsforhold.inntektsperiode,
        Kontonummer: arbeidsforhold.arbeidsgiverKontonr
        && <FormatertKontonummer kontonummer={arbeidsforhold.arbeidsgiverKontonr}/>,
        Refusjonstype: arbeidsforhold.refusjonstype,
        'Inntekt for perioden': arbeidsforhold.inntektForPerioden
            && 'NOK ' + formaterNOK(arbeidsforhold.inntektForPerioden),
        'Refusjon til dato': arbeidsforhold.refusjonTom && formaterDato(arbeidsforhold.refusjonTom)
    };

    return <DescriptionList entries={arbeidsSitsuasjonEntries}/>;
}

export default ArbeidsForhold;