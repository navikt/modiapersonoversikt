import * as React from 'react';
import DescriptionList, { DescriptionListEntries } from '../../../../../../../components/DescriptionList';
import { convertBoolTilJaNei } from '../../../../../../../utils/stringFormatting';
import YtelserInfoGruppe from '../../../felles-styling/YtelserInfoGruppe';
import { Sykepenger } from '../../../../../../../models/ytelse/sykepenger';
import ArbeidsForholdListe from './ArbeidsforholdListe';

interface Props {
    sykepenger: Sykepenger;
}

function Arbeidsforhold(props: Props) {
    const sykemeldingEntries: DescriptionListEntries = {
        Arbeidsgiverperiode: convertBoolTilJaNei(props.sykepenger.erArbeidsgiverperiode),
        Arbeidskategori: props.sykepenger.arbeidsKategori
    };

    return (
        <YtelserInfoGruppe tittel="Arbeidsforhold">
            <DescriptionList entries={sykemeldingEntries} />
            <ArbeidsForholdListe arbeidsforhold={props.sykepenger.arbeidsforholdListe} />
        </YtelserInfoGruppe>
    );
}

export default Arbeidsforhold;
