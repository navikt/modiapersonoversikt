import * as React from 'react';
import { Arbeidsforhold } from '../../../../../../models/ytelse/pleiepenger';
import { FormatertKontonummer } from '../../../../../../utils/FormatertKontonummer';
import { datoEllerNull, NOKellerNull } from '../../../../../../utils/stringFormatting';
import DescriptionList from '../../../../../../components/DescriptionList';

function ArbeidsForhold({ arbeidsforhold }: { arbeidsforhold: Arbeidsforhold }) {
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

    return (
        <li>
            <DescriptionList entries={arbeidsSituasjonEntries} />
        </li>
    );
}

export default ArbeidsForhold;
